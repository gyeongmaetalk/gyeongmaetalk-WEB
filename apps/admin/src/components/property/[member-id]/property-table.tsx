"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Button, Spinner } from "@gyeongmaetalk/ui";

const PropertyMemberList = dynamic(() => import("./property-member-list"), {
  ssr: false,
  loading: () => <Spinner className="mx-auto" />,
});

interface PropertyTableProps {
  memberId: number;
}

export default function PropertyTable({ memberId }: PropertyTableProps) {
  const router = useRouter();

  const onOpenAdd = () => {
    router.push(`/property/${memberId}/new`);
  };

  return (
    <div className="space-y-4 text-nowrap">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">매물 목록</h3>
        <Button onClick={onOpenAdd} aria-label="매물 추가" size="sm">
          추가
        </Button>
      </div>

      <PropertyMemberList memberId={memberId} />
    </div>
  );
}
