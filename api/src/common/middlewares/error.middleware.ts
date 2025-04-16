import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private handleError(error: any, res: Response) {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno no servidor';
    let errorDetails = {};

    if (error instanceof HttpException) {
      statusCode = error.getStatus();
      message = error.message || message;
      errorDetails = error.getResponse();
    }

    res.status(statusCode).json({
      message,
      status_code: statusCode,
      data: [errorDetails],
    });
  }
}
