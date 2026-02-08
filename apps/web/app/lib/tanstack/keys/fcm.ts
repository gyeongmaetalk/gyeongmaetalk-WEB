export const fcmKeys = {
  all: ["fcm"] as const,
  getNotifications: () => [...fcmKeys.all, "getNotifications"] as const,
  getNotificationSetting: () => [...fcmKeys.all, "getNotificationSetting"] as const,
};
