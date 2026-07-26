import dotenv from "dotenv"
dotenv.config()

import app from "./app"
import { prisma } from "./config/database"
import { initScheduler } from "./scheduler"

const PORT = process.env.PORT || 5050

async function main() {
  try {
    // Verify database connection
    await prisma.$connect()
    console.log("✅ Database connected successfully")

    // Start background schedulers
    initScheduler()

    app.listen(PORT, () => {
      console.log(`🚀 OurSky Server listening on port ${PORT}`)
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
