import { z } from "zod";

export const writeConsultReviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(20),
  images: z.array(z.instanceof(File)).optional(),
  isAgree: z.boolean(),
});

export type WriteConsultReviewForm = z.infer<typeof writeConsultReviewFormSchema>;
