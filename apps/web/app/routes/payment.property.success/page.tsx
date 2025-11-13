import { useEffect } from "react";

import { queryClient } from "@gyeongmaetalk/lib/tanstack";

import { Loader2 } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import { PROPERTY } from "~/constants";
import { useConfirmPurchase } from "~/lib/tanstack/mutation/property";
import { errorToast, successToast } from "~/utils/toast";

export default function PropertyPaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const propertyId = searchParams.get("propertyId");

  if (!paymentKey || !orderId || !amount || !propertyId) {
    return <Navigate to="/agency/recommend" replace />;
  }

  const { mutateAsync: confirmPurchase } = useConfirmPurchase();

  useEffect(() => {
    const processPayment = async () => {
      try {
        await confirmPurchase({
          propertyId: Number(propertyId),
          paymentKey,
          orderId,
          amount: Number(amount),
        });

        successToast("결제가 완료되었어요.");
        await queryClient.invalidateQueries({ queryKey: [PROPERTY.PROPERTY_LIST] });
        navigate(`/agency/recommend/${propertyId}`, { replace: true });
      } catch (error) {
        console.error("결제 확인 중 오류 발생:", error);
        errorToast("결제 확인에 실패했어요. 다시 시도해주세요.");
        navigate("/agency/recommend", { replace: true });
      }
    };

    processPayment();
  }, [paymentKey, orderId, amount, propertyId, confirmPurchase, navigate]);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-2">
      <Loader2 className="text-primary-normal size-10 animate-spin" />
      <p>결제 확인 중...</p>
    </section>
  );
}

