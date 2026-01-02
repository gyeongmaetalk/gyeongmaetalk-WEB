import type { PaymentStatus } from "@/constants/payment";

export interface PaymentListItemProps {
  id: number;
  paymentStatus: PaymentStatus;
  userName: string;
  payDate: string;
  cellPhone: string;
}
