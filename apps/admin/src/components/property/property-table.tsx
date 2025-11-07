"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { mockProperties } from "@/mock/properties";
import type { Property } from "@/types";
import { Button } from "@gyeongmaetalk/ui";
import { formatPrice } from "@gyeongmaetalk/utils";

// 추후 tanstack query로 교체
const isLoading = false;

function formatDate(date: string) {
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatArea(area: number) {
  return `${area.toFixed(2)}㎡`;
}

export default function PropertyTable() {
  const router = useRouter();
  const [properties] = useState(mockProperties);

  const onOpenAdd = () => {
    router.push("/property/new");
  };

  const onOpenEdit = (property: Property) => {
    router.push(`/property/${property.propertyId}`);
  };

  return (
    <div className="space-y-4 text-nowrap">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">매물 목록</h3>
        <Button onClick={onOpenAdd} aria-label="매물 추가" size="sm">
          추가
        </Button>
      </div>

      <div className="border-cool-neutral-95 overflow-x-auto rounded-md border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="bg-muted px-4 py-3">매물명</th>
              <th className="bg-muted px-4 py-3">주소</th>
              <th className="bg-muted px-4 py-3">건물 유형</th>
              <th className="bg-muted px-4 py-3">면적</th>
              <th className="bg-muted px-4 py-3">감정가</th>
              <th className="bg-muted px-4 py-3">최저가</th>
              <th className="bg-muted px-4 py-3">사건번호</th>
              <th className="bg-muted px-4 py-3">업데이트</th>
              <th className="bg-muted px-4 py-3">작업</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={10} className="text-muted-foreground px-4 py-10 text-center">
                  로딩 중...
                </td>
              </tr>
            )}
            {!isLoading && properties.length === 0 && (
              <tr>
                <td colSpan={10} className="text-muted-foreground px-4 py-10 text-center">
                  등록된 매물이 없습니다.
                </td>
              </tr>
            )}
            {!isLoading &&
              properties.map((p) => (
                <tr key={p.propertyId} className="border-t-cool-neutral-95 border-t">
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate" title={p.address}>
                      {p.address}
                    </div>
                  </td>
                  <td className="px-4 py-3">{p.buildingType}</td>
                  <td className="px-4 py-3">{formatArea(p.area)}</td>
                  <td className="px-4 py-3">{formatPrice(p.appraisedPrice)}</td>
                  <td className="px-4 py-3">{formatPrice(p.minPrice)}</td>
                  <td className="px-4 py-3">{p.caseNumber}</td>
                  <td className="px-4 py-3">{formatDate(p.updateDate)}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outlined"
                      aria-label="수정"
                      onClick={() => onOpenEdit(p)}
                    >
                      수정
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
