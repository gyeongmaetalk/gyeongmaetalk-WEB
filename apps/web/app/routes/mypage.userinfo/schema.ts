import z from "zod";

export const updateUserInfoFormSchema = z.object({
  name: z.string().min(1),
  birth: z.string().min(1).max(8),
  phone: z.string().min(1),
});

export type UpdateUserInfoForm = z.infer<typeof updateUserInfoFormSchema>;
