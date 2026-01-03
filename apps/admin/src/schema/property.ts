import { z } from "zod";

export const propertyScheduleInfoSchema = z.object({
  round: z.number(),
  date: z.string(),
  price: z.number().min(0),
  result: z.string(),
});

export const propertyFormSchema = z.object({
  name: z.string().min(1, "매물명을 입력하세요"),
  buildingType: z.string().min(1, "건물 유형을 입력하세요"),
  area: z.number().min(0, "면적을 입력하세요"),
  address: z.string().min(1, "주소를 입력하세요"),
  appraisedPrice: z.number().min(0, "감정가를 입력하세요"),
  minPrice: z.number().min(0, "최저가를 입력하세요"),
  caseNumber: z.string().min(1, "사건번호를 입력하세요"),
  caseTitle: z.string().min(1, "사건명을 입력하세요"),
  courtName: z.string().min(1, "법원명을 입력하세요"),
  registrationDate: z.string().min(1, "등기일을 입력하세요"),
  commencementDate: z.string().min(1, "경매일을 입력하세요"),
  debtor: z.string().min(1, "채무자를 입력하세요"),
  creditor: z.string().min(1, "채권자를 입력하세요"),
  owner: z.string().min(1, "소유자를 입력하세요"),
  tenant: z.string().min(1, "임차인을 입력하세요"),
  expertComment: z.string().min(1, "전문가 코멘트를 입력하세요"),
  scheduleInfos: z.array(propertyScheduleInfoSchema),
  status: z.string().min(1, "상태를 입력하세요"),
  images: z.array(z.string()),
});

export type PropertyForm = z.infer<typeof propertyFormSchema>;
