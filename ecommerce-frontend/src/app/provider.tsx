"use client";

import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  refetchOnWindowFocus: false,
                  refetchOnReconnect: false,
                  retry: false,
                  // With SSR, we usually want to set some default staleTime
                  // above 0 to avoid refetching immediately on the client
                  // staleTime: 60 * 1000,
               },
            },
         })
   );

   return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   );
}
