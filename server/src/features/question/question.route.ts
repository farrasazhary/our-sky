import { prisma } from "../../config/database"
import { Response, Router } from "express"
import { AuthRequest, authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { AppError } from "../../shared/errors/AppError"
import { RelationshipEventService } from "../relationship-event/relationshipEvent.service"
import { EVENT_TYPES } from "../../shared/constants/eventTypes"
import { NotificationService } from "../notification/notification.route"
import { AiService } from "../ai/ai.service"
import { DateHelper } from "../../shared/utils/dateHelper"
import { z } from "zod"

const answerSchema = z.object({
  answerText: z.string().min(1, "Answer is required").max(500, "Answer cannot exceed 500 characters")
})

export class QuestionService {
  /**
   * Generates or fetches active romantic question for today for this specific relationship
   */
  static async getTodayQuestion(relationshipId: bigint, userId: bigint) {
    const now = new Date()
    const todayStr = DateHelper.getIndonesianDateString(now)
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    const diffMs = now.getTime() - startOfYear.getTime()
    const oneDayMs = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diffMs / oneDayMs) + 1

    // Find the latest question assigned specifically to this relationship
    const assignedEvent = await prisma.relationshipEvent.findFirst({
      where: {
        relationshipId,
        eventType: "QUESTION_ASSIGNED"
      },
      orderBy: { createdAt: "desc" }
    })

    let question = null
    let isSameDay = false

    if (assignedEvent) {
      const eventDateStr = DateHelper.getIndonesianDateString(assignedEvent.createdAt)
      if (eventDateStr === todayStr) {
        isSameDay = true
        question = await prisma.question.findUnique({
          where: { id: assignedEvent.sourceId }
        })
      }
    }

    // If no active question is assigned for today, generate a brand new one using Gemini AI!
    if (!question || !isSameDay) {
      console.log("🤖 [Gemini AI] Generating active romantic question on-demand for relationship...")
      const aiData = await AiService.generateRomanticQuestion()
      
      question = await prisma.question.create({
        data: {
          questionText: aiData.questionText,
          category: aiData.category || "AI Generated",
          isActive: true
        }
      })

      // Assign to this relationship
      await prisma.relationshipEvent.create({
        data: {
          relationshipId,
          eventType: "QUESTION_ASSIGNED",
          sourceEntity: "questions",
          sourceId: question.id,
          description: `Assigned active daily question for ${todayStr}`
        }
      })
    }

    const answers = await prisma.questionAnswer.findMany({
      where: {
        questionId: question.id,
        relationshipId
      },
      include: {
        user: { select: { id: true, fullName: true } }
      }
    })

    const myAnswer = answers.find(a => a.userId === userId)
    const partnerAnswer = answers.find(a => a.userId !== userId)
    const isBothAnswered = answers.length >= 2

    return {
      id: question.id.toString(),
      questionText: question.questionText,
      category: question.category,
      isAiGenerated: true,
      dayNumber: dayOfYear,
      myAnswer: myAnswer ? {
        answerText: myAnswer.answerText,
        answeredAt: myAnswer.answeredAt
      } : null,
      partnerAnswer: partnerAnswer ? {
        partnerName: partnerAnswer.user.fullName,
        answerText: partnerAnswer.answerText,
        answeredAt: partnerAnswer.answeredAt
      } : null,
      isBothAnswered
    }
  }

  /**
   * Rerolls today's question by generating a brand new Gemini AI question on demand.
   */
  static async rerollTodayQuestion(relationshipId: bigint, userId: bigint, currentQuestionIdStr?: string) {
    if (currentQuestionIdStr) {
      try {
        const qId = BigInt(currentQuestionIdStr)
        const existingAnswersCount = await prisma.questionAnswer.count({
          where: {
            questionId: qId,
            relationshipId
          }
        })

        if (existingAnswersCount >= 2) {
          throw new AppError("Pertanyaan yang sudah selesai dijawab berdua tidak dapat diganti.", 400)
        }
      } catch (e: any) {
        if (e instanceof AppError) throw e
      }
    }

    console.log("🤖 [Gemini AI] Rerolling question on-demand via Gemini AI...")
    const aiData = await AiService.generateRomanticQuestion()
    
    const question = await prisma.question.create({
      data: {
        questionText: aiData.questionText,
        category: aiData.category || "AI Generated",
        isActive: true
      }
    })

    // Assign new question to this relationship
    await prisma.relationshipEvent.create({
      data: {
        relationshipId,
        eventType: "QUESTION_ASSIGNED",
        sourceEntity: "questions",
        sourceId: question.id,
        description: "Rerolled active daily question"
      }
    })

    return {
      id: question.id.toString(),
      questionText: question.questionText,
      category: question.category,
      isAiGenerated: true,
      myAnswer: null,
      partnerAnswer: null,
      isBothAnswered: false
    }
  }

  static async submitAnswer(questionIdStr: string, relationshipId: bigint, userId: bigint, answerText: string) {
    const questionId = BigInt(questionIdStr)

    const existing = await prisma.questionAnswer.findUnique({
      where: {
        questionId_relationshipId_userId: {
          questionId,
          relationshipId,
          userId
        }
      }
    })

    if (existing) {
      throw new AppError("You have already submitted an answer for this question.", 400)
    }

    const newAnswer = await prisma.questionAnswer.create({
      data: {
        questionId,
        relationshipId,
        userId,
        answerText
      }
    })

    const allAnswers = await prisma.questionAnswer.findMany({
      where: { questionId, relationshipId }
    })

    if (allAnswers.length >= 2) {
      await RelationshipEventService.recordEvent({
        relationshipId,
        eventType: EVENT_TYPES.QUESTION_COMPLETED,
        sourceEntity: "question_answers",
        sourceId: newAnswer.id,
        description: "Completed today's question together!"
      })
    }

    // Dispatch partner notification
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      "Daily Question Answered 💬",
      "Your partner answered today's daily question!",
      "QUESTION"
    )

    return {
      id: newAnswer.id.toString(),
      answerText: newAnswer.answerText,
      answeredAt: newAnswer.answeredAt,
      isBothAnswered: allAnswers.length >= 2
    }
  }

  static async getHistory(relationshipId: bigint, userId: bigint) {
    const answers = await prisma.questionAnswer.findMany({
      where: { relationshipId },
      include: {
        question: true,
        user: { select: { id: true, fullName: true } }
      },
      orderBy: { answeredAt: "desc" }
    })

    const groupedMap = new Map<string, any>()
    for (const ans of answers) {
      const qId = ans.questionId.toString()
      if (!groupedMap.has(qId)) {
        groupedMap.set(qId, {
          id: qId,
          questionId: qId,
          questionText: ans.question.questionText,
          isAiGenerated: true,
          myAnswer: null,
          partnerAnswer: null
        })
      }

      const item = groupedMap.get(qId)
      if (ans.userId === userId) {
        item.myAnswer = {
          answerText: ans.answerText,
          answeredAt: ans.answeredAt
        }
      } else {
        item.partnerAnswer = {
          partnerName: ans.user.fullName,
          answerText: ans.answerText,
          answeredAt: ans.answeredAt
        }
      }
    }

    return Array.from(groupedMap.values())
  }
}

export class QuestionController {
  static today = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const data = await QuestionService.getTodayQuestion(relationshipId, userId)
    return ApiResponse.success(res, "Today's question retrieved.", data)
  }

  static reroll = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { currentQuestionId } = req.body
    const data = await QuestionService.rerollTodayQuestion(relationshipId, userId, currentQuestionId)
    return ApiResponse.success(res, "Question rerolled to a fresh prompt! 🎲✨", data)
  }

  static answer = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { id } = req.params
    const validated = answerSchema.parse(req.body)
    const data = await QuestionService.submitAnswer(id, relationshipId, userId, validated.answerText)
    return ApiResponse.created(res, "Answer submitted.", data)
  }

  static history = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const data = await QuestionService.getHistory(relationshipId, userId)
    return ApiResponse.success(res, "Question history retrieved.", data)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.get("/today", asyncHandler(QuestionController.today))
router.post("/today/reroll", asyncHandler(QuestionController.reroll))
router.post("/:id/answer", asyncHandler(QuestionController.answer))
router.get("/history", asyncHandler(QuestionController.history))

export { router as questionRoutes }
