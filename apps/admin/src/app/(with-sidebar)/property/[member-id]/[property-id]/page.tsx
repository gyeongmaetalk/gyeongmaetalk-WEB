import PropertyDetailPage from "@/page/property/[user-id]/[property-id]";

interface PropertyDetailPageProps {
  params: Promise<{
    "property-id": string;
  }>;
}

export default async function PropertyDetail({ params }: PropertyDetailPageProps) {
  const { "property-id": propertyId } = await params;

  return <PropertyDetailPage propertyId={propertyId} />;
}
