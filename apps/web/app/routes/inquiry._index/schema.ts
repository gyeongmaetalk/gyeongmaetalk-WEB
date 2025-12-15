import { z } from "zod";

export enum InquiryCategory {
  DEFAULT = "",
  PAYMENT = "PAYMENT",
  ETC = "ETC",
}

export const inquiryFormSchema = z.object({
  category: z.enum(InquiryCategory),
  title: z.string(),
  content: z.string(),
  isAgree: z.boolean(),
});

export type InquiryForm = z.infer<typeof inquiryFormSchema>;
