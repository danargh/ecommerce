import {
   ArgumentsHost,
   Catch,
   ExceptionFilter,
   HttpException,
   HttpStatus,
   UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
   catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status =
         exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
         error: exception.name,
         statusCode: status,
         message: exception.message || 'Internal server error',
         timestamp: new Date().toISOString(),
         path: request.url,
      });
   }
}
