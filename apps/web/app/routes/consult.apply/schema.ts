import { z } from "zod";

export const applyConsultFormSchema = z.object({
  purpose: z.string(),
  region: z.string(),
  service: z.string(),
  category: z.string(),
  name: z.string(),
});

export type ApplyConsultForm = z.infer<typeof applyConsultFormSchema>;
