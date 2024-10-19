import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: '.env.development.local',
         isGlobal: true,
      }),
      ThrottlerModule.forRoot([
         {
            ttl: 60000,
            limit: 10,
         },
      ]),
   ],
   controllers: [AppController],
   providers: [
      {
         provide: APP_GUARD,
         useClass: ThrottlerBehindProxyGuard,
      },
   ],
})
export class AppModule {}
