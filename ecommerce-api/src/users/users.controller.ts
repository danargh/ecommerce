import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/index.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('/users')
@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @Get()
   // @UseGuards(RolesGuard)
   // @Roles('USER')
   findAll() {
      return this.usersService.findAll();
   }

   @Get(':email')
   findOne(@Param('email') email: string) {
      return this.usersService.findOne({ email: email });
   }

   @Patch(':id')
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(+id, updateUserDto);
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
   }
}
