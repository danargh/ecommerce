import {
   CallHandler,
   ExecutionContext,
   Injectable,
   NestInterceptor,
   Logger,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
   private readonly logger = new Logger(LoggingInterceptor.name);

   intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
   ): Observable<any> | Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const { method, url } = request;

      console.log('Before...');

      const now = Date.now();

      return next.handle().pipe(
         tap(() => {
            const response = context.switchToHttp().getResponse();
            const { statusCode } = response;
            console.log(
               `Response: ${method} ${url} - ${statusCode} [${Date.now() - now}ms]`,
            );
         }),
         catchError((error) => {
            // Log the error
            console.error(
               `Error on Request: ${method} ${url} - ${error.message}`,
            );
            // Re-throw the error so that it can be handled by other interceptors or filters
            throw error;
         }),
      );
   }
}
