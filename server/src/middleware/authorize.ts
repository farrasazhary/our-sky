import { Response, NextFunction } from "express"
import { AuthRequest } from "./authenticate"
import { prisma } from "../config/database"
import { AppError } from "../shared/errors/AppError"

export interface RelationshipRequest extends AuthRequest {
  relationshipId?: bigint
  partnerId?: bigint
}

export async function authorizeRelationship(req: RelationshipRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AppError("Authentication required.", 401)
    }

    const userId = BigInt(req.user.userId)

    // Find active relationship where user is either UserOne or UserTwo
    const relationship = await prisma.relationship.findFirst({
      where: {
        status: "ACTIVE",
        OR: [
          { userOneId: userId },
          { userTwoId: userId }
        ]
      }
    })

    if (!relationship) {
      throw new AppError("You are not connected in an active relationship yet.", 403)
    }

    req.relationshipId = relationship.id
    req.partnerId = relationship.userOneId === userId ? relationship.userTwoId : relationship.userOneId

    next()
  } catch (err) {
    next(err)
  }
}
