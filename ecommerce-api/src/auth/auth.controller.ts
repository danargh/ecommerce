import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   Inject,
   HttpException,
   HttpCode,
   HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth-dto';
import { ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UsersService } from '../users/users.service';

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
      private readonly usersService: UsersService,
   ) {}

   @HttpCode(HttpStatus.CREATED)
   @Post('register')
   async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
      this.logger.debug(`Register new user ${JSON.stringify(createUserDto)}`);

      return this.authService.register(createUserDto);
   }

   @HttpCode(HttpStatus.OK)
   @Post('login')
   async login(@Body() loginDto: LoginAuthDto): Promise<any> {
      const token = await this.authService.login(loginDto);
      const user = await this.usersService.findOne({ email: loginDto.email });
      return {
         token: token,
         user,
      };
   }
}
