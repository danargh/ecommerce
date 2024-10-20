import Image from "next/image";
import { Button } from "./ui/button";

export const Hero = () => {
   return (
      <section className="container mx-auto grid lg:grid-cols-2 place-items-center px-4 py-20 md:py-32 gap-10">
         <div className="text-center lg:text-start space-y-6">
            <main className="text-5xl md:text-6xl font-bold">
               <h1 className="inline">
                  <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                     Belanja mudah, cepat, dan aman
                  </span>{" "}
                  di
               </h1>{" "}
               Platform{" "}
               <h2 className="inline">
                  <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                     Ecommerce
                  </span>{" "}
                  terbaik
               </h2>
            </main>

            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
               Dapatkan penawaran eksklusif dan produk berkualitas dari kategori
               fashion, elektronik, kecantikan, dan banyak lagi. Pengiriman
               cepat dan layanan pelanggan 24/7 siap membantu Anda kapan saja.
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
               <Button className="w-full md:w-1/3">
                  Mulai belanja sekarang.
               </Button>
            </div>
         </div>

         {/* Hero cards sections */}
         <div className="z-10">
            <Image
               src="/images/hero.png"
               width={500}
               height={500}
               alt="hero image"
            />
         </div>

         {/* Shadow effect */}
         <div className="shadow"></div>
      </section>
   );
};
