import { queryOptions } from "@gyeongmaetalk/lib/tanstack";

import { getAppConfig } from "~/services/config";

export const CONFIG_QUERY_OPTIONS = {
  GetAppConfig: () =>
    queryOptions({
      queryKey: ["config", "getAppConfig"],
      queryFn: getAppConfig,
    }),
};
