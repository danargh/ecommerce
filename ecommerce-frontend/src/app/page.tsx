import { validateToken } from "@/actions/auth";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Products } from "@/components/Products";
import { redirect } from "next/navigation";

export default async function Home() {
   const { success } = await validateToken({ success: false, error: false });

   return (
      <>
         <Navbar isAuthenticated={success} />
         <Hero />
         <Products />
         <Footer />
      </>
   );
}
