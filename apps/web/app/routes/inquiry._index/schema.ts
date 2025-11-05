import { z } from "zod";

export const inquiryFormSchema = z.object({
  title: z.string(),
  content: z.string(),
  isAgree: z.boolean(),
});

export type InquiryForm = z.infer<typeof inquiryFormSchema>;
