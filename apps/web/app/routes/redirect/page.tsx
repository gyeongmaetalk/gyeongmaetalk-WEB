import { useEffect } from "react";

import type { BaseResponse } from "@gyeongmaetalk/types";

import { Loader2 } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import { WebviewEvent } from "~/constants";
import { useWebView } from "~/hooks/use-webview";
import { api } from "~/lib/ky";
import { useAccessTokenStore, useRefreshTokenStore } from "~/lib/zustand/user";
import type { UserResponse } from "~/models/auth";
import { errorToast } from "~/utils/toast";

export default function RedirectPage() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  const registered = searchParams.get("registered");
  const isRegistered = registered === "true";

  const navigate = useNavigate();

  const { postMessage } = useWebView();

  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const setRefreshToken = useRefreshTokenStore((state) => state.setRefreshToken);

  if (!code) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const requestAccessToken = async () => {
      try {
        const { result } = await api
          .post<BaseResponse<UserResponse>>("auth/exchange", {
            searchParams: { code },
          })
          .json();

        postMessage(WebviewEvent.GET_ALARM_STATUS, {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });

        if (isRegistered) {
          setAccessToken(result.accessToken);
          setRefreshToken(result.refreshToken);
          navigate("/", { replace: true });
        } else {
          navigate("/signup", { replace: true, state: result });
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
      <Loader2 className="text-primary-normal size-10 animate-spin" />
      <p>로그인 중...</p>
    </section>
  );
}
