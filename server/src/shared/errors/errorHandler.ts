import { Request, Response, NextFunction } from "express"
import { AppError } from "./AppError"
import { ApiResponse } from "../responses/ApiResponse"
import { ZodError } from "zod"

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const errMsg = err?.message || (typeof err === "string" ? err : "Unknown Error")
  console.error("❌ Error caught by global handler:", errMsg)

  if (err instanceof AppError) {
    return ApiResponse.error(res, err.message, err.statusCode, err.errors)
  }

  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map(e => ({
      field: e.path.join("."),
      message: e.message
    }))
    return ApiResponse.error(res, "Validation Error: " + formattedErrors.map(f => `${f.field}: ${f.message}`).join(", "), 400, formattedErrors)
  }

  // Handle Prisma Known Request Errors
  if (err?.code === "P2002") {
    return ApiResponse.error(res, "A record with this information already exists.", 409)
  }

  if (err?.code === "P2025") {
    return ApiResponse.error(res, "Record not found.", 404)
  }

  return ApiResponse.error(
    res, 
    process.env.NODE_ENV === "production" ? "Internal Server Error" : errMsg || "Internal Server Error", 
    500
  )
}
