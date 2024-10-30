"use client";

import React from "react";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CopyIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./ui/form";
import { FormAlert } from "./form-alert";
import { RegisterSchema } from "@/lib/validation";

type Props = {};

export default function DialogProfile({}: Props) {
   // 1. Define your form.
   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
   });

   // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof RegisterSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <p className="relative flex cursor-default hover:bg-secondary select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors ">
               Profile
            </p>
         </DialogTrigger>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>Share link</DialogTitle>
               <DialogDescription>
                  Anyone who has this link will be able to view this.
               </DialogDescription>
            </DialogHeader>
            <DialogContent>
               <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                           <h2 className="flex justify-center text-2xl font-bold mb-4">
                              Profile
                           </h2>
                           <div className="flex flex-col gap-y-4">
                              <FormField
                                 control={form.control}
                                 name="name"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Name</FormLabel>
                                       <FormControl>
                                          <Input {...field} type="text" />
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
                                          <Input {...field} type="email" />
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
                           {/* {errorReponse && (
                           <FormAlert type="error">
                              {errorReponse?.message}
                           </FormAlert>
                        )} */}

                           <Button
                              type="submit"
                              variant="default"
                              className="w-full mt-4 mb-2"
                           >
                              Save
                              {/* {isPending ? "Loading..." : "Submit"} */}
                           </Button>
                        </form>
                     </Form>
                  </div>
               </div>
            </DialogContent>
            <DialogFooter className="sm:justify-start">
               <DialogClose asChild>
                  <Button type="button" variant="secondary">
                     Close
                  </Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
