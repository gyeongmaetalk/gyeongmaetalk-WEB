import { useEffect } from "react";

import { Spinner } from "@gyeongmaetalk/ui";

import { useNavigate, useSearchParams } from "react-router";

import { useMixpanelSessionStore } from "~/lib/zustand/mixpanel-session";
import { useUserStore } from "~/lib/zustand/user";
import { errorToast } from "~/utils/toast";

export default function RedirectPage() {
  const [searchParams] = useSearchParams();

  const registered = searchParams.get("registered");
  const isRegistered = registered === "true";
  const name = searchParams.get("name");

  const navigate = useNavigate();

  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
  const setIsRegistered = useUserStore((state) => state.setIsRegistered);

  useEffect(() => {
    const requestAccessToken = async () => {
      try {
        useMixpanelSessionStore.getState().setLoginPending(true);
        setIsLoggedIn(true);
        setIsRegistered(isRegistered);
        if (isRegistered) {
          navigate("/", { replace: true });
        } else {
          navigate("/signup", { replace: true, state: { name } });
        }
      } catch (error) {
        console.error(error);
        errorToast("로그인 요청에 실패했어요.\n다시 시도해주세요.");
        navigate("/", { replace: true });
      }
    };

    requestAccessToken();
  }, []);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-2">
      <Spinner className="size-10" />
      <p>로그인 중...</p>
    </section>
  );
}
