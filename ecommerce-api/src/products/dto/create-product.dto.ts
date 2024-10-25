import {
   IsNotEmpty,
   IsString,
   IsNumber,
   IsOptional,
   IsInt,
} from 'class-validator';

export class CreateProductDto {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsNotEmpty()
   @IsString()
   description: string;

   @IsNotEmpty()
   @IsNumber()
   price: number;

   @IsNotEmpty()
   @IsInt()
   stock: number;

   @IsNotEmpty()
   @IsInt()
   createdById: number;

   @IsOptional() // Karena kategori bisa null
   @IsInt()
   categoryId?: number;
}
