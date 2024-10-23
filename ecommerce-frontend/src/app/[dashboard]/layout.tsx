import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
   title: "The Founders Wedding Invitation",
   description: "Platform Undangan Nomor 1 di Indonesia",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="flex flex-col bg-primary-25">
         <main className="w-full sm:flex">{children}</main>
      </div>
   );
}
