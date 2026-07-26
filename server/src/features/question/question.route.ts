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
import { z } from "zod"

const answerSchema = z.object({
  answerText: z.string().min(1, "Answer is required").max(500, "Answer cannot exceed 500 characters")
})

const DEFAULT_QUESTIONS = [
  "What is a small habit of mine that you secretly love?",
  "What was your first impression of me when we first met?",
  "What is your favorite memory of us together this year?",
  "What song always reminds you of me when you hear it?",
  "If we could travel anywhere tomorrow, where would you want to go?",
  "What is something I did recently that made you feel deeply loved?",
  "What is your idea of a perfect weekend date together?",
  "What dream do you want us to accomplish together in the next 5 years?",
  "What is one thing you appreciate about our relationship the most?",
  "What is a funny moment of us that still makes you laugh out loud?",
]

export class QuestionService {
  static async getTodayQuestion(relationshipId: bigint, userId: bigint) {
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    const diffMs = now.getTime() - startOfYear.getTime()
    const oneDayMs = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diffMs / oneDayMs) + 1

    let count = await prisma.question.count({ where: { isActive: true } })
    
    // Auto-seed questions if table is empty
    if (count === 0) {
      for (const qText of DEFAULT_QUESTIONS) {
        await prisma.question.create({
          data: { questionText: qText, category: "General", isActive: true }
        })
      }
      count = await prisma.question.count({ where: { isActive: true } })
    }

    const questionOffset = (dayOfYear - 1) % count
    const question = await prisma.question.findFirst({
      where: { isActive: true },
      skip: questionOffset
    })

    if (!question) {
      throw new AppError("Question not found.", 404)
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
router.post("/:id/answer", asyncHandler(QuestionController.answer))
router.get("/history", asyncHandler(QuestionController.history))

export { router as questionRoutes }
