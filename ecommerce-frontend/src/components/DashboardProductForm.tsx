"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
// import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
// import { Calendar } from "@/registry/new-york/ui/calendar";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "./ui/command";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { ProductSchema } from "@/lib/validation";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui/select";
import Link from "next/link";

const category = [
   { label: "English", value: "en" },
   { label: "French", value: "fr" },
   { label: "German", value: "de" },
   { label: "Spanish", value: "es" },
   { label: "Portuguese", value: "pt" },
   { label: "Russian", value: "ru" },
   { label: "Japanese", value: "ja" },
   { label: "Korean", value: "ko" },
   { label: "Chinese", value: "zh" },
] as const;

type AccountFormValues = z.infer<typeof ProductSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
   // name: "Your name",
   // dob: new Date("2023-01-23"),
};

export function DashboardProductsForm() {
   const form = useForm<AccountFormValues>({
      resolver: zodResolver(ProductSchema),
      defaultValues,
   });

   function onSubmit(data: AccountFormValues) {
      toast({
         title: "You submitted the following values:",
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">
                  {JSON.stringify(data, null, 2)}
               </code>
            </pre>
         ),
      });
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nama Produk</FormLabel>
                     <FormControl>
                        <Input type="text" placeholder="Samsung" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Deskripsi Produk</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Tell us a little bit about yourself"
                           className="resize-none"
                           {...field}
                        />
                     </FormControl>
                     <FormDescription>
                        You can <span>@mention</span> other users and
                        organizations.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="price"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Harga Produk</FormLabel>
                     <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="stock"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Stok Produk</FormLabel>
                     <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="categoryId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Kategori Produk</FormLabel>
                     <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as unknown as string}
                     >
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="m@example.com">
                              m@example.com
                           </SelectItem>
                           <SelectItem value="m@google.com">
                              m@google.com
                           </SelectItem>
                           <SelectItem value="m@support.com">
                              m@support.com
                           </SelectItem>
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Tambah Produk</Button>
         </form>
      </Form>
   );
}
