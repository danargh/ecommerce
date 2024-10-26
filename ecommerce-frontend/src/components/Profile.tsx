"use client";

import Cookies from "universal-cookie";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { UserSlice, useUIStateSlice, useUserSlice } from "@/global/store";
import { useStore } from "zustand";

export function Profile() {
   const user = useUserSlice((state) => state.user);
   const setIsAuth = useUIStateSlice((state) => state.setIsAuth);
   const router = useRouter();
   const cookies = new Cookies();

   const logout = () => {
      cookies.remove("token");
      window.localStorage.clear();
      setIsAuth(false);

      router.push("/login");
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
               <Avatar className="h-8 w-8">
                  <AvatarFallback>SC</AvatarFallback>
               </Avatar>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                     {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                     {user?.email}
                  </p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>Profile</DropdownMenuItem>
               <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
