import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ErrorsInterceptor } from 'src/core/interceptors/exception.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

@Module({
   providers: [
      { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
      { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
      { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
   ],
})
export class CoreModule {}
