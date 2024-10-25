import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/index.decorator';

@ApiTags('/products')
@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
   constructor(private readonly productsService: ProductsService) {}

   @Post()
   @Roles('ADMIN')
   async create(@Body() createProductDto: CreateProductDto): Promise<any> {
      const createdProduct =
         await this.productsService.create(createProductDto);

      return {
         message: 'Product created.',
         data: createdProduct,
      };
   }

   @Get()
   async findAll() {
      const products = await this.productsService.findAll();

      return {
         message: 'Get all products.',
         data: products,
      };
   }

   @Get(':id')
   async findOne(@Param('id') id: string) {
      const data = await this.productsService.findOne({ id: +id });
      return {
         message: 'Get product success.',
         data: data,
      };
   }

   @Patch(':id')
   @Roles('ADMIN')
   async update(
      @Param('id') id: string,
      @Body() updateProductDto: UpdateProductDto,
   ) {
      const data = await this.productsService.update(+id, updateProductDto);
      return {
         message: 'Product updated.',
         data: data,
      };
   }

   @Delete(':id')
   @Roles('ADMIN')
   async remove(@Param('id') id: string) {
      const data = await this.productsService.remove(+id);
      return {
         message: 'Product removed.',
         data: data,
      };
   }
}
