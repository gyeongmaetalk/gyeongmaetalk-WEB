import type { CounselStatus } from "@/constants/counsel";
import { COUNSEL_STATUS_LABEL } from "@/constants/counsel";
import { cn } from "@gyeongmaetalk/utils";

interface StatusChipProps {
  status: CounselStatus;
}

export default function StatusChip({ status }: StatusChipProps) {
  const currentStatus = COUNSEL_STATUS_LABEL[status];

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
