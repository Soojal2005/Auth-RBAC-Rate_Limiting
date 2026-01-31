export class AppError extends Error {
    statusCode: number;
    code: string;

    constructor(
        message: string,
        statusCode: number = 500,
        code: string = "INTERNAL_SERVER_ERROR"
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
    }
}
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Too many requests") {
    super(message, 429, "RATE_LIMIT_EXCEEDED");
  }
}
