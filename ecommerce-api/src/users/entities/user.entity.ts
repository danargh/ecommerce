import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
   id: number;
   email: string;
   name: string;

   @Exclude() // Exclude password from being exposed in the response
   password: string;

   @Exclude()
   role: Role;

   createdAt: Date;
   updatedAt: Date;

   @Expose({ groups: ['admin'] }) // Optional, only expose to specific roles
   sessions?: string[];

   @Expose({ groups: ['admin'] })
   orders?: string[];

   @Expose({ groups: ['admin', 'user'] })
   products?: string[];

   @Expose()
   token?: string;

   constructor(partial: Partial<UserEntity>) {
      Object.assign(this, partial);
   }
}
