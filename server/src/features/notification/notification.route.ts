import { prisma } from "../../config/database"
import { Request, Response, Router } from "express"
import { AuthRequest, authenticate } from "../../middleware/authenticate"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { VAPID_PUBLIC_KEY } from "../../config/webpush.config"
import webpush from "web-push"

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

  static async savePushSubscription(userId: bigint, endpoint: string, p256dh: string, auth: string) {
    // Delete existing subscription with same endpoint if exists
    await prisma.pushSubscription.deleteMany({
      where: { endpoint }
    })

    return prisma.pushSubscription.create({
      data: {
        userId,
        endpoint,
        p256dh,
        auth
      }
    })
  }

  static async findUserSubscriptions(userId: bigint) {
    return prisma.pushSubscription.findMany({
      where: { userId }
    })
  }

  static async deleteSubscriptionByEndpoint(endpoint: string) {
    return prisma.pushSubscription.deleteMany({
      where: { endpoint }
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

  static async saveSubscription(userIdStr: string, subscription: { endpoint: string; keys: { p256dh: string; auth: string } }) {
    const userId = BigInt(userIdStr)
    const { endpoint, keys } = subscription
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      throw new Error("Invalid subscription object")
    }
    return NotificationRepository.savePushSubscription(userId, endpoint, keys.p256dh, keys.auth)
  }

  /**
   * Dispatches background Web Push to user's registered devices via Google FCM / Apple APNs
   */
  static async sendWebPushToUser(userId: bigint, payload: { title: string; message: string; type?: string }) {
    try {
      const subs = await NotificationRepository.findUserSubscriptions(userId)
      if (subs.length === 0) return

      const pushPayload = JSON.stringify({
        title: payload.title,
        message: payload.message,
        type: payload.type || "INFO",
        sentAt: new Date()
      })

      for (const sub of subs) {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        }

        webpush.sendNotification(pushSubscription, pushPayload).catch((err: any) => {
          if (err.statusCode === 404 || err.statusCode === 410) {
            // Subscription expired or unsubscribed, delete from DB
            NotificationRepository.deleteSubscriptionByEndpoint(sub.endpoint).catch(() => null)
          } else {
            console.warn("Web Push dispatch warning:", err.message)
          }
        })
      }
    } catch (err) {
      console.warn("Failed to dispatch web push notifications:", err)
    }
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

      // Use string comparison to safely compare BigInt / string IDs
      const recipientUserId = rel.userOneId.toString() === senderUserId.toString() ? rel.userTwoId : rel.userOneId
      
      // 1. Create DB notification
      const dbNotif = await NotificationRepository.createNotification(recipientUserId, title, message, notificationType)

      // 2. Dispatch Background Web Push safely without blocking response
      this.sendWebPushToUser(recipientUserId, { title, message, type: notificationType }).catch(e => {
        console.warn("Background Web Push warning:", e)
      })

      return dbNotif
    } catch (err) {
      console.warn("Failed to dispatch partner notification:", err)
      return null
    }
  }
}

export class NotificationController {
  static getVapidKey = async (_req: Request, res: Response) => {
    return ApiResponse.success(res, "VAPID Public Key retrieved.", { publicKey: VAPID_PUBLIC_KEY })
  }

  static subscribe = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    const { subscription } = req.body
    await NotificationService.saveSubscription(userId, subscription)
    return ApiResponse.created(res, "Push subscription registered successfully.")
  }

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

// VAPID Public key can be retrieved publicly or authenticated
router.get("/vapid-key", asyncHandler(NotificationController.getVapidKey))

router.use(authenticate)

router.post("/subscribe", asyncHandler(NotificationController.subscribe))
router.get("/", asyncHandler(NotificationController.getList))
router.put("/read-all", asyncHandler(NotificationController.readAll))
router.put("/:id/read", asyncHandler(NotificationController.read))

export { router as notificationRoutes }
