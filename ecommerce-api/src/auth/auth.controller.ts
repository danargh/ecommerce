import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth-dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('register')
   async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
      return this.authService.register(createUserDto);
   }

   @Post('login')
   async login(@Body() loginDto: LoginAuthDto): Promise<any> {
      const token = await this.authService.login(loginDto);
      return {
         token: token,
         ...loginDto,
      };
   }
}
