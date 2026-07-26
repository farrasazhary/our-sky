import { prisma } from "../../config/database"
import { Request, Response, Router } from "express"
import { AuthRequest, authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { uploadSingle } from "../../middleware/upload"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { AppError } from "../../shared/errors/AppError"
import { RelationshipEventService } from "../relationship-event/relationshipEvent.service"
import { EVENT_TYPES } from "../../shared/constants/eventTypes"
import { NotificationService } from "../notification/notification.route"
import { z } from "zod"
import sharp from "sharp"
import fs from "fs"

const createMemorySchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  description: z.string().max(300).optional(),
  memoryDate: z.string().optional(),
  location: z.string().max(150).optional()
})

export class MemoryService {
  static async getMemories(relationshipId: bigint, userId: bigint) {
    const userIdStr = userId.toString()

    const memories = await prisma.memory.findMany({
      where: { relationshipId },
      include: {
        media: true
      },
      orderBy: { memoryDate: "desc" }
    })

    const events = await prisma.relationshipEvent.findMany({
      where: {
        relationshipId,
        sourceEntity: "memories"
      }
    })

    const eventAuthorMap = new Map<string, string>()
    for (const ev of events) {
      try {
        if (ev.description && ev.description.startsWith("{")) {
          const parsed = JSON.parse(ev.description)
          if (parsed.createdById) {
            eventAuthorMap.set(ev.sourceId.toString(), parsed.createdById)
          }
        }
      } catch (err) {}
    }

    return memories.map(m => {
      let isMine = false
      const mId = m.id.toString()

      if (eventAuthorMap.has(mId)) {
        isMine = eventAuthorMap.get(mId) === userIdStr
      } else if (m.description && m.description.includes(`[author:${userIdStr}]`)) {
        isMine = true
      } else if (m.description && m.description.includes(`[author:`)) {
        isMine = false
      } else {
        isMine = true
      }

      const cleanDescription = m.description 
        ? m.description.replace(/\s*\[author:\d+\]\s*/g, "").trim()
        : ""

      return {
        id: mId,
        title: m.title,
        description: cleanDescription,
        memoryDate: m.memoryDate,
        location: m.location,
        photos: m.media.map(media => media.fileUrl),
        isMine,
        author: isMine ? "Mine" : "Partner"
      }
    })
  }

  static async createMemory(relationshipId: bigint, userId: bigint, data: any, file?: Express.Multer.File) {
    let targetDate: Date
    if (data.memoryDate && typeof data.memoryDate === "string") {
      const parts = data.memoryDate.split("-")
      if (parts.length === 3) {
        targetDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0)
      } else {
        const now = new Date()
        targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0)
      }
    } else {
      const now = new Date()
      targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0)
    }

    const userIdStr = userId.toString()

    // Check if THIS SPECIFIC USER has already uploaded a memory for targetDate
    const existingMemoriesForToday = await prisma.memory.findMany({
      where: {
        relationshipId,
        memoryDate: targetDate
      }
    })

    const eventsToday = await prisma.relationshipEvent.findMany({
      where: {
        relationshipId,
        sourceEntity: "memories"
      }
    })

    const userEventsTodaySet = new Set<string>()
    for (const ev of eventsToday) {
      try {
        if (ev.description && ev.description.startsWith("{")) {
          const parsed = JSON.parse(ev.description)
          if (parsed.createdById === userIdStr) {
            userEventsTodaySet.add(ev.sourceId.toString())
          }
        }
      } catch (err) {}
    }

    const hasUserUploadedToday = existingMemoriesForToday.some(m => {
      if (userEventsTodaySet.has(m.id.toString())) return true
      if (m.description && m.description.includes(`[author:${userIdStr}]`)) return true
      return false
    })

    if (hasUserUploadedToday) {
      throw new AppError("Anda hanya dapat mengunggah 1 foto memori per hari! Foto Anda untuk hari ini sudah tersimpan.", 400)
    }

    // Backend Sharp Compression (1080p WebP @ 80% quality)
    if (file && file.path && fs.existsSync(file.path)) {
      try {
        const compressedBuffer = await sharp(file.path)
          .resize(1080, 1080, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer()

        fs.writeFileSync(file.path, compressedBuffer)
      } catch (sharpErr) {
        console.warn("Backend Sharp memory compression warning:", sharpErr)
      }
    }

    const descriptionWithTag = data.description 
      ? `${data.description} [author:${userIdStr}]`
      : `[author:${userIdStr}]`

    const memory = await prisma.memory.create({
      data: {
        relationshipId,
        title: data.title,
        description: descriptionWithTag,
        memoryDate: targetDate,
        location: data.location || null,
        ...(file && {
          media: {
            create: {
              fileUrl: `/uploads/${file.filename}`,
              mediaType: "IMAGE"
            }
          }
        })
      },
      include: { media: true }
    })

    await RelationshipEventService.recordEvent({
      relationshipId,
      eventType: EVENT_TYPES.MEMORY_CREATED,
      sourceEntity: "memories",
      sourceId: memory.id,
      description: JSON.stringify({ title: memory.title, createdById: userIdStr })
    })

    // Dispatch partner notification
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      "New Memory Photo 📸",
      `Your partner recorded a new memory: "${memory.title}"`,
      "MEMORY"
    )

    return {
      id: memory.id.toString(),
      title: memory.title,
      description: data.description || "",
      memoryDate: memory.memoryDate,
      photos: memory.media.map(m => m.fileUrl),
      isMine: true
    }
  }
}

export class MemoryController {
  static list = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const data = await MemoryService.getMemories(relationshipId, userId)
    return ApiResponse.success(res, "Memories retrieved.", data)
  }

  static create = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const validated = createMemorySchema.parse(req.body)
    const file = req.file
    const data = await MemoryService.createMemory(relationshipId, userId, validated, file)
    return ApiResponse.created(res, "Memory created successfully.", data)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.get("/", asyncHandler(MemoryController.list))
router.post("/", uploadSingle, asyncHandler(MemoryController.create))

export { router as memoryRoutes }
