import { Spinner } from "@gyeongmaetalk/ui";

import { getReservedCounselData } from "~/services/counsel";

import type { Route } from "./+types/route";
import ConsultApplyPage from "./page";

export function meta() {
  return [{ title: "상담 신청하기" }, { name: "description", content: "상담 신청하기" }];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");
  if (!mode) {
    return null;
  }
  try {
    const { result } = await getReservedCounselData();
    return {
      mode,
      result: result.info,
      counselFormId: result.info.counselFormId,
    };
  } catch (error) {
    console.error(error);
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

const DEFAULT_VALUES = {
  purpose: "",
  region: "",
  service: "",
  category: "",
  name: "",
};

export default function ConsultApplyLayout({ loaderData }: Route.ComponentProps) {
  const isChangeMode = loaderData?.mode === "change";
  let defaultValues = DEFAULT_VALUES;
  if (loaderData && loaderData.mode) {
    defaultValues = {
      purpose: loaderData.result.purpose,
      region: loaderData.result.area,
      service: loaderData.result.serviceType,
      category: loaderData.result.interest,
      name: loaderData.result.participantType,
    };
  }

  return (
    <ConsultApplyPage
      defaultValues={defaultValues}
      isChangeMode={isChangeMode}
      counselFormId={loaderData?.counselFormId}
    />
  );
}
