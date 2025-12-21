"use client";

import dynamic from "next/dynamic";

import { SUBSCRIPTION_STATUS_LABEL, SubscriptionStatus } from "@/constants/subscription";
import { Spinner } from "@gyeongmaetalk/ui";
import { cn } from "@gyeongmaetalk/utils";

const SubscriptionMemberList = dynamic(() => import("./subscription-member-list"), {
  ssr: false,
  loading: () => <Spinner className="mx-auto" />,
});

const statuses = [
  SubscriptionStatus.PENDING,
  SubscriptionStatus.IN_PROGRESS,
  SubscriptionStatus.COMPLETED,
  SubscriptionStatus.PAYMENT_FAILED,
  SubscriptionStatus.CANCELED,
];

export default function SubscriptionMemberTable() {
  return (
    <div className="space-y-4 text-nowrap">
      <h3 className="text-sm font-medium">유저 목록</h3>
      <div className="space-y-2" aria-label="문의 테이블">
        <div className="flex items-center gap-2">
          {statuses.map((status) => (
            <div key={status} className="flex items-center gap-1">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border p-1 ring-1",
                  SUBSCRIPTION_STATUS_LABEL[status].wrap
                )}
              >
                <div
                  className={cn("size-2.5 rounded-full", SUBSCRIPTION_STATUS_LABEL[status].dot)}
                  aria-hidden="true"
                />
              </div>
              <span className="font-caption2-bold text-sm">
                {SUBSCRIPTION_STATUS_LABEL[status].label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <SubscriptionMemberList />
    </div>
  );
}
