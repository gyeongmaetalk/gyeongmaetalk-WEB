import { useEffect } from "react";

import { Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

import { useUserStore } from "~/lib/zustand/user";
import { errorToast } from "~/utils/toast";

export default function RedirectPage() {
  const [searchParams] = useSearchParams();

  const registered = searchParams.get("registered");
  const isRegistered = registered === "true";

  const navigate = useNavigate();

  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const requestAccessToken = async () => {
      try {
        setIsLoggedIn(true);
        if (isRegistered) {
          navigate("/", { replace: true });
        } else {
          localStorage.setItem("isSignupNeeded", "true");
          navigate("/signup", { replace: true });
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
