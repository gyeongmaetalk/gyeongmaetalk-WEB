import mixpanel from "mixpanel-browser";

import { ENV } from "~/constants/env";

const isProduction = ENV.IS_PROD;

if (isProduction) {
  mixpanel.init("c32b81de65f6bb334a6cb411325572d2", {
    record_sessions_percent: 100,
    track_pageview: true,
    persistence: "localStorage",
  });
}

export default function MixpanelProvider() {
  return null;
}
