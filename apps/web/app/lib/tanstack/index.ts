import { queryClient } from "@gyeongmaetalk/lib/tanstack";

import { AUTH, COUNSEL, QNA } from "~/constants";

export const resetUserQueries = () => {
  queryClient.invalidateQueries({ queryKey: [AUTH.MY_INFO] });
  queryClient.invalidateQueries({ queryKey: [COUNSEL.COUNSEL_STATUS] });
  queryClient.invalidateQueries({ queryKey: [QNA.MY_QNA] });
};
