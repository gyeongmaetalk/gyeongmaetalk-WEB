import { useEffect } from "react";

import Clarity from "@microsoft/clarity";

import { useGetMyInfo } from "~/lib/tanstack/query/auth";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  Clarity.init("vvmc2weefe");
}

export default function ClarityProvider() {
  const { data: myInfo, isLoading, isSuccess } = useGetMyInfo();

  useEffect(() => {
    if (!isProduction || isLoading) {
      return;
    }

    // 회원인 경우
    if (isSuccess) {
      const name = myInfo.name ?? "";
      const cellPhone = myInfo.cellPhone ?? "";

      Clarity.identify(cellPhone, undefined, undefined, name);
      return;
    }

    // 비회원인 경우
    const userId = localStorage.getItem("clarityGuestCustomId");
    // 기존에 생성된 비회원 정보가 있다면 해당 정보를 사용
    if (userId !== null) {
      Clarity.identify(userId, undefined, undefined, "guest");
      return;
    }

    // 기존에 생성된 비회원 정보가 없다면 새로 생성
    const newCustomId = crypto.randomUUID();
    Clarity.identify(newCustomId, undefined, undefined, "guest");
    localStorage.setItem("clarityGuestCustomId", newCustomId);
  }, [myInfo]);

  return null;
}
