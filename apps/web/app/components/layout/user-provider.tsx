import { useEffect } from "react";

import { useNavigate } from "react-router";

import { useGetMyInfo } from "~/lib/tanstack/query/auth";
import { useUserStore } from "~/lib/zustand/user";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const navigate = useNavigate();

  const { data: myInfo } = useGetMyInfo();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const isSignupNeeded = localStorage.getItem("isSignupNeeded");
    if (isSignupNeeded) {
      navigate("/signup");
      return;
    }

    if (myInfo) {
      setUser({
        name: myInfo.name,
        loginType: myInfo.loginType,
        auctionStatus: myInfo.auctionStatus,
      });
    }
  }, [myInfo]);

  return children;
}
