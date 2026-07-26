import { Response } from "express"
import { AuthRequest } from "../../middleware/authenticate"
import { RelationshipService } from "./relationship.service"
import { acceptInvitationSchema } from "./relationship.validator"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { AppError } from "../../shared/errors/AppError"
import sharp from "sharp"
import path from "path"
import fs from "fs"
import { z } from "zod"

const updateStartedAtSchema = z.object({
  startedAt: z.string().min(1, "Date is required")
})

const storagePath = process.env.STORAGE_PATH || "./storage"

export class RelationshipController {
  static getMe = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    const data = await RelationshipService.getCurrentRelationship(userId)
    return ApiResponse.success(res, "Relationship status retrieved.", data)
  }

  static invite = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    const invitation = await RelationshipService.createInvitation(userId)
    return ApiResponse.created(res, "Invitation created successfully.", invitation)
  }

  static accept = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    const validated = acceptInvitationSchema.parse(req.body)
    const result = await RelationshipService.acceptInvitation(userId, validated.invitationCode)
    return ApiResponse.success(res, "Connected with partner successfully! 🎉", result)
  }

  static updateStartedAt = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    const validated = updateStartedAtSchema.parse(req.body)
    const result = await RelationshipService.updateStartedAt(userId, validated.startedAt)
    return ApiResponse.success(res, "Connection date updated successfully.", result)
  }

  static updateCover = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId
    if (!req.file) {
      throw new AppError("Cover photo file is required.", 400)
    }

    const filename = `cover-${userId}-${Date.now()}.webp`
    const compressedPath = path.join(storagePath, filename)

    // Backend Image Compression for Banner Cover (max 1200x500, webp 80%)
    await sharp(req.file.path)
      .resize(1200, 500, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(compressedPath)

    if (fs.existsSync(req.file.path) && req.file.path !== compressedPath) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (e) {
        // ignore error
      }
    }

    const coverImageUrl = `/uploads/${filename}`
    const result = await RelationshipService.updateCoverImage(userId, coverImageUrl)
    return ApiResponse.success(res, "Relationship cover photo updated successfully.", result)
  }
}
