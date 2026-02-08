import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useMutation, type UseMutationOptions } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type {
  ChangeMatchCounselRequest,
  ChangeReserveConsultRequest,
  MatchCounselRequest,
  MatchCounselResponse,
  ReserveConsultRequest,
  ReserveConsultResponse,
} from "~/models/counsel";
import {
  changeMatchCounsel,
  changeReserveConsult,
  matchCounsel,
  reserveConsult,
} from "~/services/counsel";

export const useMatchCounsel = (
  options?: UseMutationOptions<BaseResponse<MatchCounselResponse>, HTTPError, MatchCounselRequest>
) => {
  return useMutation<BaseResponse<MatchCounselResponse>, HTTPError, MatchCounselRequest>({
    mutationFn: matchCounsel,
    ...options,
  });
};

export const useChangeMatchCounsel = (
  options?: UseMutationOptions<
    BaseResponse<MatchCounselResponse>,
    HTTPError,
    ChangeMatchCounselRequest
  >
) => {
  return useMutation({
    mutationFn: changeMatchCounsel,
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
  return useMutation({
    mutationFn: reserveConsult,
    ...options,
  });
};

export const useChangeReserveConsult = (
  options?: UseMutationOptions<
    BaseResponse<ReserveConsultResponse>,
    HTTPError,
    ChangeReserveConsultRequest
  >
) => {
  return useMutation({
    mutationFn: changeReserveConsult,
    ...options,
  });
};
