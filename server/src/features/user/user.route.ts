import { Router, Response } from "express"
import { authenticate, AuthRequest } from "../../middleware/authenticate"
import { uploadSingle } from "../../middleware/upload"
import { prisma } from "../../config/database"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import sharp from "sharp"
import path from "path"
import fs from "fs"
import { z } from "zod"

const updateProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100),
  profilePicture: z.string().optional()
})

const storagePath = process.env.STORAGE_PATH || "./storage"

const router = Router()

router.use(authenticate)

router.put("/profile", uploadSingle, asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = BigInt(req.user!.userId)
  const validated = updateProfileSchema.parse(req.body)
  
  const updateData: any = {
    fullName: validated.fullName
  }

  if (req.file) {
    const filename = `avatar-${userId}-${Date.now()}.webp`
    const compressedPath = path.join(storagePath, filename)

    // Backend Image Compression using Sharp: max 400x400, webp 80% quality
    await sharp(req.file.path)
      .resize(400, 400, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(compressedPath)

    // Remove raw uncompressed upload file
    if (fs.existsSync(req.file.path) && req.file.path !== compressedPath) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (e) {
        // ignore error
      }
    }

    updateData.profilePicture = `/uploads/${filename}`
  } else if (validated.profilePicture !== undefined && validated.profilePicture.trim() !== "") {
    updateData.profilePicture = validated.profilePicture
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: updateData
  })

  return ApiResponse.success(res, "Profile updated successfully.", {
    id: updated.id.toString(),
    fullName: updated.fullName,
    email: updated.email,
    profilePicture: updated.profilePicture
  })
}))

export { router as userRoutes }
