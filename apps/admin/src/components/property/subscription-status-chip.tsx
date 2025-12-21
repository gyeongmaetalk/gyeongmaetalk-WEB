import type { SubscriptionStatus } from "@/constants/subscription";
import { SUBSCRIPTION_STATUS_LABEL } from "@/constants/subscription";
import { cn } from "@gyeongmaetalk/utils";

interface SubscriptionStatusChipProps {
  status: SubscriptionStatus;
}

export default function SubscriptionStatusChip({ status }: SubscriptionStatusChipProps) {
  const currentStatus = SUBSCRIPTION_STATUS_LABEL[status];

  return (
    <span
      aria-label={`상태 ${currentStatus.label}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border p-1 text-xs font-semibold ring-1",
        currentStatus.wrap
      )}
    >
      <span
        className={cn("inline-block size-2.5 rounded-full", currentStatus.dot)}
        aria-hidden="true"
      />
    </span>
  );
}
