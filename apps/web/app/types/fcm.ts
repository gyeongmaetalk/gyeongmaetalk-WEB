import type { NotificationType } from "~/constants";

export interface NotificationItem {
  id: number;
  contentId: number;
  title: string;
  body: string;
  counselorName: string;
  propertyName: string;
  thumbnail: string;
  counselTime: string;
  createdAt: string;
  type: NotificationType;
  read: boolean;
}
