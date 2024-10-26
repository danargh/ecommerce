"use client";

import { useEffect, useState } from "react";
import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "@/assets/icons";
import Link from "next/link";
import { Profile } from "./Profile";
import { useUIStateSlice } from "@/global/store";
import { Checkout } from "./Checkout";

interface RouteProps {
   href: string;
   label: string;
}
interface Props {
   isAuthenticated: boolean;
}

const routeList: RouteProps[] = [
   {
      href: "#home",
      label: "Home",
   },
   {
      href: "#products",
      label: "Products",
   },
   {
      href: "#promo",
      label: "Promo",
   },
   {
      href: "#contact",
      label: "Contact Us",
   },
];

export const Navbar = ({ isAuthenticated }: Props) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const setIsAuth = useUIStateSlice((state) => state.setIsAuth);
   const isAuth = useUIStateSlice((state) => state.isAuth);

   useEffect(() => {
      setIsAuth(isAuthenticated);
   }, [setIsAuth]);

   console.log(isAuthenticated);

   return (
      <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
         <NavigationMenu className="mx-auto">
            <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
               <NavigationMenuItem className="font-bold flex">
                  <a
                     rel="noreferrer noopener"
                     href="/"
                     className="ml-2 font-bold text-xl flex items-center gap-x-2"
                  >
                     <LogoIcon />
                     Ecommerce
                  </a>
               </NavigationMenuItem>

               {/* mobile */}
               <span className="flex md:hidden">
                  {/* <ModeToggle /> */}

                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                     <SheetTrigger className="px-2">
                        <Menu
                           className="flex md:hidden h-5 w-5"
                           onClick={() => setIsOpen(true)}
                        >
                           {/* <span className="sr-only">Menu Icon</span> */}
                        </Menu>
                     </SheetTrigger>

                     <SheetContent side={"left"}>
                        <SheetHeader>
                           <SheetTitle className="font-bold text-xl">
                              Shadcn/React
                           </SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                           {routeList.map(({ href, label }: RouteProps) => (
                              <a
                                 rel="noreferrer noopener"
                                 key={label}
                                 href={href}
                                 onClick={() => setIsOpen(false)}
                                 className={buttonVariants({
                                    variant: "ghost",
                                 })}
                              >
                                 {label}
                              </a>
                           ))}
                           {isAuth ? (
                              <>
                                 <Checkout />
                                 <Profile />
                              </>
                           ) : (
                              <>
                                 <Link
                                    rel="noreferrer noopener"
                                    href="/register"
                                    className={`w-[110px] border ${buttonVariants(
                                       {
                                          variant: "secondary",
                                       }
                                    )}`}
                                 >
                                    Login
                                 </Link>
                                 <Link
                                    rel="noreferrer noopener"
                                    href="/register"
                                    className={`border ${buttonVariants({
                                       variant: "default",
                                    })}`}
                                 >
                                    Register
                                 </Link>
                              </>
                           )}
                        </nav>
                     </SheetContent>
                  </Sheet>
               </span>

               {/* desktop */}
               <nav className="hidden md:flex gap-2">
                  {routeList.map((route: RouteProps, i) => (
                     <a
                        rel="noreferrer noopener"
                        href={route.href}
                        key={i}
                        className={`text-[17px] ${buttonVariants({
                           variant: "ghost",
                        })}`}
                     >
                        {route.label}
                     </a>
                  ))}
               </nav>

               <div className="hidden md:flex gap-2">
                  {isAuth ? (
                     <>
                        <Checkout />
                        <Profile />
                     </>
                  ) : (
                     <>
                        <Link
                           rel="noreferrer noopener"
                           href="/login"
                           className={`border ${buttonVariants({
                              variant: "secondary",
                           })}`}
                        >
                           Login
                        </Link>
                        <Link
                           rel="noreferrer noopener"
                           href="/register"
                           className={`border ${buttonVariants({
                              variant: "default",
                           })}`}
                        >
                           Register
                        </Link>
                     </>
                  )}

                  {/* <ModeToggle /> */}
               </div>
            </NavigationMenuList>
         </NavigationMenu>
      </header>
   );
};
