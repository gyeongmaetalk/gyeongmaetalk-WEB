import { z } from "zod";

export const propertyScheduleInfoSchema = z
  .object({
    round: z.number(),
    date: z.string(),
    price: z.union([z.number(), z.string()]),
    result: z.string(),
  })
  .optional();

export const propertyFormSchema = z.object({
  name: z.string().min(1, "매물명을 입력하세요"),
  buildingType: z.string().min(1, "건물 유형을 입력하세요"),
  area: z.string().min(1, "면적을 입력하세요"),
  address: z.string().min(1, "주소를 입력하세요"),
  appraisedPrice: z.string().min(1, "감정가를 입력하세요"),
  minPrice: z.string().min(1, "최저가를 입력하세요"),
  caseNumber: z.string().min(1, "사건번호를 입력하세요"),
  caseTitle: z.string(),
  courtName: z.string(),
  registrationDate: z.string(),
  commencementDate: z.string(),
  debtor: z.string(),
  creditor: z.string(),
  owner: z.string(),
  tenant: z.string(),
  expertComment: z.string(),
  scheduleInfos: z.array(propertyScheduleInfoSchema),
});

export type PropertyForm = z.infer<typeof propertyFormSchema>;
