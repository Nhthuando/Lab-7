import type { Response } from 'express';
import { AppError } from '../utils/errors.js';

export abstract class BaseController {
  protected handleSuccess<T>(
    res: Response,
    data: T,
    statusCode: number = 200,
    message?: string
  ): void {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  protected handleError(
    error: unknown,
    res: Response,
    action: string = 'Operation'
  ): void {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
        details: error.details,
      });
      return;
    }

    console.error(`[BaseController] Error during ${action}:`, error);

    // Prisma specific error check (e.g. database connection or unique constraint)
    const err = error as { code?: string; message?: string };
    if (err.code === 'P2002') {
      res.status(409).json({
        success: false,
        error: 'Dữ liệu đã tồn tại trong hệ thống (vi phạm unique constraint).',
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau.',
    });
  }
}

