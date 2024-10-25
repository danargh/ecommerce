import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/index.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
   constructor(private reflector: Reflector) {}

   canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
         ROLES_KEY,
         [context.getHandler(), context.getClass()],
      );
      console.log('Required role : ', requiredRoles);
      if (!requiredRoles) {
         return true;
      }
      const { user } = context.switchToHttp().getRequest();
      console.log('Role guard data : ', user);
      return requiredRoles.some((role) => user.role?.includes(role));
   }
}
