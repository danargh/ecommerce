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
   ForbiddenException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto'; // Pastikan Anda telah membuat DTO untuk update
import { ApiTags } from '@nestjs/swagger';
import { Auth, Roles } from 'src/common/decorators/index.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { User } from '@prisma/client';

@ApiTags('/orders')
@Controller('orders')
@UseGuards(RolesGuard)
export class OrdersController {
   constructor(
      private readonly ordersService: OrdersService,
      @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
   ) {}

   @HttpCode(HttpStatus.OK)
   @Get()
   @Roles('ADMIN', 'USER')
   async findAll(): Promise<any> {
      const orders = await this.ordersService.findAll();

      return {
         message: 'Get all orders.',
         data: orders,
      };
   }

   @HttpCode(HttpStatus.OK)
   @Get(':id')
   @Roles('ADMIN', 'USER')
   async findOne(@Param('id') id: string): Promise<any> {
      this.logger.debug(`Fetching order with ID ${id}`);

      const order = await this.ordersService.findOne(+id);
      return {
         message: 'Success',
         data: order,
      };
   }

   @HttpCode(HttpStatus.CREATED)
   @Post()
   // @Usr(user)
   @Roles('USER')
   async create(
      @Auth() user: User,
      @Body() createOrderDto: CreateOrderDto,
   ): Promise<any> {
      if (user.id !== createOrderDto.userId) {
         throw new ForbiddenException();
      }
      const newOrder = await this.ordersService.create(createOrderDto);

      return {
         message: 'Order created successfully.',
         data: newOrder,
      };
   }

   @HttpCode(HttpStatus.OK)
   @Patch(':id')
   @Roles('ADMIN', 'USER')
   async update(
      @Auth() user: User,
      @Param('id') id: string,
      @Body() updateOrderDto: UpdateOrderDto, // Pastikan DTO ini sudah ada
   ): Promise<any> {
      if (user.role === 'USER') {
         if (user.id !== updateOrderDto.userId) {
            throw new ForbiddenException();
         }
      }
      const updatedOrder = await this.ordersService.update(+id, updateOrderDto);

      return {
         message: 'Order updated.',
         data: updatedOrder,
      };
   }

   @HttpCode(HttpStatus.OK)
   @Delete(':id')
   @Roles('USER')
   async remove(@Auth() user: User, @Param('id') id: number): Promise<any> {
      const removedOrder = await this.ordersService.remove(+id);

      return {
         message: 'Order removed.',
         data: removedOrder,
      };
   }
}
