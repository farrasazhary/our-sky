import { Request, Response } from "express"
import { AuthService } from "./auth.service"
import { registerSchema, loginSchema } from "./auth.validator"
import { ApiResponse } from "../../shared/responses/ApiResponse"

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const validated = registerSchema.parse(req.body)
    const user = await AuthService.register(validated)
    return ApiResponse.created(res, "Account created successfully.", user)
  }

  static login = async (req: Request, res: Response) => {
    const validated = loginSchema.parse(req.body)
    const result = await AuthService.login(validated)

    // Set HTTP-only cookie for token
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return ApiResponse.success(res, "Login successful.", result)
  }

  static logout = async (req: Request, res: Response) => {
    res.clearCookie("token")
    return ApiResponse.success(res, "Logged out successfully.")
  }
}
