"use client";

import { CounselStatus } from "@/constants/counsel";
import { useGetCounselList } from "@/lib/tanstack/query/counsel";
import { Accordion, SentinelSpinner } from "@gyeongmaetalk/ui";

import type { CounselFilterValue } from "./counsel-filter";
import CounselStatusChip from "./counsel-status-chip";

interface CounselListProps {
  filters: CounselFilterValue;
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function CounselList({ filters }: CounselListProps) {
  const {
    data: counsels,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetCounselList(filters);

  return (
    <>
      <div>
        {counsels.length === 0 ? (
          <p className="text-muted-foreground py-5 text-center text-sm">상담 내역이 없습니다.</p>
        ) : (
          counsels.map((r) => (
            <Accordion key={r.counselId} className="w-full">
              <Accordion.Header
                iconClassName="absolute right-4 top-1/2 -translate-y-1/2"
                className="border-t-cool-neutral-95 w-full border-t"
              >
                <ul className="grid w-full grid-cols-4 items-center text-start">
                  <li className="truncate px-4 py-3">
                    <span className="block">{r.userName}</span>
                    <span className="text-muted-foreground block text-xs">{r.userCellPhone}</span>
                  </li>
                  <li className="truncate px-4 py-3">{formatDate(r.counselDate)}</li>
                  <li className="truncate px-4 py-3">{formatDate(r.applyDate)}</li>
                  <li className="px-4 py-3">
                    <CounselStatusChip status={CounselStatus.COUNSEL_BEFORE} />
                  </li>
                </ul>
              </Accordion.Header>
              <Accordion.Content>
                <div className="grid grid-cols-6 gap-5 overflow-x-auto px-5 text-sm">
                  <div className="space-y-2">
                    <p className="truncate font-medium">상담사</p>
                    <div>
                      <p>{r.counselorName}</p>
                      <p className="text-muted-foreground truncate text-xs">{r.cellPhone}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="truncate font-medium">목적</p>
                    <p className="truncate">{r.purpose}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="truncate font-medium">지역</p>
                    <p className="truncate">{r.area}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="truncate font-medium">희망 서비스</p>
                    <p className="truncate">{r.serviceType}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="truncate font-medium">궁금한 분야</p>
                    <p className="truncate">{r.interest}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="truncate font-medium">명의</p>
                    <p className="truncate">{r.participantType}</p>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion>
          ))
        )}
      </div>
      <SentinelSpinner
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        className="mx-auto my-5"
      />
    </>
  );
}
