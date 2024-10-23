import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/common/db/prisma.service';
import { PrismaUserRepository } from 'src/common/db/prisma-user.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
   imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
   controllers: [UsersController],
   providers: [UsersService, PrismaService, PrismaUserRepository],
   exports: [UsersService],
})
export class UsersModule {}
