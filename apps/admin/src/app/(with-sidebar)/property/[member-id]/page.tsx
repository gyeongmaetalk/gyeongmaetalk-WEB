import PropertyByMemberPage from "@/page/property/[user-id]";

interface PropertyByMemberPageProps {
  params: Promise<{
    "member-id": string;
  }>;
}

export default async function PropertyByMember({ params }: PropertyByMemberPageProps) {
  const { "member-id": memberId } = await params;

  return <PropertyByMemberPage memberId={memberId} />;
}
