import { useEffect } from "react";

import { syncMixpanelAfterMyInfo } from "~/lib/analytics/mixpanel-sync-login";
import { useGetMyInfo } from "~/lib/tanstack/query/auth";
import { useUserStore } from "~/lib/zustand/user";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const { data: myInfo } = useGetMyInfo();
  const setUser = useUserStore((state) => state.setUser);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (myInfo) {
      setUser({
        name: myInfo.name,
        loginType: myInfo.loginType,
        auctionStatus: myInfo.auctionStatus,
      });
      if (isLoggedIn) {
        syncMixpanelAfterMyInfo(myInfo);
      }
    }
  }, [isLoggedIn, myInfo, setUser]);

  return children;
}
