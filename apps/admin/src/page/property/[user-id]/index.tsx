import PropertyTable from "@/components/property/[member-id]/property-table";

interface PropertyByMemberPageProps {
  memberId: string;
}

export default function PropertyByMemberPage({ memberId }: PropertyByMemberPageProps) {
  return (
    <main>
      <h1 className="text-2xl font-semibold tracking-tight">유저별 매물 대시보드</h1>
      <PropertyTable />
    </main>
  );
}
