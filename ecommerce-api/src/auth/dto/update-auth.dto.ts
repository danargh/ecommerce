import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateUserDto) {}
