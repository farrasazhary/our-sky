import { Router } from "express"
import { AuthController } from "./auth.controller"
import { asyncHandler } from "../../shared/utils/asyncHandler"

const router = Router()

router.post("/register", asyncHandler(AuthController.register))
router.post("/login", asyncHandler(AuthController.login))
router.post("/logout", asyncHandler(AuthController.logout))

export { router as authRoutes }
