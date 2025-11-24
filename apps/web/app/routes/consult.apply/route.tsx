import { Loader2 } from "lucide-react";

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
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function HydrateFallback() {
  return (
    <main className="flex h-screen items-center">
      <Loader2 className="text-primary-normal mx-auto size-10 animate-spin" />
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

  return <ConsultApplyPage defaultValues={defaultValues} />;
}
