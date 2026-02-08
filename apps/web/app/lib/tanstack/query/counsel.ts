import { useQuery } from "@gyeongmaetalk/lib/tanstack";

import { COUNSEL } from "~/constants";
import { useUserStore } from "~/lib/zustand/user";
import type { AvailableTimesRequest } from "~/models/counsel";
import { getAvailableTimes, getCounselInfo, getReservedCounselData } from "~/services/counsel";

export const useGetAvailableTimes = (props: AvailableTimesRequest) => {
  return useQuery({
    queryKey: [COUNSEL.AVAILABLE_TIMES, props.counselorId, props.date],
    queryFn: () => getAvailableTimes(props),
    select: (data) => data.result,
    enabled: !!props.date,
  });
};

export const useCheckCounselStatus = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return useQuery({
    queryKey: [COUNSEL.COUNSEL_STATUS],
    queryFn: getReservedCounselData,
    select: (data) => data.result,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetCounselInfo = (counselorId: string | null) => {
  return useQuery({
    queryKey: [COUNSEL.COUNSEL_INFO, counselorId],
    queryFn: () => getCounselInfo(counselorId as string),
    select: (data) => data.result,
    enabled: !!counselorId,
  });
};
