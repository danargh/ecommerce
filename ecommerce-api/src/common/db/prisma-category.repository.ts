import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class PrismaCategoryRepository {
   constructor(private readonly prisma: PrismaService) {}

   async create(data: CreateCategoryDto): Promise<CategoryEntity> {
      const category = await this.prisma.category.create({
         data,
      });
      return new CategoryEntity(category);
   }

   async findAll(
      filter?: Prisma.CategoryWhereInput,
   ): Promise<CategoryEntity[]> {
      const categories = await this.prisma.category.findMany({
         where: filter,
      });
      return categories.map((category) => new CategoryEntity(category));
   }

   async findOne(
      filter: Prisma.CategoryWhereUniqueInput,
   ): Promise<CategoryEntity | null> {
      const category = await this.prisma.category.findUnique({
         where: filter,
      });
      return category ? new CategoryEntity(category) : null;
   }

   async update(id: number, data: UpdateCategoryDto): Promise<CategoryEntity> {
      const category = await this.prisma.category.update({
         where: { id },
         data,
      });
      return new CategoryEntity(category);
   }

   async remove(id: number): Promise<CategoryEntity> {
      const category = await this.prisma.category.delete({
         where: { id },
      });
      return new CategoryEntity(category);
   }
}
