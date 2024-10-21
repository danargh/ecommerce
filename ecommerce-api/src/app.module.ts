import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { UsersModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ErrorsInterceptor } from './common/interceptors/exception.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ProductsModule } from './products/products.module';

@Module({
   imports: [
      WinstonModule.forRoot({
         level: 'debug',
         format: winston.format.json(),
         transports: [new winston.transports.Console()],
      }),
      ConfigModule.forRoot({
         envFilePath: '.env',
         isGlobal: true,
      }),
      ThrottlerModule.forRoot([
         {
            ttl: 60000,
            limit: 10,
         },
      ]),

      UsersModule,
      AuthModule,
      ProductsModule,
   ],
   controllers: [AppController],
   providers: [
      {
         provide: APP_GUARD,
         useClass: ThrottlerBehindProxyGuard,
      },
      { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
      { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
      { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
   ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
   }
}
