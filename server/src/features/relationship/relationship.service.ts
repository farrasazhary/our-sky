import { RelationshipRepository } from "./relationship.repository"
import { AppError } from "../../shared/errors/AppError"
import { prisma } from "../../config/database"
import { NotificationService } from "../notification/notification.route"

export class RelationshipService {
  static async getCurrentRelationship(userIdStr: string) {
    const userId = BigInt(userIdStr)
    const relationship = await RelationshipRepository.findActiveRelationship(userId)

    if (!relationship) {
      return {
        isConnected: false,
        relationship: null
      }
    }

    const partner = relationship.userOneId === userId ? relationship.userTwo : relationship.userOne
    const currentUser = relationship.userOneId === userId ? relationship.userOne : relationship.userTwo

    return {
      isConnected: true,
      relationship: {
        id: relationship.id.toString(),
        startedAt: relationship.startedAt,
        coverImage: relationship.coverImage,
        status: relationship.status,
        user: {
          id: currentUser.id.toString(),
          fullName: currentUser.fullName,
          email: currentUser.email,
          profilePicture: currentUser.profilePicture
        },
        partner: {
          id: partner.id.toString(),
          fullName: partner.fullName,
          email: partner.email,
          profilePicture: partner.profilePicture
        }
      }
    }
  }

  static async updateStartedAt(userIdStr: string, newDateStr: string) {
    const userId = BigInt(userIdStr)
    const activeRel = await RelationshipRepository.findActiveRelationship(userId)

    if (!activeRel) {
      throw new AppError("Active relationship not found.", 404)
    }

    const newDate = new Date(newDateStr)
    if (isNaN(newDate.getTime())) {
      throw new AppError("Invalid date provided.", 400)
    }

    const updated = await prisma.relationship.update({
      where: { id: activeRel.id },
      data: { startedAt: newDate }
    })

    return {
      id: updated.id.toString(),
      startedAt: updated.startedAt
    }
  }

  static async updateCoverImage(userIdStr: string, coverImageUrl: string) {
    const userId = BigInt(userIdStr)
    const activeRel = await RelationshipRepository.findActiveRelationship(userId)

    if (!activeRel) {
      throw new AppError("Active relationship not found.", 404)
    }

    const updated = await prisma.relationship.update({
      where: { id: activeRel.id },
      data: { coverImage: coverImageUrl }
    })

    return {
      id: updated.id.toString(),
      coverImage: updated.coverImage
    }
  }

  static async createInvitation(userIdStr: string) {
    const userId = BigInt(userIdStr)
    
    // Check if user is already in a relationship
    const activeRel = await RelationshipRepository.findActiveRelationship(userId)
    if (activeRel) {
      throw new AppError("You are already connected in an active relationship.", 400)
    }

    // Reuse existing pending invitation if available
    const existing = await RelationshipRepository.findPendingInvitationBySender(userId)
    if (existing) {
      return {
        invitationCode: existing.invitationCode,
        expiresAt: existing.expiresAt
      }
    }

    // Generate unique 6-character code e.g. SKY-88A9F2
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase()
    const invitationCode = `SKY-${randomSuffix}`
    
    // Set 48 hours expiration
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 48)

    const invitation = await RelationshipRepository.createInvitation(userId, invitationCode, expiresAt)

    return {
      invitationCode: invitation.invitationCode,
      expiresAt: invitation.expiresAt
    }
  }

  static async acceptInvitation(userIdStr: string, invitationCode: string) {
    const receiverId = BigInt(userIdStr)

    // Check if receiver is already in a relationship
    const activeRel = await RelationshipRepository.findActiveRelationship(receiverId)
    if (activeRel) {
      throw new AppError("You are already connected in an active relationship.", 400)
    }

    // Find invitation
    const invitation = await RelationshipRepository.findInvitationByCode(invitationCode)
    if (!invitation || invitation.status !== "PENDING") {
      throw new AppError("Invalid or inactive invitation code.", 404)
    }

    // Cannot accept own invitation
    if (invitation.senderId === receiverId) {
      throw new AppError("You cannot accept your own invitation code.", 400)
    }

    // Check expiration
    if (invitation.expiresAt && new Date() > invitation.expiresAt) {
      throw new AppError("This invitation code has expired. Please ask for a new code.", 400)
    }

    // Create relationship
    const [updatedInvite, newRelationship] = await RelationshipRepository.createRelationshipAndAcceptInvitation(
      invitation.id,
      invitation.senderId,
      receiverId
    )

    // Dispatch notification to partner that invite was accepted
    await NotificationService.notifyPartner(
      newRelationship.id,
      receiverId,
      "Partner Connected 🎉",
      "Congratulations! Your partner has accepted your invite code. Your space is now active!",
      "RELATIONSHIP"
    )

    const partner = invitation.sender

    return {
      relationshipId: newRelationship.id.toString(),
      partner: {
        id: partner.id.toString(),
        fullName: partner.fullName,
        email: partner.email
      }
    }
  }
}
