import { queryClient } from "@gyeongmaetalk/lib/tanstack";

import { redirect } from "react-router";

import { WithBackHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { CONFIG_QUERY_OPTIONS } from "~/lib/tanstack/query/config";

import ReviewLoginPage from "./page";

export function meta() {
  return [{ title: "App Review Login" }, { name: "description", content: "App Review Login" }];
}

export async function clientLoader() {
  const result = await queryClient.ensureQueryData(CONFIG_QUERY_OPTIONS.GetAppConfig());

  if (!result.reviewLoginEnabled) {
    throw redirect("/");
  }
}

export default function ReviewLoginLayout() {
  return (
    <PageLayout header={<WithBackHeader title="App Review Login" />} showNav>
      <ReviewLoginPage />
    </PageLayout>
  );
}
