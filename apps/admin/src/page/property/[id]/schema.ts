import { z } from "zod";

export const propertyScheduleInfoSchema = z.object({
  round: z.number().optional(),
  date: z.string(),
  price: z.union([z.number(), z.string()]),
  result: z.string(),
});

export const propertyFormSchema = z.object({
  name: z.string().min(1, "매물명을 입력하세요"),
  buildingType: z.string().min(1, "건물 유형을 입력하세요"),
  area: z.string().min(1, "면적을 입력하세요"),
  address: z.string().min(1, "주소를 입력하세요"),
  appraisedPrice: z.string().min(1, "감정가를 입력하세요"),
  minPrice: z.string().min(1, "최저가를 입력하세요"),
  caseNumber: z.string().min(1, "사건번호를 입력하세요"),
  caseTitle: z.string().optional(),
  courtName: z.string().optional(),
  registrationDate: z.string().optional(),
  commencementDate: z.string().optional(),
  status: z.string().optional(),
  debtor: z.string().optional(),
  creditor: z.string().optional(),
  owner: z.string().optional(),
  tenant: z.string().optional(),
  expertComment: z.string().optional(),
  scheduleInfos: z.array(propertyScheduleInfoSchema),
});

export type PropertyForm = z.infer<typeof propertyFormSchema>;
