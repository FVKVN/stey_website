import { GTM_ELEMENT_ID } from '../../../config/dom.config';
import { LOCAL_STORAGE_ALLOW_ANALYTICS_KEY } from '../../../config/state.config';

const GTM_ID = 'GTM-KXPQWVM';
const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

declare let dataLayer: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any

export function injectGTMinHead() {
    if (!document.getElementById(GTM_ELEMENT_ID)) {
        const script = document.createElement('script');
        script.id = GTM_ELEMENT_ID;
        script.type = 'text/javascript';
        script.text = GTM_SCRIPT;

        document.getElementsByTagName('head')[0].appendChild(script);
    }
}

export function removeGTMfromHead() {
    const gtmScript = document.getElementById(GTM_ELEMENT_ID);

    if (gtmScript) {
        gtmScript?.parentNode?.removeChild(gtmScript);
    }
}

/**
 * GTM = Google Tag Manager
 */
function sendEventToGTM({
    event = 'event',
    category,
    value,
    customData = {},
}: {
    event?: string;
    category?: string;
    value?: string;
    customData?: object;
}) {
    if (process.env.NODE_ENV === 'test') {
        return;
    }
    const hasAllowedAnalytics = localStorage.getItem(LOCAL_STORAGE_ALLOW_ANALYTICS_KEY) === 'true';

    if (!hasAllowedAnalytics) {
        return;
    }

    dataLayer.push({
        event,
        ...(category) && { category },
        ...(value) && { value },
        ...customData,
    });
}

export function logButtonClick({ buttonId }: { buttonId: string }) {
    sendEventToGTM({
        event: 'button',
        customData: {
            buttonName: buttonId,
        },
    });
}

export function logCookieSettings({ functional_cookie, analyzing_cookie }: {
    functional_cookie: boolean;
    analyzing_cookie: boolean;
}) {
    sendEventToGTM({
        event: 'enableCookie',
        customData: {
            attributes: {
                functional_cookie: functional_cookie ? 'true' : 'false',
                analyzing_cookie: analyzing_cookie ? 'true' : 'false',
            },
        },
    });
}
