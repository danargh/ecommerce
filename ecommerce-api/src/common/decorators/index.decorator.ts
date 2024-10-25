import { HttpException, SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// roles
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// user decorator
export const Auth = createParamDecorator(
   (data: unknown, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (user) {
         return user;
      } else {
         throw new HttpException('Unauthorized', 401);
      }
   },
);
