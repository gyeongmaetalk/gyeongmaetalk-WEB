import mixpanel from "mixpanel-browser";

import { ENV } from "~/constants/env";
import {
  MIXPANEL_EVENT,
  type MixpanelEventName,
  type MixpanelEventPropertiesMap,
} from "~/lib/analytics/mixpanel-events";

const isProduction = ENV.IS_PROD;

let isMixpanelInitialized = false;
const PLATFORM_TYPE = "web";

export function initMixpanel() {
  if (isMixpanelInitialized || typeof window === "undefined") {
    return;
  }

  mixpanel.init("c32b81de65f6bb334a6cb411325572d2", {
    debug: !isProduction,
    record_sessions_percent: 100,
    track_pageview: false,
    persistence: "localStorage",
  });

  mixpanel.register({
    platform_type: PLATFORM_TYPE,
  });

  isMixpanelInitialized = true;
}

export function buildCommonEventProperties(loginCheck: boolean) {
  initMixpanel();
  return {
    login_check: loginCheck,
    platform_type: PLATFORM_TYPE,
    uuid: mixpanel.get_distinct_id(),
  };
}

export function identifyMixpanelUser(distinctId: string) {
  initMixpanel();
  mixpanel.identify(distinctId);
}

export function setMixpanelUserProfile(properties: Record<string, string | number | boolean>) {
  initMixpanel();
  mixpanel.people.set(properties);
}

export function resetMixpanel() {
  mixpanel.reset();
}

export function trackMixpanelEvent<E extends MixpanelEventName>(
  eventName: E,
  properties?: MixpanelEventPropertiesMap[E]
) {
  initMixpanel();
  mixpanel.track(eventName, properties);
}

export function trackMixpanelAppDownloadClicked(positionLabel: string) {
  trackMixpanelEvent(MIXPANEL_EVENT.APP_DOWNLOAD_CLICKED, {
    position: positionLabel,
    platform_type: PLATFORM_TYPE,
  });
}
