export class CategoryEntity {
   id: number;
   name: string;
   description?: string;

   constructor(partial: Partial<CategoryEntity>) {
      Object.assign(this, partial);
   }
}
