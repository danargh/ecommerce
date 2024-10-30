"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import usePathname
import { cn } from "@/lib/utils";
import { useValidateToken } from "@/api/auth";
import { useEffect } from "react";

export function DashboardNavbar({
   className,
   ...props
}: React.HTMLAttributes<HTMLElement>) {
   const {
      data: successResponseValidate,
      status: useValidateStatus,
      error: errorReponseValidate,
   } = useValidateToken();
   const router = useRouter();

   useEffect(() => {
      if (useValidateStatus === "error") {
         router.push("/login");
      }
   }, [router, useValidateStatus]);

   const pathname = usePathname(); // Get the current path

   // if (useValidateStatus === "pending") {
   //    return (
   //       <div className="absolute bg-white w-screen h-screen flex justify-center items-center">
   //          <h1 className="text-4xl">LOADING...</h1>
   //       </div>
   //    );
   // }

   return (
      <nav
         className={cn("flex items-center space-x-4 lg:space-x-6", className)}
         {...props}
      >
         <Link
            href="/dashboard"
            className={cn(
               "text-sm font-medium transition-colors hover:text-primary",
               pathname === "/dashboard" ? "underline" : "text-muted-foreground"
            )}
         >
            Overview
         </Link>
         <Link
            href="/dashboard/customers"
            className={cn(
               "text-sm font-medium transition-colors hover:text-primary",
               pathname === "/dashboard/customers"
                  ? "underline"
                  : "text-muted-foreground"
            )}
         >
            Pelanggan
         </Link>
         <Link
            href="/dashboard/products"
            className={cn(
               "text-sm font-medium transition-colors hover:text-primary",
               pathname === "/dashboard/products"
                  ? "underline"
                  : "text-muted-foreground"
            )}
         >
            Produk
         </Link>
         <Link
            href="/dashboard/orders"
            className={cn(
               "text-sm font-medium transition-colors hover:text-primary",
               pathname === "/dashboard/orders"
                  ? "underline"
                  : "text-muted-foreground"
            )}
         >
            Pesanan
         </Link>
      </nav>
   );
}
