import { useQuery } from "@gyeongmaetalk/lib/tanstack";

import { counselKeys } from "~/lib/tanstack/keys/counsel";
import { useUserStore } from "~/lib/zustand/user";
import type { AvailableTimesRequest } from "~/models/counsel";
import { getAvailableTimes, getCounselInfo, getReservedCounselData } from "~/services/counsel";

export const useGetAvailableTimes = (props: AvailableTimesRequest) => {
  return useQuery({
    queryKey: counselKeys.getAvailableTimes(props),
    queryFn: () => getAvailableTimes(props),
    select: (data) => data.result,
    enabled: !!props.date,
  });
};

export const useCheckCounselStatus = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return useQuery({
    queryKey: counselKeys.getReservedCounselData(),
    queryFn: getReservedCounselData,
    select: (data) => data.result,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetCounselInfo = (counselorId: string | null) => {
  return useQuery({
    queryKey: counselKeys.getCounselInfo(counselorId as string),
    queryFn: () => getCounselInfo(counselorId as string),
    select: (data) => data.result,
    enabled: !!counselorId,
  });
};
