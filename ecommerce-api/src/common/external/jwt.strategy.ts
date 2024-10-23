import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../utils/index.utils';
import { UserEntity } from 'src/users/entities/user.entity';
import { PrismaAuthRepository } from '../db/prisma-auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private readonly prismaAuthRepository: PrismaAuthRepository) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: process.env.JWT_SECRET_KEY,
      });
   }

   async validate(payload: JwtPayload): Promise<UserEntity> {
      const user = await this.prismaAuthRepository.findUserByEmail(
         payload.email,
      );
      if (!user) {
         throw new UnauthorizedException();
      }

      return user;
   }
}
