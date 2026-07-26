import { Response, Router } from "express"
import { authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { RelationshipEventService } from "../relationship-event/relationshipEvent.service"
import { NotificationService } from "../notification/notification.route"
import { AiService } from "../ai/ai.service"
import { prisma } from "../../config/database"
import { EVENT_TYPES } from "../../shared/constants/eventTypes"
import { DATE_IDEAS_365 } from "./dateIdeas365"

export class RandomDateService {
  static async rollIdea() {
    const randomIndex = Math.floor(Math.random() * DATE_IDEAS_365.length)
    return DATE_IDEAS_365[randomIndex]
  }

  static async generateAiDateIdea(category: string = "ROMANTIC") {
    const aiIdea = await AiService.generateCustomDateIdea(category)
    return {
      id: `ai-${Date.now()}`,
      title: aiIdea.title,
      category: aiIdea.category,
      duration: aiIdea.estimatedBudget || "2 Jam",
      isAiGenerated: true
    }
  }

  static async getStatus(relationshipId: bigint, userId: bigint) {
    const activeProposalEvent = await prisma.relationshipEvent.findFirst({
      where: {
        relationshipId,
        eventType: "DATE_PROPOSED",
      },
      orderBy: { createdAt: "desc" },
    })

    let activeProposal = null
    if (activeProposalEvent) {
      try {
        const payload = JSON.parse(activeProposalEvent.description)
        if (payload.status === "PENDING") {
          activeProposal = {
            id: activeProposalEvent.id.toString(),
            title: payload.title,
            category: payload.category || "Date Idea",
            duration: payload.duration || "1-2 Hours",
            proposedById: payload.proposedById,
            isProposedByMe: payload.proposedById === userId.toString(),
            createdAt: activeProposalEvent.createdAt,
          }
        }
      } catch (err) {
        // Ignore parse errors
      }
    }

    const completedEvents = await prisma.relationshipEvent.findMany({
      where: {
        relationshipId,
        eventType: EVENT_TYPES.DATE_ACTIVITY_COMPLETED,
      },
      orderBy: { eventDate: "desc" },
    })

    const completedHistory = completedEvents.map((e: any) => {
      let title = e.description
      let category = "Cozy Home"
      try {
        if (e.description.startsWith("{")) {
          const parsed = JSON.parse(e.description)
          title = parsed.title
          category = parsed.category || "Date Idea"
        } else if (e.description.includes('"')) {
          title = e.description.split('"')[1] || e.description
        }
      } catch (err) {}

      return {
        id: e.id.toString(),
        title,
        category,
        date: new Date(e.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }
    })

    return { activeProposal, completedHistory }
  }

  static async proposeDate(relationshipId: bigint, userId: bigint, title: string, category: string, duration?: string) {
    const payload = JSON.stringify({
      title,
      category,
      duration: duration || "1-2 Hours",
      proposedById: userId.toString(),
      status: "PENDING",
    })

    const event = await prisma.relationshipEvent.create({
      data: {
        relationshipId,
        eventType: "DATE_PROPOSED",
        sourceEntity: "random_dates",
        sourceId: BigInt(Date.now()),
        description: payload,
      },
    })

    // Dispatch partner notification when date idea is proposed
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      "New Date Idea Invitation! 🎲✨",
      `Your partner invited you to a date idea: "${title}"`,
      "RANDOM_DATE"
    )

    return { id: event.id.toString(), title, category, status: "PENDING" }
  }

  static async approveDate(relationshipId: bigint, proposalId: string, userId: bigint) {
    const proposalEvent = await prisma.relationshipEvent.findUnique({
      where: { id: BigInt(proposalId) },
    })

    if (!proposalEvent) {
      throw new Error("Date proposal not found.")
    }

    let title = "Random Date"
    let category = "Food & Drink"
    try {
      const parsed = JSON.parse(proposalEvent.description)
      title = parsed.title || title
      category = parsed.category || category
    } catch (err) {}

    await prisma.relationshipEvent.update({
      where: { id: BigInt(proposalId) },
      data: {
        description: JSON.stringify({ title, category, status: "APPROVED", approvedById: userId.toString() }),
      },
    })

    await RelationshipEventService.recordEvent({
      relationshipId,
      eventType: EVENT_TYPES.DATE_ACTIVITY_COMPLETED,
      sourceEntity: "random_dates",
      sourceId: BigInt(Date.now()),
      description: title,
    })

    // Dispatch notification to partner that date proposal was accepted
    await NotificationService.notifyPartner(
      relationshipId,
      userId,
      "Date Idea Accepted! 🎉",
      `Your partner accepted your date idea: "${title}"! Time for a date!`,
      "RANDOM_DATE"
    )

    return { success: true, title, category }
  }

  static async declineDate(relationshipId: bigint, proposalId: string, userId: bigint) {
    const proposalEvent = await prisma.relationshipEvent.findUnique({
      where: { id: BigInt(proposalId) },
    })

    let title = "Random Date"
    let proposedById = ""
    if (proposalEvent) {
      try {
        const parsed = JSON.parse(proposalEvent.description)
        title = parsed.title || title
        proposedById = parsed.proposedById || ""
      } catch (err) {}
    }

    await prisma.relationshipEvent.update({
      where: { id: BigInt(proposalId) },
      data: {
        description: JSON.stringify({ title, status: "REJECTED", rejectedById: userId.toString() }),
      },
    })

    const isCancelByProposer = proposedById === userId.toString()

    if (isCancelByProposer) {
      // Proposer canceled their own date proposal
      await NotificationService.notifyPartner(
        relationshipId,
        userId,
        "Date Proposal Canceled 🚫",
        `Your partner canceled their date proposal: "${title}".`,
        "RANDOM_DATE"
      )
    } else {
      // Recipient declined the proposal
      await NotificationService.notifyPartner(
        relationshipId,
        userId,
        "Date Idea Declined 💔",
        `Your partner declined your date proposal: "${title}". Roll again for another idea!`,
        "RANDOM_DATE"
      )
    }

    return { success: true }
  }
}

export class RandomDateController {
  static getStatus = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const status = await RandomDateService.getStatus(relationshipId, userId)
    return ApiResponse.success(res, "Random date status retrieved.", status)
  }

  static roll = async (_req: RelationshipRequest, res: Response) => {
    const idea = await RandomDateService.rollIdea()
    return ApiResponse.success(res, "Random date idea rolled.", idea)
  }

  static generateAi = async (req: RelationshipRequest, res: Response) => {
    const { category } = req.body
    const aiIdea = await RandomDateService.generateAiDateIdea(category || "ROMANTIC")
    return ApiResponse.success(res, "AI Date idea generated successfully. ✨", aiIdea)
  }

  static propose = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const { title, category, duration } = req.body
    if (!title || !category) {
      return ApiResponse.error(res, "Title and category are required.", 400)
    }

    const result = await RandomDateService.proposeDate(relationshipId, userId, title, category, duration)
    return ApiResponse.created(res, "Date proposed to partner.", result)
  }

  static approve = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const proposalId = req.params.proposalId || req.body.proposalId
    if (!proposalId) {
      return ApiResponse.error(res, "Proposal ID is required.", 400)
    }
    const result = await RandomDateService.approveDate(relationshipId, proposalId, userId)
    return ApiResponse.success(res, "Date proposal approved! 🎉", result)
  }

  static decline = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const proposalId = req.params.proposalId || req.body.proposalId
    if (!proposalId) {
      return ApiResponse.error(res, "Proposal ID is required.", 400)
    }
    const result = await RandomDateService.declineDate(relationshipId, proposalId, userId)
    return ApiResponse.success(res, "Date proposal declined.", result)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.get("/status", asyncHandler(RandomDateController.getStatus))
router.get("/roll", asyncHandler(RandomDateController.roll))
router.post("/ai-generate", asyncHandler(RandomDateController.generateAi))
router.post("/propose", asyncHandler(RandomDateController.propose))

// Flexible routing aliases for approve & decline/cancel
router.put("/propose/:proposalId/approve", asyncHandler(RandomDateController.approve))
router.post("/propose/:proposalId/approve", asyncHandler(RandomDateController.approve))
router.put("/approve", asyncHandler(RandomDateController.approve))
router.post("/approve", asyncHandler(RandomDateController.approve))

router.put("/propose/:proposalId/decline", asyncHandler(RandomDateController.decline))
router.post("/propose/:proposalId/decline", asyncHandler(RandomDateController.decline))
router.put("/decline", asyncHandler(RandomDateController.decline))
router.post("/decline", asyncHandler(RandomDateController.decline))

export { router as randomDateRoutes }
