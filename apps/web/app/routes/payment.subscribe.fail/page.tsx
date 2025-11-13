import { useEffect } from "react";

import { Loader2 } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import { errorToast } from "~/utils/toast";

export default function SubscribePaymentFailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get("code");
  const message = searchParams.get("message");
  const orderId = searchParams.get("orderId");

  if (!code || !message || !orderId) {
    return <Navigate to="/agency" replace />;
  }

  useEffect(() => {
    if (code && message) {
      errorToast(message || "결제에 실패했어요. 다시 시도해주세요.");
    }
    navigate("/agency", { replace: true });
  }, [code, message, orderId, navigate]);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-2">
      <Loader2 className="text-primary-normal size-10 animate-spin" />
      <p>결제 실패 처리 중...</p>
    </section>
  );
}
