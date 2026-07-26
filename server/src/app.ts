import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import path from "path"
import { errorHandler } from "./shared/errors/errorHandler"
import { router as apiRouter } from "./routes"

const app = express()

// Security & Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))
app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true
}))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())

// Static file serving for local image uploads
const storagePath = process.env.STORAGE_PATH || "./storage"
app.use("/uploads", express.static(path.resolve(storagePath)))
app.use("/storage", express.static(path.resolve(storagePath)))

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() })
})

// Mount API v1 Routes
app.use("/api/v1", apiRouter)

// Global Error Handler Middleware
app.use(errorHandler)

export default app
