import { PrismaService } from './prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from 'src/auth/dto/login-auth-dto';

@Injectable()
export class PrismaAuthRepository {
   constructor(private readonly prisma: PrismaService) {}

   async create(data: CreateUserDto): Promise<UserEntity> {
      // bcrypt
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create a new user entity with Prisma
      const user = await this.prisma.user.create({
         data,
      });
      return new UserEntity(user);
   }

   async findUserByEmail(email: string): Promise<UserEntity> {
      return this.prisma.user.findUnique({
         where: { email },
      });
   }

   async validateUserPassword(
      user: LoginAuthDto,
      password: string,
   ): Promise<boolean> {
      return bcrypt.compare(password, user.password);
   }
}
