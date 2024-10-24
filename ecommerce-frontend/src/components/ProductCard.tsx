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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Checkout } from "./Checkout";

export function ProductCard() {
   return (
      <Card className="max-w-[350px]">
         <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
               Deploy your new project in one-click.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <img src="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/nationalgeographic/201101101438380_b.jpg" />
         </CardContent>
         <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            {/* <Button>Deploy</Button> */}
            <Checkout />
         </CardFooter>
      </Card>
   );
}
