import React from "react";
import { ProductCard } from "./ProductCard";

export function Products() {
   return (
      <section
         id="products"
         className="container mx-auto py-24 sm:py-32 space-y-8"
      >
         <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
            Products{" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
               List
            </span>
         </h2>
         <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {Array(10)
               .fill(null)
               .map((_, index) => (
                  <ProductCard key={index} />
               ))}
         </div>
      </section>
   );
}
