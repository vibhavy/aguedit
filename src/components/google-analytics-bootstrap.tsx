import { GOOGLE_ANALYTICS_ID } from "../lib/analytics";

const CONSENT_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
window.gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 1000
});
window.gtag('js', new Date());
`;

export function GoogleAnalyticsBootstrap() {
  return (
    <>
      <script
        id="ga-consent-default"
        dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }}
      />
      <script
        id="google-analytics"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
      />
    </>
  );
}
