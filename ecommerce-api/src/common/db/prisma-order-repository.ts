import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class PrismaOrderRepository {
   constructor(private readonly prisma: PrismaService) {}

   async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
      const orderData = await this.prisma.order.create({
         data: {
            quantity: createOrderDto.quantity,
            totalPrice: createOrderDto.totalPrice,
            status: createOrderDto.status || undefined,
            user: {
               connect: { id: createOrderDto.userId },
            },
            product: {
               connect: { id: createOrderDto.productId },
            },
         },
         include: {
            user: true,
            product: true,
         },
      });

      return new OrderEntity({
         id: orderData.id,
         quantity: orderData.quantity,
         totalPrice: orderData.totalPrice,
         status: orderData.status,
         createdAt: orderData.createdAt,
         updatedAt: orderData.updatedAt,
         userId: new UserEntity(orderData.user),
         productId: orderData.product,
      });
   }

   // Find all orders
   async findAll(): Promise<OrderEntity[]> {
      const orders = await this.prisma.order.findMany({
         include: {
            user: true,
            product: true,
         },
      });

      return orders.map(
         (order) =>
            new OrderEntity({
               id: order.id,
               quantity: order.quantity,
               totalPrice: order.totalPrice,
               status: order.status,
               createdAt: order.createdAt,
               updatedAt: order.updatedAt,
               userId: new UserEntity(order.user),
               productId: order.product,
            }),
      );
   }

   // Find a specific order by id
   async findOne(id: number): Promise<OrderEntity | null> {
      const order = await this.prisma.order.findUnique({
         where: { id },
         include: {
            user: true,
            product: true,
         },
      });

      if (!order) return null;

      return new OrderEntity({
         id: order.id,
         quantity: order.quantity,
         totalPrice: order.totalPrice,
         status: order.status,
         createdAt: order.createdAt,
         updatedAt: order.updatedAt,
         userId: new UserEntity(order.user),
         productId: order.product,
      });
   }

   // Update an order
   async update(
      id: number,
      updateData: Partial<CreateOrderDto>,
   ): Promise<OrderEntity> {
      const orderData = await this.prisma.order.update({
         where: { id },
         data: {
            quantity: updateData.quantity,
            totalPrice: updateData.totalPrice,
            status: updateData.status,
         },
         include: {
            user: true,
            product: true,
         },
      });

      return new OrderEntity({
         id: orderData.id,
         quantity: orderData.quantity,
         totalPrice: orderData.totalPrice,
         status: orderData.status,
         createdAt: orderData.createdAt,
         updatedAt: orderData.updatedAt,
         userId: new UserEntity(orderData.user),
         productId: orderData.product,
      });
   }

   // Delete an order
   async remove(id: number): Promise<OrderEntity> {
      const orderData = await this.prisma.order.delete({
         where: { id },
         include: {
            user: true,
            product: true,
         },
      });

      return new OrderEntity({
         id: orderData.id,
         quantity: orderData.quantity,
         totalPrice: orderData.totalPrice,
         status: orderData.status,
         createdAt: orderData.createdAt,
         updatedAt: orderData.updatedAt,
         userId: new UserEntity(orderData.user),
         productId: orderData.product,
      });
   }
}
