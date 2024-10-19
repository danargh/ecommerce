import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('/health-check')
@Controller('/health-check')
export class AppController {
   @Get()
   @HttpCode(HttpStatus.OK)
   healthCheck(): void {}
}
