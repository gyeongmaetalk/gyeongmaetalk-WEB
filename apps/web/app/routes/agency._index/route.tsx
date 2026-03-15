import { Spinner } from "@gyeongmaetalk/ui";

import { redirect } from "react-router";

import { WithLeftTitleHeader } from "~/components/layout/header";
import PageLayout from "~/components/layout/page-layout";
import { CounselStatus } from "~/constants";
import { useUserStore } from "~/lib/zustand/user";
import { getReservedCounselData } from "~/services/counsel";

import type { Route } from "./+types/route";
import AgencyPage from "./page";

export function meta() {
  return [{ title: "경매대행" }, { name: "description", content: "경매대행" }];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const isLoggedIn = useUserStore.getState().isLoggedIn;

  if (!isLoggedIn) {
    return null;
  }

  try {
    const { result } = await getReservedCounselData();

    if (result.status === CounselStatus.SUBSCRIBE) {
      throw redirect("/agency/recommend");
    }

    return {
      status: result.status,
      info: result.info,
    };
  } catch (err) {
    if (err instanceof Response && err.status >= 300 && err.status < 400) {
      throw err;
    }
    console.error("error", err);
    return null;
  }
}

export function HydrateFallback() {
  return (
    <main className="flex h-screen items-center">
      <Spinner className="mx-auto size-10" />
    </main>
  );
}

export default function AgencyLayout({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout header={<WithLeftTitleHeader title="경매대행" />} showNav>
      <AgencyPage loaderData={loaderData} />
    </PageLayout>
  );
}
