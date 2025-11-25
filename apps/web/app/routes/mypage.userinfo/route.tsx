import { queryClient } from "@gyeongmaetalk/lib/tanstack";

import { Loader2 } from "lucide-react";

import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { AUTH } from "~/constants";
import { getMyInfo } from "~/services/auth";

import type { Route } from "./+types/route";
import MyPageUserInfoPage from "./page";

export function meta() {
  return [{ title: "개인 정보 상세" }, { name: "description", content: "개인 정보 상세" }];
}

export async function clientLoader() {
  return queryClient.fetchQuery({
    queryKey: [AUTH.MY_INFO],
    queryFn: getMyInfo,
    staleTime: 1000 * 60,
  });
}

export function HydrateFallback() {
  return (
    <main className="flex h-screen items-center">
      <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
    </main>
  );
}

const MyPageUserInfoLayout = ({ loaderData }: Route.ComponentProps) => {
  return (
    <PageLayout header={<WithBackHeader title="개인 정보 상세" />}>
      <MyPageUserInfoPage myInfo={loaderData.result} />
    </PageLayout>
  );
};

export default MyPageUserInfoLayout;
