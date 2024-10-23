import {
   MiddlewareConsumer,
   Module,
   NestModule,
   RequestMethod,
} from '@nestjs/common';
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
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ErrorsInterceptor } from './common/interceptors/exception.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ProductsModule } from './products/products.module';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
   imports: [
      WinstonModule.forRoot({
         level: 'debug',
         format: winston.format.combine(
            winston.format.colorize(), // Memberikan warna untuk level log
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Menambahkan timestamp
            winston.format.printf(({ timestamp, level, message, context }) => {
               // Pastikan jika message atau context adalah objek, ubah ke format JSON
               const formattedMessage =
                  typeof message === 'object'
                     ? JSON.stringify(message, null, 2)
                     : message;
               const formattedContext = context
                  ? typeof context === 'object'
                     ? JSON.stringify(context, null, 2)
                     : context
                  : '';

               return `${timestamp} [${level}]${formattedContext ? ` [${formattedContext}]` : ''}: ${formattedMessage}`;
            }),
         ),
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
      JwtModule.register({
         secret: process.env.JWT_SECRET_KEY,
         signOptions: {
            expiresIn: process.env.EXPIRES_IN,
         },
      }),

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
      // {
      //    provide: APP_GUARD,
      //    useClass: AuthGuard,
      // },
      // { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
      { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
      { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
   ],
})
export class AppModule {
   configure(consumer: MiddlewareConsumer) {
      consumer
         .apply(AuthMiddleware) // Apply the AuthMiddleware
         .forRoutes(
            { path: 'users', method: RequestMethod.ALL },
            { path: 'products', method: RequestMethod.ALL },
         ); // For all routes
   }
}
