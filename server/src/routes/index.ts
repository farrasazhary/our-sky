import { Router } from "express"
import { authRoutes } from "../features/auth/auth.route"
import { userRoutes } from "../features/user/user.route"
import { relationshipRoutes } from "../features/relationship/relationship.route"
import { memoryRoutes } from "../features/memory/memory.route"
import { questionRoutes } from "../features/question/question.route"
import { dreamRoutes } from "../features/dream/dream.route"
import { importantDayRoutes } from "../features/important-day/importantDay.route"
import { timeCapsuleRoutes } from "../features/time-capsule/timeCapsule.route"
import { openWhenRoutes } from "../features/open-when/openWhen.route"
import { randomDateRoutes } from "../features/random-date/randomDate.route"
import { constellationRoutes } from "../features/constellation/constellation.route"
import { notificationRoutes } from "../features/notification/notification.route"
import { heartbeatRoutes } from "../features/heartbeat/heartbeat.route"
import { ImportantDayController } from "../features/important-day/importantDay.route"
import { authenticate } from "../middleware/authenticate"
import { authorizeRelationship } from "../middleware/authorize"
import { asyncHandler } from "../shared/utils/asyncHandler"

const router = Router()

// Public Auth Routes
router.use("/auth", authRoutes)
router.use("/users", userRoutes)

// Relationship Management Routes
router.use("/relationships", relationshipRoutes)

// Feature Routes
router.use("/memories", memoryRoutes)
router.use("/questions", questionRoutes)
router.use("/dreams", dreamRoutes)
router.use("/important-days", importantDayRoutes)
router.use("/countdowns", authenticate, authorizeRelationship, asyncHandler(ImportantDayController.countdowns))
router.use("/time-capsules", timeCapsuleRoutes)
router.use("/open-whens", openWhenRoutes)
router.use("/random-dates", randomDateRoutes)
router.use("/constellation", constellationRoutes)
router.use("/notifications", notificationRoutes)
router.use("/heartbeats", heartbeatRoutes)

export { router }
