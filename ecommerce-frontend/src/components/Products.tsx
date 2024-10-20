import React from "react";

export function Products() {
   return (
      <section id="products" className="container py-24 sm:py-32 space-y-8">
         <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
            Products{" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
               List
            </span>
         </h2>
      </section>
   );
}
