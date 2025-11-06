import type { HTTPError } from "@gyeongmaetalk/lib/ky";
import { useQuery } from "@gyeongmaetalk/lib/tanstack";
import type { BaseResponse } from "@gyeongmaetalk/types";

import { AUTH } from "~/constants/auth";
import { useRefreshTokenStore } from "~/lib/zustand/user";
import type { MyInfoResponse } from "~/models/auth";
import { getMyInfo } from "~/services/auth";

export const useGetMyInfo = () => {
  const refreshToken = useRefreshTokenStore((state) => state.refreshToken);

  return useQuery<BaseResponse<MyInfoResponse>, HTTPError, MyInfoResponse>({
    queryKey: [AUTH.MY_INFO],
    queryFn: getMyInfo,
    select: (data) => data.result,
    enabled: !!refreshToken,
    staleTime: 1000 * 60 * 5,
  });
};
