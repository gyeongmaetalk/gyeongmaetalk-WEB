import { queryClient } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";
import { Spinner } from "@gyeongmaetalk/ui";

import { counselKeys } from "~/lib/tanstack/keys/counsel";
import type { ReservedCounselDataResponse } from "~/models/counsel";

import type { Route } from "./+types/route";
import ConsultApplyPage from "./page";

export function meta() {
  return [{ title: "상담 신청하기" }, { name: "description", content: "상담 신청하기" }];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");
  const step = url.searchParams.get("step");
  if (!mode) {
    return {
      step,
    };
  }
  const cachedData = queryClient.getQueryData<BaseResponse<ReservedCounselDataResponse>>(
    counselKeys.getReservedCounselData()
  );
  if (cachedData) {
    const { result } = cachedData;
    return {
      mode,
      step,
      result: result.info,
      counselFormId: result.info.counselFormId,
    };
  }
  return {
    step,
  };
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
      mode={loaderData?.mode}
      step={Number(loaderData.step || "1")}
      counselFormId={loaderData?.counselFormId}
    />
  );
}
