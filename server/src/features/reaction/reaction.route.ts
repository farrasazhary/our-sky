import { Response, Router } from "express"
import { prisma } from "../../config/database"
import { authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { AppError } from "../../shared/errors/AppError"
import { NotificationService } from "../notification/notification.route"
import { z } from "zod"

const ALLOWED_EMOJIS = ["LOVE", "AMAZED", "TOUCHED", "FUNNY", "FIRE", "KISS"]

const EMOJI_MAP: Record<string, string> = {
  LOVE: "❤️",
  AMAZED: "😍",
  TOUCHED: "🥺",
  FUNNY: "😂",
  FIRE: "🔥",
  KISS: "💋",
}

const reactSchema = z.object({
  emoji: z.string().refine((val) => ALLOWED_EMOJIS.includes(val), {
    message: "Invalid emoji reaction",
  }),
})

const commentSchema = z.object({
  text: z.string().min(1, "Komentar tidak boleh kosong").max(200, "Komentar maksimal 200 karakter"),
})

export class ReactionService {
  // Answer Reaction (Upsert 1 per user)
  static async reactToAnswer(answerIdStr: string, userId: bigint, relationshipId: bigint, emoji: string) {
    const answerId = BigInt(answerIdStr)
    const answer = await prisma.questionAnswer.findFirst({
      where: { id: answerId, relationshipId },
    })

    if (!answer) {
      throw new AppError("Jawaban tidak ditemukan.", 404)
    }

    const reaction = await prisma.answerReaction.upsert({
      where: {
        answerId_userId: { answerId, userId },
      },
      update: { emoji },
      create: { answerId, userId, emoji },
    })

    const emojiSymbol = EMOJI_MAP[emoji] || "❤️"
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      `Reaksi Baru ${emojiSymbol}`,
      `Pasanganmu memberikan reaksi ${emojiSymbol} pada jawaban Question of the Day!`,
      "QUESTION",
      `/question?answerId=${answerIdStr}`
    ).catch((err) => console.warn("Answer reaction notification error:", err))

    return {
      id: reaction.id.toString(),
      answerId: reaction.answerId.toString(),
      emoji: reaction.emoji,
    }
  }

  // Remove Answer Reaction
  static async removeAnswerReaction(answerIdStr: string, userId: bigint, relationshipId: bigint) {
    const answerId = BigInt(answerIdStr)
    await prisma.answerReaction.deleteMany({
      where: { answerId, userId },
    })
    return { success: true }
  }

  // Comment on Answer
  static async commentOnAnswer(answerIdStr: string, userId: bigint, relationshipId: bigint, text: string) {
    const answerId = BigInt(answerIdStr)
    const answer = await prisma.questionAnswer.findFirst({
      where: { id: answerId, relationshipId },
    })

    if (!answer) {
      throw new AppError("Jawaban tidak ditemukan.", 404)
    }

    const comment = await prisma.answerComment.create({
      data: { answerId, userId, text },
      include: { user: { select: { fullName: true } } },
    })

    const truncated = text.length > 40 ? text.substring(0, 40) + "..." : text
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      "Komentar Baru 💬",
      `Pasanganmu berkomentar: "${truncated}"`,
      "QUESTION",
      `/question?answerId=${answerIdStr}`
    ).catch((err) => console.warn("Answer comment notification error:", err))

    return {
      id: comment.id.toString(),
      answerId: comment.answerId.toString(),
      userId: comment.userId.toString(),
      userName: comment.user.fullName,
      text: comment.text,
      createdAt: comment.createdAt,
    }
  }

  // Memory Reaction (Upsert 1 per user)
  static async reactToMemory(memoryIdStr: string, userId: bigint, relationshipId: bigint, emoji: string) {
    const memoryId = BigInt(memoryIdStr)
    const memory = await prisma.memory.findFirst({
      where: { id: memoryId, relationshipId },
    })

    if (!memory) {
      throw new AppError("Foto kenangan tidak ditemukan.", 404)
    }

    const reaction = await prisma.memoryReaction.upsert({
      where: {
        memoryId_userId: { memoryId, userId },
      },
      update: { emoji },
      create: { memoryId, userId, emoji },
    })

    const emojiSymbol = EMOJI_MAP[emoji] || "❤️"
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      `Reaksi Foto Baru ${emojiSymbol}`,
      `Pasanganmu memberikan reaksi ${emojiSymbol} pada foto kenangan!`,
      "MEMORY",
      `/memory?memoryId=${memoryIdStr}`
    ).catch((err) => console.warn("Memory reaction notification error:", err))

    return {
      id: reaction.id.toString(),
      memoryId: reaction.memoryId.toString(),
      emoji: reaction.emoji,
    }
  }

  // Remove Memory Reaction
  static async removeMemoryReaction(memoryIdStr: string, userId: bigint, relationshipId: bigint) {
    const memoryId = BigInt(memoryIdStr)
    await prisma.memoryReaction.deleteMany({
      where: { memoryId, userId },
    })
    return { success: true }
  }

  // Comment on Memory
  static async commentOnMemory(memoryIdStr: string, userId: bigint, relationshipId: bigint, text: string) {
    const memoryId = BigInt(memoryIdStr)
    const memory = await prisma.memory.findFirst({
      where: { id: memoryId, relationshipId },
    })

    if (!memory) {
      throw new AppError("Foto kenangan tidak ditemukan.", 404)
    }

    const comment = await prisma.memoryComment.create({
      data: { memoryId, userId, text },
      include: { user: { select: { fullName: true } } },
    })

    const truncated = text.length > 40 ? text.substring(0, 40) + "..." : text
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      "Komentar Foto 💬",
      `Pasanganmu berkomentar di foto: "${truncated}"`,
      "MEMORY",
      `/memory?memoryId=${memoryIdStr}`
    ).catch((err) => console.warn("Memory comment notification error:", err))

    return {
      id: comment.id.toString(),
      memoryId: comment.memoryId.toString(),
      userId: comment.userId.toString(),
      userName: comment.user.fullName,
      text: comment.text,
      createdAt: comment.createdAt,
    }
  }
}

export class ReactionController {
  static reactAnswer = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { answerId } = req.params
    const validated = reactSchema.parse(req.body)
    const data = await ReactionService.reactToAnswer(answerId, userId, relationshipId, validated.emoji)
    return ApiResponse.success(res, "Reaksi berhasil ditambahkan.", data)
  }

  static removeAnswerReaction = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { answerId } = req.params
    const data = await ReactionService.removeAnswerReaction(answerId, userId, relationshipId)
    return ApiResponse.success(res, "Reaksi berhasil dihapus.", data)
  }

  static commentAnswer = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { answerId } = req.params
    const validated = commentSchema.parse(req.body)
    const data = await ReactionService.commentOnAnswer(answerId, userId, relationshipId, validated.text)
    return ApiResponse.created(res, "Komentar berhasil ditambahkan.", data)
  }

  static reactMemory = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { memoryId } = req.params
    const validated = reactSchema.parse(req.body)
    const data = await ReactionService.reactToMemory(memoryId, userId, relationshipId, validated.emoji)
    return ApiResponse.success(res, "Reaksi foto berhasil ditambahkan.", data)
  }

  static removeMemoryReaction = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { memoryId } = req.params
    const data = await ReactionService.removeMemoryReaction(memoryId, userId, relationshipId)
    return ApiResponse.success(res, "Reaksi foto berhasil dihapus.", data)
  }

  static commentMemory = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { memoryId } = req.params
    const validated = commentSchema.parse(req.body)
    const data = await ReactionService.commentOnMemory(memoryId, userId, relationshipId, validated.text)
    return ApiResponse.created(res, "Komentar foto berhasil ditambahkan.", data)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.post("/answer/:answerId", asyncHandler(ReactionController.reactAnswer))
router.delete("/answer/:answerId", asyncHandler(ReactionController.removeAnswerReaction))
router.post("/answer/:answerId/comment", asyncHandler(ReactionController.commentAnswer))

router.post("/memory/:memoryId", asyncHandler(ReactionController.reactMemory))
router.delete("/memory/:memoryId", asyncHandler(ReactionController.removeMemoryReaction))
router.post("/memory/:memoryId/comment", asyncHandler(ReactionController.commentMemory))

export { router as reactionRoutes }
