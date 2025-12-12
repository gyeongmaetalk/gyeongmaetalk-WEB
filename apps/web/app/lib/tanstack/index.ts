import { queryClient } from "@gyeongmaetalk/lib/tanstack";

import { AUTH, COUNSEL, QNA } from "~/constants";

export const resetUserQueries = () => {
  queryClient.removeQueries({ queryKey: [AUTH.MY_INFO] });
  queryClient.removeQueries({ queryKey: [COUNSEL.COUNSEL_STATUS] });
  queryClient.removeQueries({ queryKey: [QNA.MY_QNA] });
};
