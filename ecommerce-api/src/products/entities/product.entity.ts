import { User } from '@prisma/client'; // Import User Entity
import { Category } from '@prisma/client'; // Import Category Entity
import { UserEntity } from 'src/users/entities/user.entity';

export class ProductEntity {
   id: number;
   name: string;
   description: string;
   price: number;
   stock: number;
   createdAt: Date;
   updatedAt: Date;
   createdById: UserEntity; // Relasi dengan User Entity
   categoryId: Category; // Relasi dengan Category Entity (nullable)

   constructor(partial: Partial<ProductEntity>) {
      Object.assign(this, partial);
   }
}
