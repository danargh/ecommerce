import * as z from "zod";

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

export const taskSchema = z.object({
   id: z.string(),
   title: z.string(),
   status: z.string(),
   label: z.string(),
   priority: z.string(),
});
export type Task = z.infer<typeof taskSchema>;
