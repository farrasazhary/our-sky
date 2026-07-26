import { prisma } from "../../config/database"
import { Request, Response, Router } from "express"
import { AuthRequest, authenticate } from "../../middleware/authenticate"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"

export class NotificationRepository {
  static async createNotification(userId: bigint, title: string, message: string, notificationType: string = "INFO") {
    return prisma.notification.create({
      data: {
        userId,
        title,
        message,
        notificationType
      }
    })
  }

  static async findUserNotifications(userId: bigint) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    })
  }

  static async markAsRead(id: bigint, userId: bigint) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true }
    })
  }

  static async markAllAsRead(userId: bigint) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    })
  }
}

export class NotificationService {
  static async getUserNotifications(userIdStr: string) {
    const userId = BigInt(userIdStr)
    const list = await NotificationRepository.findUserNotifications(userId)
    return list.map(n => ({
      id: n.id.toString(),
      title: n.title,
      message: n.message,
      type: n.notificationType,
      isRead: n.isRead,
      createdAt: n.createdAt
    }))
  }

  static async markNotificationRead(idStr: string, userIdStr: string) {
    const id = BigInt(idStr)
    const userId = BigInt(userIdStr)
    await NotificationRepository.markAsRead(id, userId)
    return { success: true }
  }

  static async markAllNotificationsRead(userIdStr: string) {
    const userId = BigInt(userIdStr)
    await NotificationRepository.markAllAsRead(userId)
    return { success: true }
  }

  /**
   * Helper method to send a notification to the partner in a relationship
   */
  static async notifyPartner(relationshipId: bigint, senderUserId: bigint, title: string, message: string, notificationType: string = "INFO") {
    try {
      const rel = await prisma.relationship.findUnique({
        where: { id: relationshipId }
      })
      if (!rel) return null

      const recipientUserId = rel.userOneId === senderUserId ? rel.userTwoId : rel.userOneId
      return await NotificationRepository.createNotification(recipientUserId, title, message, notificationType)
    } catch (err) {
      console.warn("Failed to dispatch partner notification:", err)
      return null
    }
  }
}

export class NotificationController {
  static getList = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    const data = await NotificationService.getUserNotifications(userId)
    return ApiResponse.success(res, "Notifications retrieved.", data)
  }

  static read = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    const { id } = req.params
    await NotificationService.markNotificationRead(id, userId)
    return ApiResponse.success(res, "Notification marked as read.")
  }

  static readAll = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    await NotificationService.markAllNotificationsRead(userId)
    return ApiResponse.success(res, "All notifications marked as read.")
  }
}

const router = Router()
router.use(authenticate)

router.get("/", asyncHandler(NotificationController.getList))
router.put("/read-all", asyncHandler(NotificationController.readAll))
router.put("/:id/read", asyncHandler(NotificationController.read))

export { router as notificationRoutes }
