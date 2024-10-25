import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Prisma } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PrismaProductRepository {
   constructor(private readonly prisma: PrismaService) {}

   // Create product
   async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
      const productData = await this.prisma.product.create({
         data: {
            name: createProductDto.name,
            description: createProductDto.description,
            price: createProductDto.price,
            stock: createProductDto.stock,
            createdBy: {
               connect: { id: createProductDto.createdById },
            },
            category: {
               connect: { id: createProductDto.categoryId },
            },
         },
         include: {
            createdBy: true,
            category: true,
         },
      });

      return new ProductEntity({
         id: productData.id,
         name: productData.name,
         description: productData.description,
         price: productData.price,
         stock: productData.stock,
         createdAt: productData.createdAt,
         updatedAt: productData.updatedAt,
         createdById: new UserEntity(productData.createdBy),
         categoryId: productData.category,
      });
   }

   // Find all products
   async findAll(): Promise<ProductEntity[]> {
      const products = await this.prisma.product.findMany({
         include: {
            category: true,
            createdBy: true,
         },
      });

      return products.map(
         (product) =>
            new ProductEntity({
               id: product.id,
               name: product.name,
               description: product.description,
               price: product.price,
               stock: product.stock,
               createdAt: product.createdAt,
               updatedAt: product.updatedAt,
               createdById: new UserEntity(product.createdBy),
               categoryId: product.category,
            }),
      );
   }

   // Find a product by id
   async findOne(
      filter: Prisma.ProductWhereUniqueInput,
   ): Promise<ProductEntity> {
      const product = await this.prisma.product.findUnique({
         where: filter,
         include: {
            category: true,
            createdBy: true,
         },
      });

      if (!product) {
         throw new BadRequestException(`Product with ${filter} not found`);
      }

      return new ProductEntity({
         id: product.id,
         name: product.name,
         description: product.description,
         price: product.price,
         stock: product.stock,
         createdAt: product.createdAt,
         updatedAt: product.updatedAt,
         createdById: new UserEntity(product.createdBy),
         categoryId: product.category,
      });
   }

   // Update a product
   async update(
      id: number,
      updateProductDto: UpdateProductDto,
   ): Promise<ProductEntity> {
      const productData = await this.prisma.product.update({
         where: { id },
         data: {
            name: updateProductDto.name,
            description: updateProductDto.description,
            price: updateProductDto.price,
            stock: updateProductDto.stock,
            categoryId: updateProductDto.categoryId,
         },
         include: {
            category: true,
            createdBy: true,
         },
      });

      return new ProductEntity({
         id: productData.id,
         name: productData.name,
         description: productData.description,
         price: productData.price,
         stock: productData.stock,
         createdAt: productData.createdAt,
         updatedAt: productData.updatedAt,
         createdById: new UserEntity(productData.createdBy),
         categoryId: productData.category,
      });
   }

   // Delete a product
   async remove(id: number): Promise<ProductEntity> {
      const productData = await this.prisma.product.delete({
         where: { id },
         include: {
            category: true,
            createdBy: true,
         },
      });

      return new ProductEntity({
         id: productData.id,
         name: productData.name,
         description: productData.description,
         price: productData.price,
         stock: productData.stock,
         createdAt: productData.createdAt,
         updatedAt: productData.updatedAt,
         createdById: new UserEntity(productData.createdBy),
         categoryId: productData.category,
      });
   }
}
