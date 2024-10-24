import * as z from "zod";

// auth
export const LoginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(5),
});
export const RegisterSchema = z
   .object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(5),
      confirmPassword: z.string().min(1),
   })
   .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
         ctx.addIssue({
            code: "custom",
            message: "The password did not match",
            path: ["confirmPassword"],
         });
      }
   });

// product
export const ProductSchema = z.object({
   name: z
      .string()
      .min(2, {
         message: "Name must be at least 2 characters.",
      })
      .max(30, {
         message: "Name must not be longer than 30 characters.",
      }),
   description: z.string().min(2),
   price: z.number().min(1),
   stock: z.number(),
   createdById: z.number(),
   categoryId: z.number(),
});

export const taskSchema = z.object({
   id: z.string(),
   title: z.string(),
   status: z.string(),
   label: z.string(),
   priority: z.string(),
});
export type Task = z.infer<typeof taskSchema>;
