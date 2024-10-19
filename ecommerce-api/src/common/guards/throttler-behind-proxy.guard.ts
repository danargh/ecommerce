import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
   protected async getTracker(req: Record<string, any>): Promise<string> {
      // req.ips if using proxy (nginx) else, using req.ip
      return req.ips.length ? req.ips[0] : req.ip;
   }
}
