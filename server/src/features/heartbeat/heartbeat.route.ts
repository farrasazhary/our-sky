import { Response, Router } from "express"
import { authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { RelationshipEventService } from "../relationship-event/relationshipEvent.service"
import { NotificationService } from "../notification/notification.route"
import { prisma } from "../../config/database"
import { EVENT_TYPES } from "../../shared/constants/eventTypes"

export class HeartbeatService {
  static async sendHeartbeat(relationshipId: bigint, userId: bigint, message?: string) {
    const customMessage = message?.trim() || "Aku lagi kangen banget sama kamu! 💓"
    
    // Get sender info
    const sender = await prisma.user.findUnique({
      where: { id: userId },
      select: { fullName: true }
    })

    const senderName = sender?.fullName || "Your partner"

    // Record relationship event
    const event = await RelationshipEventService.recordEvent({
      relationshipId,
      eventType: "HEARTBEAT_SENT",
      sourceEntity: "heartbeats",
      sourceId: BigInt(Date.now()),
      description: JSON.stringify({
        senderName,
        message: customMessage,
        sentAt: new Date()
      })
    })

    // Dispatch real-time system notification to partner
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      "Heartbeat Pulse Received! 💓",
      `${senderName} sent you a heartbeat: "${customMessage}"`,
      "HEARTBEAT"
    )

    // Get updated total count
    const totalCount = await prisma.relationshipEvent.count({
      where: {
        relationshipId,
        eventType: "HEARTBEAT_SENT"
      }
    })

    return {
      id: event.id.toString(),
      message: customMessage,
      senderName,
      totalCount,
      sentAt: event.createdAt
    }
  }

  static async getStats(relationshipId: bigint) {
    const totalCount = await prisma.relationshipEvent.count({
      where: {
        relationshipId,
        eventType: "HEARTBEAT_SENT"
      }
    })

    const latestEvent = await prisma.relationshipEvent.findFirst({
      where: {
        relationshipId,
        eventType: "HEARTBEAT_SENT"
      },
      orderBy: { createdAt: "desc" }
    })

    let latest = null
    if (latestEvent) {
      try {
        const payload = JSON.parse(latestEvent.description)
        latest = {
          senderName: payload.senderName,
          message: payload.message,
          sentAt: latestEvent.createdAt
        }
      } catch (e) {
        // Fallback if raw string
        latest = {
          message: latestEvent.description,
          sentAt: latestEvent.createdAt
        }
      }
    }

    return {
      totalCount,
      latest
    }
  }
}

export class HeartbeatController {
  static send = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { message } = req.body
    const result = await HeartbeatService.sendHeartbeat(relationshipId, userId, message)
    return ApiResponse.created(res, "Heartbeat pulse sent successfully. 💓", result)
  }

  static stats = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const result = await HeartbeatService.getStats(relationshipId)
    return ApiResponse.success(res, "Heartbeat stats retrieved.", result)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.post("/send", asyncHandler(HeartbeatController.send))
router.get("/stats", asyncHandler(HeartbeatController.stats))

export { router as heartbeatRoutes }
