import { Router } from "express"
import { RelationshipController } from "./relationship.controller"
import { authenticate } from "../../middleware/authenticate"
import { uploadSingle } from "../../middleware/upload"
import { asyncHandler } from "../../shared/utils/asyncHandler"

const router = Router()

// All relationship routes require authentication
router.use(authenticate)

router.get("/me", asyncHandler(RelationshipController.getMe))
router.post("/invite", asyncHandler(RelationshipController.invite))
router.post("/accept", asyncHandler(RelationshipController.accept))
router.put("/started-at", asyncHandler(RelationshipController.updateStartedAt))
router.put("/cover", uploadSingle, asyncHandler(RelationshipController.updateCover))

export { router as relationshipRoutes }
