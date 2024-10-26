import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
   id: number;
   email: string;
   name: string;

   @Exclude() // Exclude password from being exposed in the response
   password: string;

   role: Role;

   createdAt: Date;
   updatedAt: Date;

   sessions?: string[];
   orders?: string[];
   products?: string[];
   token?: string;

   constructor(partial: Partial<UserEntity>) {
      Object.assign(this, partial);
   }
}
