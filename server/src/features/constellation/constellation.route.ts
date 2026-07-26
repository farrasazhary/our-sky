import { Response, Router } from "express"
import { authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { RelationshipEventService } from "../relationship-event/relationshipEvent.service"

export class ConstellationController {
  static getStars = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const stars = await RelationshipEventService.getConstellationEvents(relationshipId)
    return ApiResponse.success(res, "Constellation stars retrieved.", stars)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.get("/", asyncHandler(ConstellationController.getStars))

export { router as constellationRoutes }
