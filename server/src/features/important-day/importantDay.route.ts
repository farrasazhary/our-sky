import { prisma } from "../../config/database"
import { Response, Router } from "express"
import { authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { DateHelper } from "../../shared/utils/dateHelper"
import { RelationshipEventService } from "../relationship-event/relationshipEvent.service"
import { EVENT_TYPES } from "../../shared/constants/eventTypes"
import { z } from "zod"

const createImportantDaySchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  eventDate: z.string().min(1, "Event date is required"),
  category: z.string().default("Anniversary"),
  repeatRule: z.string().default("Yearly"),
  description: z.string().optional()
})

export class ImportantDayService {
  static async getImportantDays(relationshipId: bigint) {
    const days = await prisma.importantDay.findMany({
      where: { relationshipId },
      orderBy: { eventDate: "asc" }
    })

    return days.map(d => {
      const nextDate = d.repeatRule === "Yearly" ? DateHelper.getNextYearlyDate(d.eventDate) : d.eventDate
      const daysLeft = DateHelper.calculateDaysLeft(nextDate)

      return {
        id: d.id.toString(),
        title: d.title,
        eventDate: d.eventDate,
        category: d.category,
        repeatRule: d.repeatRule,
        description: d.description,
        nextOccurrence: nextDate,
        daysLeft
      }
    })
  }

  static async createImportantDay(relationshipId: bigint, data: any) {
    const eventDate = new Date(data.eventDate)
    
    // Normalize repeatRule to "Yearly" or "One Time"
    const rawRepeat = String(data.repeatRule || "Yearly").toUpperCase()
    const repeatRule = rawRepeat.includes("ONE") ? "One Time" : "Yearly"

    const day = await prisma.importantDay.create({
      data: {
        relationshipId,
        title: data.title,
        eventDate,
        category: data.category || "Anniversary",
        repeatRule,
        description: data.description || null
      }
    })

    await RelationshipEventService.recordEvent({
      relationshipId,
      eventType: EVENT_TYPES.IMPORTANT_DAY_CREATED,
      sourceEntity: "important_days",
      sourceId: day.id,
      description: `Marked an important day: "${day.title}"`
    })

    return {
      id: day.id.toString(),
      title: day.title,
      eventDate: day.eventDate,
      repeatRule: day.repeatRule
    }
  }

  static async getCountdowns(relationshipId: bigint) {
    const days = await this.getImportantDays(relationshipId)
    // Filter & sort by nearest countdown
    return days
      .filter(d => d.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
  }
}

export class ImportantDayController {
  static list = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const data = await ImportantDayService.getImportantDays(relationshipId)
    return ApiResponse.success(res, "Important days retrieved.", data)
  }

  static create = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const validated = createImportantDaySchema.parse(req.body)
    const data = await ImportantDayService.createImportantDay(relationshipId, validated)
    return ApiResponse.created(res, "Important day added successfully.", data)
  }

  static countdowns = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const data = await ImportantDayService.getCountdowns(relationshipId)
    return ApiResponse.success(res, "Countdowns retrieved.", data)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.get("/", asyncHandler(ImportantDayController.list))
router.post("/", asyncHandler(ImportantDayController.create))

export { router as importantDayRoutes }
