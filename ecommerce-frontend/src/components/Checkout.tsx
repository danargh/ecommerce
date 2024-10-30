import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket } from "lucide-react";

export function Checkout() {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button variant="outline" className="border-0  shadow-none">
               <ShoppingBasket size={48} />
            </Button>
         </SheetTrigger>
         <SheetContent>
            <SheetHeader>
               <SheetTitle>Keranjang Belanja</SheetTitle>
               <SheetDescription>
                  Periksa kembali produk yang akan dibeli
               </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4"></div>
               <div className="grid grid-cols-4 items-center gap-4"></div>
            </div>
            <SheetFooter>
               <SheetClose asChild>
                  <Button type="submit">Pembayaran</Button>
               </SheetClose>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   );
}
