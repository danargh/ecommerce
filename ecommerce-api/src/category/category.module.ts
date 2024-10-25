import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/common/db/prisma.service';
import { PrismaCategoryRepository } from 'src/common/db/prisma-category.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
   imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
   controllers: [CategoryController],
   providers: [CategoryService, PrismaService, PrismaCategoryRepository],
})
export class CategoryModule {}
