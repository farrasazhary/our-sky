import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AuthRepository } from "./auth.repository"
import { AppError } from "../../shared/errors/AppError"

export class AuthService {
  static async register(data: { fullName: string; email: string; password: string }) {
    const existingUser = await AuthRepository.findByEmail(data.email)
    if (existingUser) {
      throw new AppError("An account with this email already exists.", 409)
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await AuthRepository.createUser({
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword
    })

    return {
      userId: user.id.toString(),
      fullName: user.fullName,
      email: user.email
    }
  }

  static async login(data: { email: string; password: string }) {
    const user = await AuthRepository.findByEmail(data.email)
    if (!user) {
      throw new AppError("Invalid email or password.", 401)
    }

    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new AppError("Invalid email or password.", 401)
    }

    const secret = process.env.JWT_SECRET || "oursky_super_secret_jwt_key_2026"
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d"

    const token = jwt.sign(
      {
        userId: user.id.toString(),
        email: user.email,
        fullName: user.fullName
      },
      secret,
      { expiresIn: "7d" }
    )

    return {
      token,
      user: {
        id: user.id.toString(),
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture
      }
    }
  }
}
