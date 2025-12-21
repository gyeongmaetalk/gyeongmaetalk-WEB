import type { PaymentType } from "@/constants/payment";
import { PAYMENT } from "@/constants/payment";
import { getPaymentList } from "@/service/payment";
import { useSuspenseInfiniteQuery } from "@gyeongmaetalk/lib/tanstack";
import { calculatePaigination } from "@gyeongmaetalk/utils";

export const useGetPaymentList = (props: {
  paymentType: PaymentType;
  startDate: string;
  endDate: string;
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: [PAYMENT.LIST, props.paymentType, props.startDate, props.endDate],
    queryFn: ({ pageParam = 0 }) => getPaymentList({ page: pageParam.toString(), ...props }),
    getNextPageParam: calculatePaigination,
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.result.payments),
  });
};
