import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
   Inject,
   HttpStatus,
   HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/index.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@ApiTags('/users')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
   constructor(
      private readonly usersService: UsersService,
      @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
   ) {}

   @HttpCode(HttpStatus.OK)
   @Get()
   @Roles('ADMIN')
   async findAll(): Promise<any> {
      const users = await this.usersService.findAll();

      return {
         messsage: 'Get all users.',
         data: users,
      };
   }

   @HttpCode(HttpStatus.OK)
   @Get(':email')
   @Roles('USER', 'ADMIN')
   async findOne(@Param('email') email: string): Promise<any> {
      this.logger.debug(`Register new user ${JSON.stringify(email)}`);

      const user = await this.usersService.findOne({ email: email });
      return {
         message: 'Success',
         data: user,
      };
   }

   @HttpCode(HttpStatus.OK)
   @Roles('ADMIN', 'USER')
   @Patch(':id')
   async update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
   ): Promise<any> {
      const updatedUser = await this.usersService.update(+id, updateUserDto);

      return {
         message: 'User updated.',
         data: updatedUser,
      };
   }

   @HttpCode(HttpStatus.OK)
   @Roles('ADMIN', 'USER')
   @Delete(':id')
   async remove(@Param('id') id: string): Promise<any> {
      const removedUser = await this.usersService.remove(+id);

      return {
         message: 'User removed.',
         data: removedUser,
      };
   }
}
