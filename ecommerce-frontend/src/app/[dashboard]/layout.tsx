import type { Metadata } from "next";
import "@/app/globals.css";
import { Search } from "@/components/Search";
import { Profile } from "@/components/Profile";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import { validateToken } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const { success } = await validateToken({
      success: false,
      error: false,
   });
   // if (!success === true) {
   //    redirect("/login");
   // }
   return (
      <section className="flex-col md:flex">
         <div className="border-b">
            <div className="flex h-16 items-center px-4">
               {/* <TeamSwitcher /> */}
               <DashboardNavbar className="mx-6" />
               <div className="ml-auto flex items-center space-x-4">
                  <Search />
                  <Profile />
               </div>
            </div>
         </div>

         {children}
      </section>
   );
}
