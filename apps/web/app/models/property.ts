import type { PropertyListItemProps } from "~/types/property";

export interface PropertyListResponse {
  properties: PropertyListItemProps[];
}

export interface PropertyDetailResponse {
  name: string;
  area: number;
  appraisedPrice: number;
  minPrice: number;
  address: string;
  caseNumber: string;
  caseTitle: string;
  courtName: string;
  registrationDate: string;
  commencementDate: string;
  status: string;
  scheduleInfos: {
    round: number;
    date: string;
    price: number;
    result: string;
  }[];
  debtor: string;
  creditor: string;
  owner: string;
  tenant: string;
  expertComment: string;
  images: string[];
  buildingType: string;
  updateDate: string;
  purchased: boolean;
}

export interface RequestBidResponse {
  id: number;
}
