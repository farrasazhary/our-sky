import { prisma } from "../../config/database"
import { Response, Router } from "express"
import { authenticate, AuthRequest } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { DateHelper } from "../../shared/utils/dateHelper"
import { AppError } from "../../shared/errors/AppError"
import { RelationshipEventService } from "../relationship-event/relationshipEvent.service"
import { EVENT_TYPES } from "../../shared/constants/eventTypes"
import { NotificationService } from "../notification/notification.route"
import { z } from "zod"

const createTimeCapsuleSchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  message: z.string().min(1, "Message is required").max(5000),
  openDate: z.string().min(1, "Open date is required")
})

export class TimeCapsuleService {
  static async getCapsules(relationshipId: bigint) {
    const capsules = await prisma.timeCapsule.findMany({
      where: { relationshipId },
      orderBy: { createdAt: "desc" }
    })

    return capsules.map(c => {
      const daysLeft = DateHelper.calculateDaysLeft(c.openDate)
      const isReadyToOpen = daysLeft <= 0

      return {
        id: c.id.toString(),
        title: c.title,
        status: c.status,
        openDate: c.openDate,
        createdAt: c.createdAt,
        daysLeft: Math.max(0, daysLeft),
        isReadyToOpen,
        message: c.status === "OPENED" ? c.message : null
      }
    })
  }

  static async createCapsule(relationshipId: bigint, senderId: bigint, data: any) {
    const openDate = new Date(data.openDate)
    if (openDate <= new Date()) {
      throw new AppError("Open date must be in the future.", 400)
    }

    const capsule = await prisma.timeCapsule.create({
      data: {
        relationshipId,
        title: data.title,
        message: data.message,
        openDate,
        status: "LOCKED"
      }
    })

    await RelationshipEventService.recordEvent({
      relationshipId,
      eventType: EVENT_TYPES.TIME_CAPSULE_CREATED,
      sourceEntity: "time_capsules",
      sourceId: capsule.id,
      description: `Sealed a time capsule: "${capsule.title}"`
    })

    // Dispatch partner notification
    await NotificationService.notifyPartner(
      relationshipId,
      senderId,
      "New Time Capsule Sealed 🔒",
      `Your partner sealed a new time capsule: "${capsule.title}"!`,
      "TIME_CAPSULE"
    )

    return {
      id: capsule.id.toString(),
      title: capsule.title,
      openDate: capsule.openDate,
      status: capsule.status
    }
  }

  static async openCapsule(idStr: string, relationshipId: bigint) {
    const id = BigInt(idStr)
    const capsule = await prisma.timeCapsule.findFirst({
      where: { id, relationshipId }
    })

    if (!capsule) {
      throw new AppError("Time capsule not found.", 404)
    }

    if (new Date() < capsule.openDate) {
      throw new AppError("This time capsule is still locked until its scheduled open date.", 403)
    }

    const updated = await prisma.timeCapsule.update({
      where: { id },
      data: { status: "OPENED" }
    })

    await RelationshipEventService.recordEvent({
      relationshipId,
      eventType: EVENT_TYPES.TIME_CAPSULE_OPENED,
      sourceEntity: "time_capsules",
      sourceId: updated.id,
      description: `Unsealed a time capsule: "${updated.title}"!`
    })

    return {
      id: updated.id.toString(),
      title: updated.title,
      message: updated.message,
      status: updated.status,
      openDate: updated.openDate
    }
  }
}

export class TimeCapsuleController {
  static list = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const data = await TimeCapsuleService.getCapsules(relationshipId)
    return ApiResponse.success(res, "Time capsules retrieved.", data)
  }

  static create = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const senderId = BigInt(req.user!.userId)
    const validated = createTimeCapsuleSchema.parse(req.body)
    const data = await TimeCapsuleService.createCapsule(relationshipId, senderId, validated)
    return ApiResponse.created(res, "Time capsule sealed successfully.", data)
  }

  static open = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const { id } = req.params
    const data = await TimeCapsuleService.openCapsule(id, relationshipId)
    return ApiResponse.success(res, "Time capsule unsealed! 🎉", data)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.get("/", asyncHandler(TimeCapsuleController.list))
router.post("/", asyncHandler(TimeCapsuleController.create))
router.post("/:id/open", asyncHandler(TimeCapsuleController.open))

export { router as timeCapsuleRoutes }
