"use client";

import { useRouter } from "next/navigation";

import { useGetSubscriptionList } from "@/lib/tanstack/query/subscription";
import { Button } from "@gyeongmaetalk/ui";

import SubscriptionStatusChip from "./subscription-status-chip";

export default function SubscriptionMemberList() {
  const router = useRouter();
  const { data: subscriptions } = useGetSubscriptionList();

  return (
    <div className="border-cool-neutral-95 overflow-x-auto rounded-md border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th className="bg-muted px-4 py-3">이름</th>
            <th className="bg-muted px-4 py-3">전화번호</th>
            <th className="bg-muted px-4 py-3">상태</th>
            <th className="bg-muted px-4 py-3">작업</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-muted-foreground py-5 text-center">
                구독 중인 유저가 없습니다.
              </td>
            </tr>
          ) : (
            subscriptions.map((p) => (
              <tr key={p.subscriptionId} className="border-t-cool-neutral-95 border-t">
                <td className="px-4 py-3">{p.memberName}</td>
                <td className="px-4 py-3">{p.memberCellPhone}</td>
                <td className="px-4 py-3">
                  <SubscriptionStatusChip status={p.subscriptionStatus} />
                </td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outlined"
                    aria-label="수정"
                    onClick={() => router.push(`/property/${p.memberId}`)}
                  >
                    수정
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
