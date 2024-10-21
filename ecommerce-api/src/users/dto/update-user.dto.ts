import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../auth/dto/create-auth.dto';
import { IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
   @IsOptional()
   @IsString()
   role?: Role;
}
