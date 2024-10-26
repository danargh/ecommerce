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

interface Props {
   item: ProductResponse;
}

export function ProductCard({ item }: Props) {
   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
         </CardHeader>
         <CardContent>
            <img src="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/nationalgeographic/201101101438380_b.jpg" />
            <p>{item.categoryId.name}</p>
            <p>{item.price}</p>
            <p>{item.stock}</p>
            <p>{item.createdById.name}</p>
         </CardContent>
         <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            {/* <Button>Deploy</Button> */}
            <Checkout />
         </CardFooter>
      </Card>
   );
}
