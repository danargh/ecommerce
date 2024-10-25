import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   HttpCode,
   HttpStatus,
   Inject,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@ApiTags('/categories')
@Controller('categories')
export class CategoryController {
   constructor(
      private readonly categoryService: CategoryService,
      @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
   ) {}

   // Create a new category
   @HttpCode(HttpStatus.CREATED)
   @Post()
   async create(@Body() createCategoryDto: CreateCategoryDto) {
      this.logger.debug(
         `Category created: ${JSON.stringify(createCategoryDto)}`,
      );
      const category = await this.categoryService.create(createCategoryDto);

      return {
         message: 'Category created successfully',
         data: category,
      };
   }

   // Get all categories
   @HttpCode(HttpStatus.OK)
   @Get()
   async findAll() {
      this.logger.debug('Retrieved all categories');
      const categories = await this.categoryService.findAll();

      return {
         message: 'All categories retrieved successfully',
         data: categories,
      };
   }

   // Get a single category by ID
   @HttpCode(HttpStatus.OK)
   @Get(':id')
   async findOne(@Param('id') id: string) {
      const category = await this.categoryService.findOne(+id);
      this.logger.debug(`Retrieved category with ID: ${id}`);

      return {
         message: 'Category retrieved successfully',
         data: category,
      };
   }

   // Update a category by ID
   @HttpCode(HttpStatus.OK)
   @Patch(':id')
   async update(
      @Param('id') id: string,
      @Body() updateCategoryDto: UpdateCategoryDto,
   ) {
      const updatedCategory = await this.categoryService.update(
         +id,
         updateCategoryDto,
      );
      this.logger.debug(`Updated category with ID: ${id}`);

      return {
         message: 'Category updated successfully',
         data: updatedCategory,
      };
   }

   // Delete a category by ID
   @HttpCode(HttpStatus.OK)
   @Delete(':id')
   async remove(@Param('id') id: string) {
      const removedCategory = await this.categoryService.remove(+id);
      this.logger.debug(`Deleted category with ID: ${id}`);

      return {
         message: 'Category deleted successfully',
         data: removedCategory,
      };
   }
}
