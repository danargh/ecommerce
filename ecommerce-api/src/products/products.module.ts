import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/common/db/prisma.service';
import { PrismaProductRepository } from 'src/common/db/prisma-product.repository';

@Module({
   controllers: [ProductsController],
   providers: [ProductsService, PrismaService, PrismaProductRepository],
})
export class ProductsModule {}
