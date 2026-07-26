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

const createOpenWhenSchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  category: z.string().min(1, "Category is required"),
  message: z.string().min(1, "Message content is required")
})

export class OpenWhenService {
  static async getLetters(relationshipId: bigint, currentUserId: bigint) {
    const letters = await prisma.openWhen.findMany({
      where: { relationshipId },
      orderBy: { createdAt: "desc" }
    })

    return letters.map(l => {
      const isMine = l.senderId ? l.senderId === currentUserId : true
      return {
        id: l.id.toString(),
        title: l.title,
        category: l.category,
        message: (isMine || l.isOpened) ? l.message : "This letter is sealed until you open it.",
        isOpened: l.isOpened,
        openedAt: l.openedAt,
        senderId: l.senderId ? l.senderId.toString() : null,
        isMine
      }
    })
  }

  static async createLetter(relationshipId: bigint, senderId: bigint, data: any) {
    const letter = await prisma.openWhen.create({
      data: {
        relationshipId,
        senderId,
        title: data.title,
        category: data.category,
        message: data.message,
        isOpened: false
      }
    })

    await RelationshipEventService.recordEvent({
      relationshipId,
      eventType: EVENT_TYPES.OPEN_WHEN_CREATED,
      sourceEntity: "open_whens",
      sourceId: letter.id,
      description: `Wrote a letter: "${letter.title}"`
    })

    // Dispatch partner notification
    await NotificationService.notifyPartner(
      relationshipId,
      senderId,
      "New Open When Letter 💌",
      `Your partner wrote a new letter: "${letter.title}"`,
      "OPEN_WHEN"
    )

    return {
      id: letter.id.toString(),
      title: letter.title,
      category: letter.category,
      message: letter.message,
      isOpened: letter.isOpened,
      senderId: senderId.toString(),
      isMine: true
    }
  }

  static async openLetter(idStr: string, relationshipId: bigint, currentUserId: bigint) {
    const id = BigInt(idStr)
    const letter = await prisma.openWhen.findFirst({
      where: { id, relationshipId }
    })

    if (!letter) {
      throw new AppError("Letter not found.", 404)
    }

    const isRecipient = letter.senderId ? letter.senderId !== currentUserId : true
    const isFirstTimeOpening = isRecipient && !letter.isOpened

    let updated = letter
    if (isFirstTimeOpening) {
      updated = await prisma.openWhen.update({
        where: { id },
        data: {
          isOpened: true,
          openedAt: letter.openedAt || new Date()
        }
      })

      await RelationshipEventService.recordEvent({
        relationshipId,
        eventType: EVENT_TYPES.OPEN_WHEN_OPENED,
        sourceEntity: "open_whens",
        sourceId: updated.id,
        description: `Opened letter: "${updated.title}" ❤️`
      })

      // Dispatch notification back to author that recipient opened letter
      await NotificationService.notifyPartner(
        relationshipId,
        currentUserId,
        "Letter Opened ❤️",
        `Your partner just opened your letter: "${updated.title}"!`,
        "OPEN_WHEN"
      )
    }

    return {
      id: updated.id.toString(),
      title: updated.title,
      category: updated.category,
      message: updated.message,
      isOpened: updated.isOpened,
      openedAt: updated.openedAt,
      senderId: updated.senderId ? updated.senderId.toString() : null,
      isMine: updated.senderId ? updated.senderId === currentUserId : true
    }
  }
}

export class OpenWhenController {
  static list = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const currentUserId = BigInt(req.user!.userId)
    const data = await OpenWhenService.getLetters(relationshipId, currentUserId)
    return ApiResponse.success(res, "Open when letters retrieved.", data)
  }

  static create = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const senderId = BigInt(req.user!.userId)
    const validated = createOpenWhenSchema.parse(req.body)
    const data = await OpenWhenService.createLetter(relationshipId, senderId, validated)
    return ApiResponse.created(res, "Open when letter created successfully.", data)
  }

  static open = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const currentUserId = BigInt(req.user!.userId)
    const { id } = req.params
    const data = await OpenWhenService.openLetter(id, relationshipId, currentUserId)
    return ApiResponse.success(res, "Letter opened.", data)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.get("/", asyncHandler(OpenWhenController.list))
router.post("/", asyncHandler(OpenWhenController.create))
router.put("/:id/open", asyncHandler(OpenWhenController.open))

export { router as openWhenRoutes }
