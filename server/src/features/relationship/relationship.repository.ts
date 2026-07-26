import { prisma } from "../../config/database"

export class RelationshipRepository {
  static async findActiveRelationship(userId: bigint) {
    return prisma.relationship.findFirst({
      where: {
        status: "ACTIVE",
        OR: [
          { userOneId: userId },
          { userTwoId: userId }
        ]
      },
      include: {
        userOne: { select: { id: true, fullName: true, email: true, profilePicture: true } },
        userTwo: { select: { id: true, fullName: true, email: true, profilePicture: true } }
      }
    })
  }

  static async findPendingInvitationBySender(senderId: bigint) {
    return prisma.invitation.findFirst({
      where: {
        senderId,
        status: "PENDING"
      }
    })
  }

  static async createInvitation(senderId: bigint, invitationCode: string, expiresAt: Date) {
    return prisma.invitation.create({
      data: {
        senderId,
        invitationCode,
        expiresAt,
        status: "PENDING"
      }
    })
  }

  static async findInvitationByCode(invitationCode: string) {
    return prisma.invitation.findUnique({
      where: { invitationCode },
      include: { sender: true }
    })
  }

  static async createRelationshipAndAcceptInvitation(invitationId: bigint, userOneId: bigint, userTwoId: bigint) {
    return prisma.$transaction([
      prisma.invitation.update({
        where: { id: invitationId },
        data: { status: "ACCEPTED", receiverId: userTwoId }
      }),
      prisma.relationship.create({
        data: {
          userOneId,
          userTwoId,
          status: "ACTIVE",
          startedAt: new Date()
        },
        include: {
          userOne: { select: { id: true, fullName: true, email: true } },
          userTwo: { select: { id: true, fullName: true, email: true } }
        }
      })
    ])
  }
}
