import { prisma } from "../../config/database"

export class AuthRepository {
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    })
  }

  static async findById(id: bigint) {
    return prisma.user.findUnique({
      where: { id }
    })
  }

  static async createUser(data: { fullName: string; email: string; password: string }) {
    return prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password
      }
    })
  }
}
