export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Email này đã tồn tại trong hệ thống') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

