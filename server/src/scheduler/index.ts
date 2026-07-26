import cron from "node-cron"
import { prisma } from "../config/database"
import { NotificationRepository } from "../features/notification/notification.route"
import { DateHelper } from "../shared/utils/dateHelper"

export function initScheduler() {
  console.log("⏰ Initializing background schedulers...")

  // Run daily at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    console.log("🔄 Running daily background check for time capsules and countdowns...")
    try {
      const today = new Date()

      // 1. Check Time Capsules ready to unlock today
      const unlockedCapsules = await prisma.timeCapsule.findMany({
        where: {
          status: "LOCKED",
          openDate: { lte: today }
        },
        include: {
          relationship: true
        }
      })

      for (const capsule of unlockedCapsules) {
        // Send notification to both partners
        await NotificationRepository.createNotification(
          capsule.relationship.userOneId,
          "Time Capsule Ready! 🎁",
          `Your time capsule "${capsule.title}" is now ready to be opened!`,
          "TIME_CAPSULE"
        )
        await NotificationRepository.createNotification(
          capsule.relationship.userTwoId,
          "Time Capsule Ready! 🎁",
          `Your time capsule "${capsule.title}" is now ready to be opened!`,
          "TIME_CAPSULE"
        )
      }

      // 2. Check Important Days coming up in 7 days or 1 day
      const importantDays = await prisma.importantDay.findMany({
        include: { relationship: true }
      })

      for (const day of importantDays) {
        const nextDate = day.repeatRule === "Yearly" ? DateHelper.getNextYearlyDate(day.eventDate) : day.eventDate
        const daysLeft = DateHelper.calculateDaysLeft(nextDate)

        if (daysLeft === 7 || daysLeft === 1) {
          const msg = daysLeft === 1 
            ? `Tomorrow is "${day.title}"! 🎉` 
            : `"${day.title}" is coming up in 7 days!`

          await NotificationRepository.createNotification(day.relationship.userOneId, "Upcoming Important Day", msg, "REMINDER")
          await NotificationRepository.createNotification(day.relationship.userTwoId, "Upcoming Important Day", msg, "REMINDER")
        }
      }

    } catch (err) {
      console.error("❌ Error in daily scheduler:", err)
    }
  })
}
