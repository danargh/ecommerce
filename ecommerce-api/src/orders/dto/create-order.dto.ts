import {
   IsNotEmpty,
   IsInt,
   IsNumber,
   IsOptional,
   IsEnum,
} from 'class-validator';
import { OrderStatus } from '@prisma/client'; // Import OrderStatus enum dari Prisma

export class CreateOrderDto {
   @IsNotEmpty()
   @IsInt()
   quantity: number;

   @IsNotEmpty()
   @IsNumber()
   totalPrice: number;

   @IsOptional() // Status bisa di-set oleh sistem
   @IsEnum(OrderStatus) // Validasi agar status sesuai dengan enum
   status?: OrderStatus;

   @IsNotEmpty()
   @IsInt()
   userId: number;

   @IsNotEmpty()
   @IsInt()
   productId: number;
}
