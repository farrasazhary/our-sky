import multer from "multer"
import path from "path"
import fs from "fs"
import { AppError } from "../shared/errors/AppError"
import { Request, Response, NextFunction } from "express"

const storagePath = process.env.STORAGE_PATH || "./storage"

// Ensure storage directory exists
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname).toLowerCase() || ".webp"
    cb(null, `photo-${uniqueSuffix}${ext}`)
  }
})

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (allowedTypes.includes(file.mimetype) || file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new AppError("Only image files (JPG, PNG, WEBP, GIF) are allowed.", 400))
  }
}

const multerAny = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
}).any()

export const uploadSingle = (req: Request, res: Response, next: NextFunction) => {
  multerAny(req, res, (err: any) => {
    if (err) return next(err)
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      req.file = req.files[0]
    }
    next()
  })
}
