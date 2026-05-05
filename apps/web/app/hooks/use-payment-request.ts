import { useEffect, useState } from "react";

import { useQuery, useQueryClient } from "@gyeongmaetalk/lib/tanstack";
import { toast } from "@gyeongmaetalk/ui";

import { CounselStatus, WebviewEvent } from "~/constants";
import { useRequestOrder } from "~/lib/tanstack/mutation/order";
import { useConfirmPayment } from "~/lib/tanstack/mutation/payment";
import { useCheckCounselStatus } from "~/lib/tanstack/query/counsel";
import { PRODUCT_QUERY_OPTIONS } from "~/lib/tanstack/query/product";
import { VIEW_TICKET_QUERY_OPTIONS } from "~/lib/tanstack/query/view-ticket";
import type { PaymentConfirmRequest } from "~/models/payment";
import type { ProductCategory, ProductListItemProps } from "~/models/product";

import { useWebView } from "./use-webview";

export function usePaymentRequest(category: ProductCategory) {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isRequestOrderLoading, setIsRequestOrderLoading] = useState(false);

  const { data: products } = useQuery(PRODUCT_QUERY_OPTIONS.GetProducts(category));
  const { data } = useCheckCounselStatus();
  const { mutate: confirmPayment } = useConfirmPayment();
  const { mutateAsync: requestOrder } = useRequestOrder();

  const queryClient = useQueryClient();

  const isCounselorAssigned = data && data.status !== CounselStatus.NONE;

  const { postMessage } = useWebView(async (event) => {
    // 결제 요청 성공
    if (event.type === WebviewEvent.REQUEST_ORDER_SUCCESS) {
      const data = event.data as PaymentConfirmRequest;
      confirmPayment(data, {
        onSuccess: () => {
          queryClient.invalidateQueries(VIEW_TICKET_QUERY_OPTIONS.GetRemainingViewTickets());
          toast.success("결제가 완료되었습니다.");
          setIsPaymentComplete(true);
        },
        onError: () => {
          toast.error("서버에 문제가 발생했습니다. 고객센터로 문의해주세요.");
        },
        onSettled: () => {
          setIsRequestOrderLoading(false);
        },
      });
      return;
    }

    if (event.type === WebviewEvent.REQUEST_ORDER_CANCELLED) {
      toast.error("결제가 취소되었습니다.");
      setIsRequestOrderLoading(false);
      return;
    }

    // 결제 요청 실패
    if (event.type === WebviewEvent.REQUEST_ORDER_FAILED) {
      toast.error("결제에 실패했습니다.");
      setIsRequestOrderLoading(false);
      return;
    }
  });

  // 상품 클릭 시 결제 요청
  const onRequestOrderProduct = async (selectedProduct: ProductListItemProps) => {
    if (data === undefined) {
      toast.warning("상담사 배정이 완료되지 않았습니다. 고객센터로 문의해주세요.");
      return;
    }

    const idempotencyKey =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : crypto.getRandomValues(new Uint8Array(16)).toString();
    setIsRequestOrderLoading(true);
    const requestOrderResult = await requestOrder({
      productId: selectedProduct.id,
      idempotencyKey,
      counselorId: data.info.counselorId,
    });

    postMessage(WebviewEvent.REQUEST_ORDER, requestOrderResult.result);
  };

  useEffect(() => {
    if (!isRequestOrderLoading) {
      return;
    }
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const previousHtmlOverflow = htmlElement.style.overflow;
    const previousBodyOverflow = bodyElement.style.overflow;
    htmlElement.style.overflow = "hidden";
    bodyElement.style.overflow = "hidden";
    return () => {
      htmlElement.style.overflow = previousHtmlOverflow;
      bodyElement.style.overflow = previousBodyOverflow;
    };
  }, [isRequestOrderLoading]);

  return {
    products,
    onRequestOrderProduct,
    isPaymentComplete,
    isRequestOrderLoading,
    isCounselorAssigned,
  };
}
