import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import { Spinner } from "@gyeongmaetalk/ui";

import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { authKeys } from "~/lib/tanstack/keys/auth";
import { getMyInfo } from "~/services/auth";

import type { Route } from "./+types/route";
import MyPageUserInfoPage from "./page";

export function meta() {
  return [{ title: "개인 정보 상세" }, { name: "description", content: "개인 정보 상세" }];
}

export async function clientLoader() {
  return queryClient.fetchQuery({
    queryKey: authKeys.getMyInfo(),
    queryFn: getMyInfo,
    staleTime: 1000 * 60,
  });
}

export function HydrateFallback() {
  return (
    <main className="flex h-screen items-center">
      <Spinner className="mx-auto size-10" />
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
