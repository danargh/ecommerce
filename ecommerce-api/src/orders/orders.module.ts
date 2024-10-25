import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/common/db/prisma.service';
import { PrismaOrderRepository } from 'src/common/db/prisma-order-repository';

@Module({
   controllers: [OrdersController],
   providers: [OrdersService, PrismaService, PrismaOrderRepository],
})
export class OrdersModule {}
