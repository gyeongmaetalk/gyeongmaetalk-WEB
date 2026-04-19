import { getMixpanelAuthMethodLabel } from "~/lib/analytics/mixpanel-auth-label";
import { setMixpanelUserProfile, trackMixpanelEvent } from "~/lib/analytics/mixpanel-client";
import { MIXPANEL_EVENT } from "~/lib/analytics/mixpanel-events";
import { useMixpanelSessionStore } from "~/lib/zustand/mixpanel-session";
import type { MyInfoResponse } from "~/models/auth";

const MIXPANEL_HAS_LOGGED_IN_STORAGE_KEY: string = "mixpanel_has_logged_in_before";
const MIXPANEL_LAST_LOGIN_ISO_STORAGE_KEY: string = "mixpanel_last_login_iso";

export function syncMixpanelAfterMyInfo(myInfo: MyInfoResponse): void {
  setMixpanelUserProfile({
    login_type: getMixpanelAuthMethodLabel(myInfo.loginType),
  });

  const { loginPending, setLoginPending } = useMixpanelSessionStore.getState();
  if (!loginPending) {
    return;
  }

  setLoginPending(false);

  const hasLoggedInBefore: string | null = localStorage.getItem(MIXPANEL_HAS_LOGGED_IN_STORAGE_KEY);
  const isFirstLogin: boolean = hasLoggedInBefore !== "1";
  localStorage.setItem(MIXPANEL_HAS_LOGGED_IN_STORAGE_KEY, "1");

  const lastLoginDate: string = new Date().toISOString();
  localStorage.setItem(MIXPANEL_LAST_LOGIN_ISO_STORAGE_KEY, lastLoginDate);

  trackMixpanelEvent(MIXPANEL_EVENT.LOGIN_COMPLETED, {
    auth_method: getMixpanelAuthMethodLabel(myInfo.loginType),
    is_first_login: isFirstLogin,
    last_login_date: lastLoginDate,
  });
}
