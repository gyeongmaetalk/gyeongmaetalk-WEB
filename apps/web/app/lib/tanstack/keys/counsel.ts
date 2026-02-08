import type { AvailableTimesRequest } from "~/models/counsel";

export const counselKeys = {
  all: ["counsel"] as const,
  getAvailableTimes: (props: AvailableTimesRequest) =>
    [...counselKeys.all, "getAvailableTimes", props.counselorId, props.date] as const,
  getReservedCounselData: () => [...counselKeys.all, "getReservedCounselData"] as const,
  getCounselInfo: (counselorId: string) =>
    [...counselKeys.all, "getCounselInfo", counselorId] as const,
};
