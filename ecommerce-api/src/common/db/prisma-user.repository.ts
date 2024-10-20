import { PrismaService } from './prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class PrismaUserRepository {
   constructor(private prisma: PrismaService) {}

   async create(data: CreateUserDto): Promise<UserEntity> {
      // Create a new user entity with Prisma
      const user = await this.prisma.user.create({
         data,
      });
      return new UserEntity(user);
   }

   async findAll(filter?: Prisma.UserWhereInput): Promise<UserEntity[]> {
      const users = await this.prisma.user.findMany({
         where: filter,
      });
      return users.map((user) => new UserEntity(user));
   }

   async findOne(
      filter: Prisma.UserWhereUniqueInput,
   ): Promise<UserEntity | null> {
      // Use findUnique to find a single user by unique fields
      const user = await this.prisma.user.findUnique({
         where: filter,
      });
      return user ? new UserEntity(user) : null;
   }

   async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
      // Update a user by ID
      const user = await this.prisma.user.update({
         where: { id },
         data,
      });
      return new UserEntity(user);
   }

   async remove(id: number): Promise<void> {
      // Delete a user by ID
      await this.prisma.user.delete({
         where: { id },
      });
   }
}
