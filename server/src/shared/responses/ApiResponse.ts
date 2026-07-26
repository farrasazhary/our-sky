import { Response } from "express"

export class ApiResponse {
  static success<T>(res: Response, message: string = "Success", data?: T, statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data: data ?? null
    })
  }

  static created<T>(res: Response, message: string = "Resource created successfully", data?: T) {
    return this.success(res, message, data, 201)
  }

  static error(res: Response, message: string = "An error occurred", statusCode: number = 400, errors: any = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors })
    })
  }
}
