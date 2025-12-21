import { useGetSubscriptionList } from "@/lib/tanstack/query/subscription";

export default function PropertyMemberList() {
  const { data: subscriptions, isLoading } = useGetSubscriptionList();

  return <div>PropertyList</div>;
}
