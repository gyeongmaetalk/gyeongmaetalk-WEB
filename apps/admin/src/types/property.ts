export interface PropertyListItemProps {
  id: number;
  name: string;
  address: string;
  area: number;
  biddingDate: string;
  appraisedPrice: number;
  minPrice: number;
  images: string[];
  buildingType: string;
  updateDate: string;
  purchased: boolean;
  payment: boolean;
}

export interface PropertyScheduleInfoProps {
  round: number;
  date: string;
  price: number;
  result: string;
}
