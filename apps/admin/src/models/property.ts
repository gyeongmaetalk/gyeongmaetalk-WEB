import type { PropertyForm } from "@/schema/property";
import type { PropertyListItemProps, PropertyScheduleInfoProps } from "@/types/property";

export interface PropertyListResponse {
  properties: PropertyListItemProps[];
}

export interface PropertyDetailResponse {
  address: string;
  appraisedPrice: number;
  area: number;
  buildingType: string;
  caseNumber: string;
  caseTitle: string;
  commencementDate: string;
  courtName: string;
  creditor: string;
  debtor: string;
  expertComment: string;
  minPrice: number;
  name: string;
  owner: string;
  registrationDate: string;
  scheduleInfos: PropertyScheduleInfoProps[];
  tenant: string;
  status: string;
}

export interface UpdatePropertyRequest {
  propertyId: string;
  body: PropertyForm;
}
