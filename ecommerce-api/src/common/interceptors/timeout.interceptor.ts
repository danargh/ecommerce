import {
   CallHandler,
   ExecutionContext,
   Injectable,
   NestInterceptor,
   Logger,
   HttpException,
   HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
   private readonly logger = new Logger(TimeoutInterceptor.name);
   private readonly timeoutDuration = 5000; // Durasi timeout dalam milidetik

   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
         timeout(this.timeoutDuration),
         catchError((err) => {
            if (err.name === 'TimeoutError') {
               // Log timeout error
               this.logger.warn(
                  `Request timed out after ${this.timeoutDuration}ms`,
               );
               // Mengembalikan response error yang sesuai
               return throwError(
                  () =>
                     new HttpException(
                        'Request timed out. Please try again later.',
                        HttpStatus.REQUEST_TIMEOUT,
                     ),
               );
            }
            // Jika bukan error timeout, lempar error lain
            return throwError(() => err);
         }),
      );
   }
}
