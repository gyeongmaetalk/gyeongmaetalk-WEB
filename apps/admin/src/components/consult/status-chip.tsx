import { CounselStatus } from "@/constants/counsel";
import { cn } from "@gyeongmaetalk/utils";

interface StatusChipProps {
  status: CounselStatus;
}

function getLabel(status: CounselStatus) {
  switch (status) {
    case CounselStatus.COUNSEL_BEFORE:
      return "상담 전";
    case CounselStatus.COUNSEL_AFTER:
      return "상담 후";
    case CounselStatus.SUBSCRIBE:
      return "경매 진행 중";
    case CounselStatus.NONE:
      return "상담 미예약";
    default:
      return "알 수 없음";
  }
}

export default function StatusChip({ status }: StatusChipProps) {
  const label = getLabel(status);
  const styleByStatus = {
    [CounselStatus.COUNSEL_BEFORE]: {
      wrap: "bg-orange-95 text-orange-30 border-orange-90 ring-orange-90",
      dot: "bg-orange-50",
    },
    [CounselStatus.COUNSEL_AFTER]: {
      wrap: "bg-green-95 text-green-30 border-green-90 ring-green-90",
      dot: "bg-green-50",
    },
    [CounselStatus.SUBSCRIBE]: {
      wrap: "bg-blue-95 text-blue-30 border-blue-90 ring-blue-90",
      dot: "bg-blue-50",
    },
    [CounselStatus.NONE]: {
      wrap: "bg-red-95 text-red-30 border-red-90 ring-red-90",
      dot: "bg-red-50",
    },
  };
  return (
    <span
      aria-label={`상태 ${label}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ring-1",
        styleByStatus[status].wrap
      )}
    >
      <span
        className={cn("inline-block size-2.5 rounded-full", styleByStatus[status].dot)}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
