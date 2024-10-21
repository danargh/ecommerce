import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

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
      CoreModule,
      UsersModule,
   ],
   controllers: [AppController],
   providers: [
      {
         provide: APP_GUARD,
         useClass: ThrottlerBehindProxyGuard,
      },
   ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
   }
}
