import { api } from "@/lib/ky";
import type { LoginRequest } from "@/models/auth";
import type { BaseResponse } from "@gyeongmaetalk/types";

export const login = async (props: LoginRequest): Promise<BaseResponse<void>> => {
  return api.post("auth/login", { searchParams: { ...props } }).json();
};
