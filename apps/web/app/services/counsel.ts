import type { BaseResponse } from "@gyeongmaetalk/types";

import { api } from "~/lib/ky";
import type {
  ChangeMatchCounselRequest,
  ChangeReserveConsultRequest,
  CounselInfoResponse,
  MatchCounselRequest,
  MatchCounselResponse,
  ReserveConsultRequest,
  ReserveConsultResponse,
  ReservedCounselDataResponse,
} from "~/models/counsel";

export const matchCounsel = async (
  props: MatchCounselRequest
): Promise<BaseResponse<MatchCounselResponse>> => {
  return api.post("counsels/matches", { json: props }).json();
};

export const changeMatchCounsel = async (
  props: ChangeMatchCounselRequest
): Promise<BaseResponse<MatchCounselResponse>> => {
  const { counselFormId, ...restProps } = props;
  return api.patch(`counsels/${counselFormId}`, { json: restProps }).json();
};

export const getAvailableTimes = async (props: {
  counseldorId: number;
  date: string;
}): Promise<BaseResponse<string[]>> => {
  return api
    .get(`counsels/${props.counseldorId}/times`, { searchParams: { date: props.date } })
    .json();
};

export const reserveConsult = async (
  props: ReserveConsultRequest
): Promise<BaseResponse<ReserveConsultResponse>> => {
  const { counseldorId, ...restProps } = props;
  return api.post(`counsels/${counseldorId}`, { json: restProps }).json();
};

export const changeReserveConsult = async (
  props: ChangeReserveConsultRequest
): Promise<BaseResponse<ReserveConsultResponse>> => {
  const { counselId, ...restProps } = props;
  return api.patch(`counsels/${counselId}/update`, { searchParams: restProps }).json();
};

export const getReservedCounselData = async (): Promise<
  BaseResponse<ReservedCounselDataResponse>
> => {
  return api.get("counsels/info").json();
};

export const getCounselInfo = async (
  counselorId: string
): Promise<BaseResponse<CounselInfoResponse>> => {
  return api.get(`counselor/${counselorId}`).json();
};
