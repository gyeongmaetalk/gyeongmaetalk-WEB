import type { BaseResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type { RemainingViewTicketsResponse } from "~/models/view-ticket";

export const getRemainingViewTickets = async (): Promise<
  BaseResponse<RemainingViewTicketsResponse>
> => {
  return api.get("view-tickets/me/wallet").json();
};
