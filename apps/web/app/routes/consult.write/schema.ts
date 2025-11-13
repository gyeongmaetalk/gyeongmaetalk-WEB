import { z } from "zod";

export const writeConsultReviewFormSchema = z.object({
  score: z.number().min(1).max(5),
  content: z.string().min(20),
  imageUrls: z.string().array(),
});

export type WriteConsultReviewForm = z.infer<typeof writeConsultReviewFormSchema>;
