import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
   providers: [
      { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
   ],
})
export class CoreModule {}
