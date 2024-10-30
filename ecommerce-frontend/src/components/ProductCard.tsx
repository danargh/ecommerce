import * as React from "react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Checkout } from "./Checkout";
import { ProductResponse } from "../interfaces/index";
import { Badge } from "./ui/badge";

interface Props {
   item: ProductResponse;
}

export function ProductCard({ item }: Props) {
   return (
      <Card className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
         <CardHeader className="p-5 border-b border-gray-200 bg-gray-50">
            <CardTitle className="text-xl font-semibold text-gray-800">
               {item.name}
            </CardTitle>
            <div className="flex justify-between items-center">
               <Badge>{item.categoryId.name}</Badge>

               <p className="text-gray-700">{item.createdById.name}</p>
            </div>
         </CardHeader>
         <CardContent className="p-5">
            <img
               src="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/nationalgeographic/201101101438380_b.jpg"
               alt={item.name}
               width={400}
               height={300}
               className="rounded-md shadow-sm object-cover w-full h-48 mb-4"
            />
            <div className="space-y-2">
               <CardDescription className=" text-gray-600">
                  {item.description}
               </CardDescription>
               <h4 className="text-xl font-bold text-gray-700">
                  Rp.{item.price}
               </h4>
               <p className="text-gray-700">
                  <span className="font-semibold">Stock: </span>
                  {item.stock}
               </p>
            </div>
         </CardContent>
         <CardFooter className="p-5 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <Button variant="outline" className="text-sm px-4 py-2">
               Detail
            </Button>
            <Checkout />
         </CardFooter>
      </Card>
   );
}
