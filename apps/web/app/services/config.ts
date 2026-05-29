import { api } from "~/lib/ky";
import type { AppConfigResponse } from "~/models/config";

export const getAppConfig = async (): Promise<AppConfigResponse> => {
  return api.get("app/config").json();
};
