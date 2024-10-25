/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Import the zodResolver function from the correct path
import { RegisterSchema } from "@/lib/validation";
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
import { useState, useTransition } from "react";
import { useRegister } from "@/api/auth";
import { useRouter } from "next/navigation";
import { RegisterRequest } from "@/interfaces";
import { LogoIcon } from "@/assets/icons";

export default function page() {
   const {
      data: successResponse,
      mutate: mutateRegister,
      status: useRegisterStatus,
      isPending,
      error: errorReponse,
   } = useRegister();
   const [isTransition, setTransition] = useTransition();
   const router = useRouter();

   useEffect(() => {
      // if (useRegisterStatus === "success") {
      //    router.push("/login");
      // }
   }, [router, useRegisterStatus]);

   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
      setTransition(() => {
         mutateRegister({
            name: data.name,
            email: data.email,
            password: data.password,
         } as RegisterRequest);
         console.log(data);
      });
      form.reset();
   };

   return (
      <div className="flex justify-center mx-auto h-screen items-center">
         <Form {...form}>
            <form
               className="bg-secondary div__center--vertically max-w-[400px] h-fit p-6 rounded-lg shadow-md w-full"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <Link className="flex justify-center" href={"/"}>
                  <LogoIcon />
               </Link>
               <h2 className="flex justify-center text-2xl font-bold mb-4">
                  Register
               </h2>
               <div className="flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 placeholder="john_doe"
                                 type="text"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
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
                              <Input {...field} type="password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="confirmPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Confirm Password</FormLabel>
                           <FormControl>
                              <Input {...field} type="password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               {errorReponse && (
                  <FormAlert type="error">{errorReponse.message}</FormAlert>
               )}
               {successResponse && (
                  <FormAlert type="success">
                     {successResponse.message}
                  </FormAlert>
               )}
               <Button
                  type="submit"
                  variant="default"
                  className="w-full mt-4 mb-2"
               >
                  Submit
               </Button>
               <p className="text-sm flex justify-center"> - or - </p>
               <Link href="/login">
                  <Button
                     variant="outline"
                     className="flex justify-center mt-2 w-full text-primary"
                  >
                     Login
                  </Button>
               </Link>
            </form>
         </Form>
      </div>
   );
}
