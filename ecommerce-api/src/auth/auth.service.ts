import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PrismaAuthRepository } from 'src/common/db/prisma-auth.repository';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { JwtPayload } from 'src/common/utils/jwt-payload';

@Injectable()
export class AuthService {
   constructor(
      private readonly prismaAuthRepository: PrismaAuthRepository,
      private readonly jwtService: JwtService,
   ) {}

   async register(data: CreateUserDto): Promise<UserEntity> {
      return await this.prismaAuthRepository.create(data);
   }

   async login(data: LoginAuthDto): Promise<string> {
      const user = await this.prismaAuthRepository.findUserByEmail(data.email);
      const isValid = await this.prismaAuthRepository.validateUserPassword(
         data,
         user.password,
      );
      if (!isValid || !user) {
         throw new UnauthorizedException();
      }

      const payload: JwtPayload = {
         id: user.id,
         email: user.email,
         name: user.name,
      };

      return this.jwtService.signAsync(payload);
   }
}
