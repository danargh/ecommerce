import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaUserRepository } from '../common/db/prisma-user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
   constructor(private readonly userRepository: PrismaUserRepository) {}

   async create(createUserDto: CreateUserDto): Promise<UserEntity> {
      return this.userRepository.create(createUserDto);
   }

   findAll() {
      return this.userRepository.findAll();
   }

   findOne(id: number) {
      return `This action returns a #${id} user`;
   }

   update(id: number, updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
   }

   remove(id: number) {
      return `This action removes a #${id} user`;
   }
}
