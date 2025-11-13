import { useEffect } from "react";

import { queryClient } from "@gyeongmaetalk/lib/tanstack";

import { Loader2 } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import { COUNSEL } from "~/constants";
import { useConfirmSubscription } from "~/lib/tanstack/mutation/property";
import { errorToast, successToast } from "~/utils/toast";

export default function SubscribePaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const subscriptionId = searchParams.get("subscriptionId");

  if (!paymentKey || !orderId || !amount || !subscriptionId) {
    return <Navigate to="/agency" replace />;
  }

  const { mutateAsync: confirmSubscription } = useConfirmSubscription();

  useEffect(() => {
    const processPayment = async () => {
      if (!paymentKey || !orderId || !amount || !subscriptionId) {
        errorToast("결제 정보가 올바르지 않아요.");
        navigate("/agency", { replace: true });
        return;
      }

      try {
        await confirmSubscription({
          subscriptionId: Number(subscriptionId),
          paymentKey,
          orderId,
          amount: Number(amount),
        });

        successToast("결제가 완료되었어요.");
        await queryClient.invalidateQueries({ queryKey: [COUNSEL.COUNSEL_STATUS] });
        navigate("/agency/recommend", { replace: true });
      } catch (error) {
        console.error("결제 확인 중 오류 발생:", error);
        errorToast("결제 확인에 실패했어요. 다시 시도해주세요.");
        navigate("/agency", { replace: true });
      }
    };

    processPayment();
  }, [paymentKey, orderId, amount, subscriptionId, confirmSubscription, navigate]);

  if (!paymentKey || !orderId || !amount || !subscriptionId) {
    return <Navigate to="/agency" replace />;
  }

  return (
    <section className="flex h-full flex-col items-center justify-center gap-2">
      <Loader2 className="text-primary-normal size-10 animate-spin" />
      <p>결제 확인 중...</p>
    </section>
  );
}
