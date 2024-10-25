import { Injectable } from '@nestjs/common';
import { PrismaCategoryRepository } from '../common/db/prisma-category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
   constructor(private readonly categoryRepository: PrismaCategoryRepository) {}

   // Create a new category
   async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
      const category = await this.categoryRepository.create(createCategoryDto);
      return new CategoryEntity(category);
   }

   // Find all categories
   async findAll(): Promise<CategoryEntity[]> {
      const categories = await this.categoryRepository.findAll();
      return categories.map((category) => new CategoryEntity(category));
   }

   // Find one category by ID
   async findOne(id: number): Promise<CategoryEntity | null> {
      const category = await this.categoryRepository.findOne({ id });
      return category ? new CategoryEntity(category) : null;
   }

   // Update a category by ID
   async update(
      id: number,
      updateCategoryDto: UpdateCategoryDto,
   ): Promise<CategoryEntity> {
      const updatedCategory = await this.categoryRepository.update(
         id,
         updateCategoryDto,
      );
      return new CategoryEntity(updatedCategory);
   }

   // Delete a category by ID
   async remove(id: number): Promise<CategoryEntity> {
      const removedCategory = await this.categoryRepository.remove(id);
      return new CategoryEntity(removedCategory);
   }
}
