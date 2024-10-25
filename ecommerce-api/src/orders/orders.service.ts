import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaOrderRepository } from 'src/common/db/prisma-order-repository';
import { OrderEntity } from './entities/order.entity'; // Pastikan Anda telah membuat OrderEntity
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
   constructor(private readonly orderRepository: PrismaOrderRepository) {}

   async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
      return this.orderRepository.create(createOrderDto);
   }

   async findAll() {
      return this.orderRepository.findAll();
   }

   async findOne(filter: number) {
      return this.orderRepository.findOne(filter);
   }

   async update(id: number, orderDto: UpdateOrderDto) {
      return this.orderRepository.update(id, orderDto);
   }

   async remove(id: number) {
      return this.orderRepository.remove(id);
   }
}
