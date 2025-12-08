"use client";

import { useEffect } from "react";

import { WebviewEvent } from "~/constants";
import { useWebView } from "~/hooks/use-webview";
import { useRegisterDeviceToken } from "~/lib/tanstack/mutation/fcm";
import { useUserStore } from "~/lib/zustand/user";

interface FcmTokenProviderProps {
  children: React.ReactNode;
}

export default function FcmTokenProvider({ children }: FcmTokenProviderProps) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const { mutateAsync: registerDeviceToken } = useRegisterDeviceToken();

  const { postMessage } = useWebView((event) => {
    const { type, data } = event;

    if (type === WebviewEvent.REGISTER_DEVICE_TOKEN) {
      const { fcmToken } = data as { fcmToken: string };
      registerDeviceToken(fcmToken).catch(() => {
        // 에러를 조용히 무시하여 백그라운드에서 실행되도록 함
      });
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      postMessage(WebviewEvent.GET_DEVICE_TOKEN);
    }
  }, [isLoggedIn]);

  return children;
}
