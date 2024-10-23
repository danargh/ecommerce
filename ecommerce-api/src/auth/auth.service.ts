import { hashingPassword, JwtPayload } from 'src/common/utils/index.utils';
import {
   BadRequestException,
   HttpException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { PrismaAuthRepository } from 'src/common/db/prisma-auth.repository';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
   constructor(
      private readonly prismaAuthRepository: PrismaAuthRepository,
      private readonly jwtService: JwtService,
      private readonly usersService: UsersService,
   ) {}

   async register(data: CreateUserDto): Promise<UserEntity> {
      // validate user existance
      const existsUser = await this.usersService.findOne({
         email: data.email,
      });
      if (existsUser) {
         throw new BadRequestException('User already exists.');
      }

      data.password = await hashingPassword(data.password);

      return await this.prismaAuthRepository.create(data);
   }

   async login(data: LoginAuthDto): Promise<string> {
      const user = await this.prismaAuthRepository.findUserByEmail(data.email);
      const isValid = await this.prismaAuthRepository.validateUserPassword(
         user,
         data.password,
      );
      if (!isValid || !user) {
         throw new UnauthorizedException('Username or password invalid.');
      }

      const payload: JwtPayload = {
         id: user.id,
         email: user.email,
         name: user.name,
         role: user.role,
      };

      return await this.jwtService.signAsync(payload);
   }

   // Validate token function
   async validateToken(token: string): Promise<JwtPayload> {
      try {
         // Verify token using JwtService
         const decoded = await this.jwtService.verifyAsync<JwtPayload>(token, {
            secret: process.env.JWT_SECRET_KEY, // Pastikan menggunakan secret key yang benar
         });

         // Check if the user exists in the database
         const user = await this.prismaAuthRepository.findUserByEmail(
            decoded.email,
         );
         if (!user) {
            throw new UnauthorizedException('User does not exist');
         }

         // Return the decoded payload if the token is valid
         return decoded;
      } catch (error) {
         throw new UnauthorizedException('Invalid token');
      }
   }
}
