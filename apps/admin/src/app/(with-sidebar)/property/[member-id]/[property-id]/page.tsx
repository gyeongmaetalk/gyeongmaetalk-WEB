import PropertyDetailPage from "@/page/property/[user-id]/[property-id]";

interface PropertyDetailPageProps {
  params: Promise<{
    "property-id": string;
    "member-id": string;
  }>;
}

export default async function PropertyDetail({ params }: PropertyDetailPageProps) {
  const { "property-id": propertyId, "member-id": memberId } = await params;

  return <PropertyDetailPage propertyId={propertyId} memberId={+memberId} />;
}
