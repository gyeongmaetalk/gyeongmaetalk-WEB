import mixpanel from "mixpanel-browser";

const isProduction = process.env.NODE_ENV === "production";

mixpanel.init("c32b81de65f6bb334a6cb411325572d2", {
  debug: !isProduction,
  record_sessions_percent: 100,
  track_pageview: true,
  persistence: "localStorage",
});

export default function MixpanelProvider() {
  return null;
}
