import { useRouter } from "next/navigation";

import { useGetPropertyList } from "@/lib/tanstack/query/property";
import { Button } from "@gyeongmaetalk/ui";
import { formatPrice } from "@gyeongmaetalk/utils";

interface PropertyMemberListProps {
  memberId: number;
}

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

export default function PropertyMemberList({ memberId }: PropertyMemberListProps) {
  const router = useRouter();
  const { data: properties } = useGetPropertyList(memberId);

  return (
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
            <th className="bg-muted px-4 py-3">업데이트</th>
            <th className="bg-muted px-4 py-3">작업</th>
          </tr>
        </thead>
        <tbody>
          {properties.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-muted-foreground py-5 text-center">
                등록된 매물이 없습니다.
              </td>
            </tr>
          ) : (
            properties.map((p) => (
              <tr key={p.id} className="border-t-cool-neutral-95 border-t">
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
                <td className="px-4 py-3">{formatDate(p.updateDate)}</td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="outlined"
                    aria-label="수정"
                    onClick={() => router.push(`/property/${memberId}/${p.id}`)}
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
