/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Import the zodResolver function from the correct path
import { LoginSchema } from "@/lib/validation";
import * as z from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/form-alert";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useLogin, useValidateToken } from "@/api/auth";
import { useRouter } from "next/navigation";
import { LogoIcon } from "@/assets/icons";
import { useUserSlice } from "@/global/store";
import Cookies from "universal-cookie";

export default function page() {
   const setUser = useUserSlice((state) => state.setUser);
   const [isTransition, setTransition] = useTransition();
   const {
      data: successResponse,
      status: useLoginStatus,
      isPending,
      error: errorReponse,
      mutateAsync: mutateAsyncLogin,
   } = useLogin();
   const {
      data: successResponseValidate,
      status: useValidateStatus,
      error: errorReponseValidate,
   } = useValidateToken();
   const router = useRouter();

   useEffect(() => {
      const cookies = new Cookies();
      if (useLoginStatus === "success") {
         if (successResponse.data.role === "ADMIN") {
            router.push("/dashboard");
         } else {
            router.push("/");
         }
      }
      if (useValidateStatus === "success" && cookies.get("token")) {
         if (successResponseValidate.data.role === "ADMIN") {
            router.push("/dashboard");
         } else {
            router.push("/");
         }
      }
   }, [
      router,
      useLoginStatus,
      useValidateStatus,
      successResponse?.data.role,
      successResponseValidate?.data.role,
   ]);

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (data: z.infer<typeof LoginSchema>) => {
      // event.preventDefault();

      setTransition(() => {
         mutateAsyncLogin(data, {
            onSuccess: (data) => {
               setUser({
                  role: data.data.role,
                  email: data.data.email,
                  name: data.data.name,
                  id: data.data.id,
               });
            },
         });
      });
      form.reset();
   };

   // if (useValidateTokenStatus === "pending") {
   //    return <p>Loading...</p>;
   // }

   return (
      <div className="flex justify-center items-center mx-auto h-screen">
         <Form {...form}>
            <form
               className="bg-secondary div__center--vertically max-w-[400px] h-fit p-6 rounded-lg shadow-md w-full"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <Link className="flex justify-center" href={"/"}>
                  <LogoIcon />
               </Link>
               <h2 className="flex justify-center text-2xl font-bold mb-4">
                  Login
               </h2>
               <div className="flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="johndoe@gmail.com"
                                 type="email"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="johndoe@gmail.com"
                                 type="password"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               {errorReponse && (
                  <FormAlert type="error">{errorReponse?.message}</FormAlert>
               )}

               <Button
                  type="submit"
                  variant="default"
                  className="w-full mt-4 mb-2"
                  disabled={isTransition}
               >
                  {isPending ? "Loading..." : "Submit"}
               </Button>
               <p className="text-sm flex justify-center"> - or - </p>
               <Link href="/register">
                  <Button
                     variant="outline"
                     className="flex justify-center mt-2 w-full text-primary"
                  >
                     Register
                  </Button>
               </Link>
            </form>
         </Form>
      </div>
   );
}
