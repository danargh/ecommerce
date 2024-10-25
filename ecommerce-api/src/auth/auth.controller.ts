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
   Req,
   UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

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
   async register(@Body() createUserDto: CreateUserDto): Promise<any> {
      this.logger.debug(`Register new user ${JSON.stringify(createUserDto)}`);

      const createdUser = await this.authService.register(createUserDto);

      return {
         message: 'Register successfull.',
         data: new UserEntity(createdUser),
      };
   }

   @HttpCode(HttpStatus.OK)
   @Post('login')
   async login(@Body() loginDto: LoginAuthDto): Promise<any> {
      this.logger.debug(`Login user ${JSON.stringify(loginDto)}`);
      const token = await this.authService.login(loginDto);
      const user = await this.usersService.findOne({ email: loginDto.email });
      user.token = token;

      return {
         message: 'Login successfull.',
         data: user,
      };
   }

   // Validate token endpoint
   @HttpCode(HttpStatus.OK)
   @Get('validate')
   async validateToken(@Req() req: Request): Promise<any> {
      this.logger.debug(`Token ${JSON.stringify(req)}`);

      const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
      if (!token) {
         throw new UnauthorizedException('Token not provided');
      }

      const payload = await this.authService.validateToken(token); // Validasi token dengan authService
      if (!payload) {
         throw new UnauthorizedException('Invalid token');
      }
      return {
         message: 'Token is valid.',
         data: payload,
      };
   }
}
