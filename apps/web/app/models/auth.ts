import type { AuthProvider } from "~/constants";

export interface UserResponse {
  memberId: number;
  accessToken: string;
  refreshToken: string;
}

export interface SignupResponse {
  memberId: number;
}

export interface MyInfoResponse {
  name: string;
  loginType: AuthProvider;
  cellPhone: string;
  birth: string;
  auctionStatus: boolean;
}

export interface UpdateNotificationSettingRequest {
  reviewNotificationEnabled: boolean;
  propertyNotificationEnabled: boolean;
}
