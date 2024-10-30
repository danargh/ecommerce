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
import { useCreateProduct } from "@/api/product";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import {
   Category,
   Product,
   ProductRequest,
   ProductResponse,
   Response,
} from "@/interfaces";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/actions/category";
import { useUserSlice } from "@/global/store";

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

interface Props {
   onMutateCreateProduct: UseMutateAsyncFunction<
      Response<ProductResponse>,
      AxiosError<unknown, unknown>,
      ProductRequest,
      unknown
   >;
   data?: Response<ProductResponse>;
   setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
   editData: Product | undefined;
}

export function DashboardProductsForm({
   data,
   setTableData,
   editData,
   onMutateCreateProduct,
}: Props) {
   const {
      status: createProductStatus,
      data: removedProductData,
      mutateAsync: mutateCreateProduct,
   } = useCreateProduct();
   const [categories, setCategories] = useState<Category[]>();
   const user = useUserSlice((state) => state.user);

   const form = useForm<z.infer<typeof ProductSchema>>({
      resolver: zodResolver(ProductSchema),
      defaultValues: {
         name: editData?.name || "",
         description: editData?.description || "",
         price: editData?.price || 0,
         stock: editData?.stock || 0,
         createdById: user?.id,
         categoryId: editData?.categoryId.id || 0,
      },
   });

   useEffect(() => {
      const getCategories = async () => {
         const { success, data, error } = await getAllCategories({
            success: false,
            error: false,
         });
         setCategories(data);
      };
      if (user?.id) {
         form.setValue("createdById", user.id);
      }
      if (editData) {
         console.log("dibawah", editData);
         form.reset({
            name: editData?.name || "",
            description: editData?.description || "",
            price: editData?.price || 0,
            stock: editData?.stock || 0,
            createdById: user?.id,
            categoryId: editData?.categoryId.id || 0,
         });
      }

      getCategories();
   }, [form, user?.id, editData]);

   function onSubmit(data: z.infer<typeof ProductSchema>) {
      console.log(data);
      mutateCreateProduct(data, {
         onSuccess: (newProduct) => {
            setTableData((prev) => [...prev, newProduct]);
            window.location.reload();
         },
      });
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="createdById"
               render={({ field }) => (
                  <FormItem className="hidden">
                     <FormControl>
                        <Input readOnly={true} type="number" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
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
                              <SelectValue placeholder="Select category" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {categories?.map((data) => {
                              return (
                                 <SelectItem
                                    key={data.id}
                                    value={String(data.id)}
                                 >
                                    {data.name}
                                 </SelectItem>
                              );
                           })}
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">
               {editData ? "Edit Produk" : "Tambah Produk"}
            </Button>
         </form>
      </Form>
   );
}
