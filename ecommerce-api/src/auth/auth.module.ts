import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/common/db/prisma.service';
import { PrismaAuthRepository } from 'src/common/db/prisma-auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/external/jwt.strategy';

@Module({
   imports: [
      UsersModule,
      // PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
         secret: process.env.JWT_SECRET_KEY,
         signOptions: {
            expiresIn: process.env.EXPIRES_IN,
         },
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, PrismaService, PrismaAuthRepository, JwtStrategy],
})
export class AuthModule {}
