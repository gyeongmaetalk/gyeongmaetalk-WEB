import type { SubscriptionStatus } from "@/constants/subscription";

export interface SubscriptionListItemProps {
  subscriptionId: number;
  memberId: number;
  memberName: string;
  memberCellPhone: string;
  startTime: string;
  subscriptionStatus: SubscriptionStatus;
}
