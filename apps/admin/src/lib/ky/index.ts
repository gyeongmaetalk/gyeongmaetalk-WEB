import { redirect, RedirectType } from "next/navigation";

import type { UserResponse } from "@/models/auth";
import { removeCookie } from "@/utils/cookie";
import { instance } from "@gyeongmaetalk/lib/ky";
import type { BaseResponse } from "@gyeongmaetalk/types";

// 토큰 갱신 락 및 Promise 관리
let refreshPromise: Promise<void> | null = null;
let isRefreshing = false;

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const adminBaseUrl = baseUrl + "/admin";

const refreshAccessToken = async (): Promise<void> => {
  // 이미 refresh 중이면 기존 Promise 반환
  if (refreshPromise) {
    return;
  }

  // refresh 시작
  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      await instance
        .post<BaseResponse<UserResponse>>(baseUrl + "/auth/refresh", {
          credentials: "include",
        })
        .json<BaseResponse<UserResponse>>();
    } catch (error) {
      console.error("Refresh 실패", error);
      await removeCookie("loggedIn");
      redirect("/", RedirectType.replace);
    } finally {
      // refresh 완료 후 상태 초기화
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return;
};

export const baseApi = instance.extend({
  prefixUrl: baseUrl,
  credentials: "include",
  hooks: {
    beforeRequest: [
      async () => {
        // refresh 중이면 완료될 때까지 대기
        if (isRefreshing && refreshPromise) {
          await refreshPromise;
        }

        // 클라이언트측에서 필요한 헤더 추가 (예: 인증 토큰)
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        // 응답 처리 로직 (예: 토큰 갱신)
        if (response.status === 401 || response.status === 500) {
          // 토큰 갱신 (이미 진행 중이면 기존 Promise 사용)
          await refreshAccessToken();

          // 새로운 토큰으로 기존 요청 재시도
          return instance(request);
        }

        return response;
      },
    ],
  },
});

export const api = baseApi.extend({
  prefixUrl: adminBaseUrl,
});
