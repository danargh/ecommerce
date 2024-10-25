import {
   Injectable,
   NestMiddleware,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
   constructor(private jwtService: JwtService) {}

   async use(req: Request, res: Response, next: NextFunction) {
      console.log('auth middleware');
      const token = this.extractTokenFromHeader(req);
      if (!token) {
         throw new UnauthorizedException('Token is missing');
      }

      try {
         const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET_KEY,
         });
         // Assign payload to request object so it can be accessed in route handlers
         req['user'] = payload;
         console.log('auth middleware', payload); // You can log the payload if needed
         next(); // Continue to the next middleware or route handler
      } catch (err) {
         throw new UnauthorizedException('Invalid token');
      }
   }

   private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
   }
}
