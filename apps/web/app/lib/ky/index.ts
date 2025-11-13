import { instance } from "@gyeongmaetalk/lib/ky";
import type { BaseResponse } from "@gyeongmaetalk/types";

import type { UserResponse } from "~/models/auth";
import { baseUrl } from "~/utils/env";

import { resetUserQueries } from "../tanstack";
import { useAccessTokenStore, useRefreshTokenStore, useUserStore } from "../zustand/user";

export const api = instance.extend({
  prefixUrl: baseUrl,
  hooks: {
    beforeRequest: [
      async (request) => {
        // 클라이언트측에서 필요한 헤더 추가 (예: 인증 토큰)
        const accessToken = useAccessTokenStore.getState().accessToken;
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 응답 처리 로직 (예: 토큰 갱신)
        if (response.status === 401 || response.status === 500) {
          const refreshToken = useRefreshTokenStore.getState().refreshToken;

          if (refreshToken) {
            try {
              const refreshResponse = await instance
                .post<BaseResponse<UserResponse>>(baseUrl + "/auth/refresh", {
                  headers: { RefreshToken: refreshToken },
                })
                .json<BaseResponse<UserResponse>>();

              useRefreshTokenStore.setState({ refreshToken: refreshResponse.result.refreshToken });
              useAccessTokenStore.setState({ accessToken: refreshResponse.result.accessToken });

              // 새로운 토큰으로 기존 요청 재시도
              request.headers.set("Authorization", `Bearer ${refreshResponse.result.accessToken}`);
              return instance(request);
            } catch (error) {
              console.error("Refresh 실패", error);
              useAccessTokenStore.setState({ accessToken: null });
              useRefreshTokenStore.setState({ refreshToken: null });
              useUserStore.setState({ user: null });
              localStorage.clear();
              resetUserQueries();
              window.location.href = "/login";
            }
          }
        }

        return response;
      },
    ],
  },
});
