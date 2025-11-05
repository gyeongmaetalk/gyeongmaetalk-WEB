import { QueryClient } from "@tanstack/react-query";

import { AUTH, COUNSEL, QNA } from "~/constants";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000,
    },
  },
});

export const resetUserQueries = () => {
  queryClient.invalidateQueries({ queryKey: [AUTH.MY_INFO] });
  queryClient.invalidateQueries({ queryKey: [COUNSEL.COUNSEL_STATUS] });
  queryClient.invalidateQueries({ queryKey: [QNA.MY_QNA] });
};
