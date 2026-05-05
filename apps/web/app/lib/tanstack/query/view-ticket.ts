import { queryOptions } from "@gyeongmaetalk/lib/tanstack";

import { getRemainingViewTickets } from "~/services/view-ticket";
import { ms } from "~/utils/ms";

import { viewTicketKeys } from "../keys/view-ticket";

export const VIEW_TICKET_QUERY_OPTIONS = {
  GetRemainingViewTickets: () =>
    queryOptions({
      queryKey: viewTicketKeys.getRemainingViewTickets(),
      queryFn: getRemainingViewTickets,
      select: (data) => data.result,
      staleTime: ms.minutes(10),
    }),
};
