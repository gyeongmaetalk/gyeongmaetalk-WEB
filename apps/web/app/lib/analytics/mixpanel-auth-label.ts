import { AuthProvider } from "~/constants";

export function getMixpanelAuthMethodLabel(loginType: AuthProvider): string {
  if (loginType === AuthProvider.KAKAO) {
    return "카카오";
  }
  return "애플";
}
