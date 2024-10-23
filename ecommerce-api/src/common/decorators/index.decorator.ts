import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// roles
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// user decorator
export const Usr = createParamDecorator(
   (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
   },
);
