import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaProductRepository } from '../common/db/prisma-product.repository';
import { ProductEntity } from './entities/product.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
   constructor(private readonly productRepository: PrismaProductRepository) {}

   async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
      return await this.productRepository.create(createProductDto);
   }

   async findAll(): Promise<ProductEntity[]> {
      return await this.productRepository.findAll();
   }

   async findOne(
      filter: Prisma.ProductWhereUniqueInput,
   ): Promise<ProductEntity> {
      return await this.productRepository.findOne(filter);
   }

   async update(
      id: number,
      updateProductDto: UpdateProductDto,
   ): Promise<ProductEntity> {
      return await this.productRepository.update(id, updateProductDto);
   }

   async remove(id: number): Promise<ProductEntity> {
      return await this.productRepository.remove(id);
   }
}
