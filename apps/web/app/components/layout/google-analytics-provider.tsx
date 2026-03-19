import { ENV } from "~/constants/env";

const GA_MEASUREMENT_ID = "G-1LY8HR04EV";

export function GoogleAnalyticsScript() {
  return ENV.IS_PROD ? (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  ) : null;
}
