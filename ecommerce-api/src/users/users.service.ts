import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaUserRepository } from '../common/db/prisma-user.repository';
import { UserEntity } from './entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
   constructor(private readonly userRepository: PrismaUserRepository) {}

   async create(createUserDto: CreateUserDto): Promise<UserEntity> {
      return this.userRepository.create(createUserDto);
   }

   async findAll() {
      return this.userRepository.findAll();
   }

   async findOne(filter: Prisma.UserWhereUniqueInput) {
      return this.userRepository.findOne(filter);
   }

   async update(id: number, userDto: UpdateUserDto) {
      return this.userRepository.update(id, userDto);
   }

   async remove(id: number) {
      return this.userRepository.remove(id);
   }
}
