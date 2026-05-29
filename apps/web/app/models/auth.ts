import type { AuctionStatus, AuthProvider } from "~/constants";

export interface UserResponse {
  memberId: number;
  accessToken: string;
  refreshToken: string;
}

export interface SignupResponse {
  memberId: number;
}

export interface MyInfoResponse {
  name: string | null;
  loginType: AuthProvider;
  cellPhone: string | null;
  birth: string | null;
  auctionStatus: AuctionStatus | null;
}

export interface UpdateNotificationSettingRequest {
  reviewNotificationEnabled: boolean;
  propertyNotificationEnabled: boolean;
}

export type RequestReviewLoginCodeRequest = {
  username: string;
  password: string;
};
