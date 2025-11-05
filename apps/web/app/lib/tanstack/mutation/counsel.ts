import type { BaseResponse } from "@gyeongmaetalk/types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { HTTPError } from "ky";

import type {
  MatchCounselRequest,
  MatchCounselResponse,
  ReserveConsultRequest,
  ReserveConsultResponse,
} from "~/models/counsel";
import { matchCounsel, reserveConsult } from "~/services/counsel";

export const useMatchCounsel = (
  options?: UseMutationOptions<BaseResponse<MatchCounselResponse>, HTTPError, MatchCounselRequest>
) => {
  return useMutation<BaseResponse<MatchCounselResponse>, HTTPError, MatchCounselRequest>({
    mutationFn: matchCounsel,
    ...options,
  });
};

export const useReserveConsult = (
  options?: UseMutationOptions<
    BaseResponse<ReserveConsultResponse>,
    HTTPError,
    ReserveConsultRequest
  >
) => {
  return useMutation<BaseResponse<ReserveConsultResponse>, HTTPError, ReserveConsultRequest>({
    mutationFn: reserveConsult,
    ...options,
  });
};
