import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(1),
  birth: z.string().min(1).max(8),
  phone: z.string().min(1),
  code: z.string().min(1),
});

export type SignupForm = z.infer<typeof signupFormSchema>;
