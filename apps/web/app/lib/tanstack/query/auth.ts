import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useQuery } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { AUTH } from "~/constants/auth";
import { useUserStore } from "~/lib/zustand/user";
import type { MyInfoResponse } from "~/models/auth";
import { getMyInfo } from "~/services/auth";

export const useGetMyInfo = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return useQuery<BaseResponse<MyInfoResponse>, HTTPError, MyInfoResponse>({
    queryKey: [AUTH.MY_INFO],
    queryFn: getMyInfo,
    select: (data) => data.result,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
  });
};
