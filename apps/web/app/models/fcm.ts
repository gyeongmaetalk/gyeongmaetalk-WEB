import type { NotificationItem } from "~/types/fcm";

export type NotificationResponse = NotificationItem[];

export interface NotificationSettingResponse {
  reviewNotificationEnabled: boolean;
  propertyNotificationEnabled: boolean;
}
