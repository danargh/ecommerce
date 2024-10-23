import {
   Injectable,
   NestInterceptor,
   ExecutionContext,
   CallHandler,
   BadGatewayException,
   Logger,
   HttpException,
   HttpStatus,
   UnauthorizedException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
   private readonly logger = new Logger(ErrorsInterceptor.name); // Logging instance

   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
         catchError((err) => {
            // Log the error
            this.logger.error('An error occurred', err.message);

            // Custom error handling based on error type
            if (err instanceof HttpException) {
               // If it's an HttpException, re-throw it with its original message
               return throwError(() => err);
            }

            // Example: Prisma Client Error Handling
            if (err.code === 'P2002') {
               // Handle Prisma unique constraint violation (code: P2002)
               return throwError(
                  () =>
                     new HttpException(
                        'Unique constraint violation: the data already exists',
                        HttpStatus.CONFLICT,
                     ),
               );
            }

            // You can handle other custom errors here...

            // If it's a generic error, return a BadGatewayException
            return throwError(
               () => new BadGatewayException('An unexpected error occurred'),
            );
         }),
      );
   }
}
