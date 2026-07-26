import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { AppError } from "../shared/errors/AppError"

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    fullName: string
  }
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    let token: string | undefined

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]
    } else if (req.cookies?.token) {
      token = req.cookies.token
    }

    if (!token) {
      throw new AppError("Authentication required. Please login.", 401)
    }

    const secret = process.env.JWT_SECRET || "oursky_super_secret_jwt_key_2026"
    const decoded = jwt.verify(token, secret) as any

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      fullName: decoded.fullName
    }

    next()
  } catch (err: any) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      next(new AppError("Invalid or expired token. Please login again.", 401))
    } else {
      next(err)
    }
  }
}
