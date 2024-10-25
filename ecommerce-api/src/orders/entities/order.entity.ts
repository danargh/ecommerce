import { OrderStatus, Product, User } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

export class OrderEntity {
   id: number;
   quantity: number;
   totalPrice: number;
   status: OrderStatus;
   createdAt: Date;
   updatedAt: Date;
   userId: UserEntity; // ID dari pengguna yang membuat order
   productId: Product; // ID produk yang dipesan

   constructor(partial: Partial<OrderEntity>) {
      Object.assign(this, partial);
   }
}
