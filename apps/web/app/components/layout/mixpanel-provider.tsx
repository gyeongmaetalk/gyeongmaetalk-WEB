import mixpanel from "mixpanel-browser";

mixpanel.init("c32b81de65f6bb334a6cb411325572d2", {
  autocapture: true,
  record_sessions_percent: 100,
});

export default function MixpanelProvider() {
  return null;
}
