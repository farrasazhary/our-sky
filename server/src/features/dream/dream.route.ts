import { prisma } from "../../config/database"
import { Response, Router } from "express"
import { authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { uploadSingle } from "../../middleware/upload"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { AppError } from "../../shared/errors/AppError"
import { RelationshipEventService } from "../relationship-event/relationshipEvent.service"
import { NotificationService } from "../notification/notification.route"
import { EVENT_TYPES } from "../../shared/constants/eventTypes"
import { z } from "zod"

const createDreamSchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  description: z.string().max(1000).optional(),
  category: z.string().default("Travel"),
  targetDate: z.string().optional()
})

const createMilestoneSchema = z.object({
  title: z.string().min(1, "Title is required").max(150)
})

export class DreamService {
  static async getDreams(relationshipId: bigint) {
    const dreams = await prisma.dream.findMany({
      where: { relationshipId },
      include: { milestones: true },
      orderBy: { createdAt: "desc" }
    })

    return dreams.map(d => ({
      id: d.id.toString(),
      title: d.title,
      description: d.description,
      category: d.category,
      status: d.status,
      targetDate: d.targetDate,
      coverImage: d.coverImage,
      milestones: d.milestones.map(m => ({
        id: m.id.toString(),
        title: m.title,
        isCompleted: m.isCompleted
      }))
    }))
  }

  static async createDream(relationshipId: bigint, userId: bigint, data: any, file?: Express.Multer.File) {
    const dream = await prisma.dream.create({
      data: {
        relationshipId,
        title: data.title,
        description: data.description || null,
        category: data.category || "Travel",
        targetDate: data.targetDate ? new Date(data.targetDate) : null,
        coverImage: file ? `/uploads/${file.filename}` : null,
        status: "IN_PROGRESS"
      }
    })

    // Dispatch real-time push notification to partner
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      "New Dream Goal Added! 🎯",
      `Your partner added a new dream: "${dream.title}"`,
      "INFO",
      "/dream-board"
    ).catch((err) => console.warn("Dream notification error:", err))

    return {
      id: dream.id.toString(),
      title: dream.title,
      category: dream.category,
      status: dream.status
    }
  }

  static async toggleDreamStatus(idStr: string, relationshipId: bigint, userId?: bigint) {
    const id = BigInt(idStr)
    const dream = await prisma.dream.findFirst({
      where: { id, relationshipId }
    })

    if (!dream) {
      throw new AppError("Dream not found.", 404)
    }

    const nextStatus = dream.status === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED"
    const updated = await prisma.dream.update({
      where: { id },
      data: { status: nextStatus }
    })

    if (nextStatus === "COMPLETED") {
      await RelationshipEventService.recordEvent({
        relationshipId,
        eventType: EVENT_TYPES.DREAM_COMPLETED,
        sourceEntity: "dreams",
        sourceId: updated.id,
        description: `Accomplished a dream goal: "${updated.title}"!`
      })

      if (userId) {
        await NotificationService.notifyPartner(
          relationshipId,
          userId,
          "Dream Accomplished! 🎉",
          `Your partner completed a dream goal: "${updated.title}"!`,
          "INFO",
          "/dream-board"
        ).catch((err) => console.warn("Dream completion notification error:", err))
      }
    }

    return {
      id: updated.id.toString(),
      status: updated.status
    }
  }

  static async addMilestone(dreamIdStr: string, relationshipId: bigint, title: string) {
    const dreamId = BigInt(dreamIdStr)
    const dream = await prisma.dream.findFirst({
      where: { id: dreamId, relationshipId }
    })

    if (!dream) {
      throw new AppError("Dream not found.", 404)
    }

    const milestone = await prisma.dreamMilestone.create({
      data: {
        dreamId,
        title,
        isCompleted: false
      }
    })

    return {
      id: milestone.id.toString(),
      title: milestone.title,
      isCompleted: milestone.isCompleted
    }
  }

  static async toggleMilestone(milestoneIdStr: string, relationshipId: bigint) {
    const milestoneId = BigInt(milestoneIdStr)
    const milestone = await prisma.dreamMilestone.findFirst({
      where: { id: milestoneId },
      include: { dream: true }
    })

    if (!milestone || milestone.dream.relationshipId !== relationshipId) {
      throw new AppError("Milestone not found.", 404)
    }

    const updated = await prisma.dreamMilestone.update({
      where: { id: milestoneId },
      data: { isCompleted: !milestone.isCompleted }
    })

    return {
      id: updated.id.toString(),
      isCompleted: updated.isCompleted
    }
  }
}

export class DreamController {
  static list = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const data = await DreamService.getDreams(relationshipId)
    return ApiResponse.success(res, "Dreams retrieved.", data)
  }

  static create = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const validated = createDreamSchema.parse(req.body)
    const data = await DreamService.createDream(relationshipId, userId, validated, req.file)
    return ApiResponse.created(res, "Dream created successfully.", data)
  }

  static toggleStatus = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { id } = req.params
    const data = await DreamService.toggleDreamStatus(id, relationshipId, userId)
    return ApiResponse.success(res, "Dream status updated.", data)
  }

  static addMilestone = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const { id } = req.params
    const validated = createMilestoneSchema.parse(req.body)
    const data = await DreamService.addMilestone(id, relationshipId, validated.title)
    return ApiResponse.created(res, "Milestone added.", data)
  }

  static toggleMilestone = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const { milestoneId } = req.params
    const data = await DreamService.toggleMilestone(milestoneId, relationshipId)
    return ApiResponse.success(res, "Milestone status updated.", data)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.get("/", asyncHandler(DreamController.list))
router.post("/", uploadSingle, asyncHandler(DreamController.create))
router.patch("/:id/toggle", asyncHandler(DreamController.toggleStatus))
router.post("/:id/milestones", asyncHandler(DreamController.addMilestone))
router.patch("/milestones/:milestoneId/toggle", asyncHandler(DreamController.toggleMilestone))

export { router as dreamRoutes }
