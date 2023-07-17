/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { injectGTMinHead, logCookieSettings, removeGTMfromHead } from '../../../common/utils/analytics/analytics';
import { LOCAL_STORAGE_ALLOW_ANALYTICS_KEY, LOCAL_STORAGE_CONSENT_KEY } from '../../../config/state.config';
import { AppContext, defaultAppState, IAppContextInterface, IUpdateCookieSettings } from './app.context';
import AppHud from '../AppHud';
import CookieConsent from '../CookieConsent';
import CookiesModal from '../CookiesModal';
import AppRouter from '../AppRouter';
import PrivacyPolicyModal from '../PrivacyPolicyModal';
import AppFooter from '../AppFooter';
import 'focus-visible';

function App() {
    const containerRef = useRef<HTMLDivElement>(null!);
    const [allowAnalytics, setAllowAnalytics] = useLocalStorage<boolean>(LOCAL_STORAGE_ALLOW_ANALYTICS_KEY, false);
    const [, setCookieConsent] = useLocalStorage<boolean>(LOCAL_STORAGE_CONSENT_KEY, false);
    const [showCookieSettings, setShowCookieSettings] = useState(defaultAppState.showCookieSettings);
    const [pageData, setPageData] = useState(defaultAppState.pageData);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(defaultAppState.showPrivacyPolicy);

    if (allowAnalytics) {
        injectGTMinHead();
    }

    const defaultAppContextValues = useMemo<IAppContextInterface>(() => {
        const updateCookieSettings = ({
            allowAnalytics: shouldAllowAnalytics,
            dismissedCookieConsent,
        }: IUpdateCookieSettings) => {
            setAllowAnalytics(shouldAllowAnalytics);
            setCookieConsent(dismissedCookieConsent);

            if (shouldAllowAnalytics) {
                injectGTMinHead();
            } else {
                removeGTMfromHead();
            }

            logCookieSettings({
                functional_cookie: true, // = always true
                analyzing_cookie: shouldAllowAnalytics,
            });
        };

        return {
            containerRef,
            showCookieSettings,
            setShowCookieSettings,
            showPrivacyPolicy,
            setShowPrivacyPolicy,
            updateCookieSettings,
            pageData,
            setPageData,
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCookieSettings, pageData]);
    return (
        <AppContext.Provider value={defaultAppContextValues}>
            <div className="App" ref={containerRef}>
                <AppHud />
                <AppRouter />
                <AppFooter />
                <CookieConsent />
                <CookiesModal isOpen={showCookieSettings} onRequestClose={() => setShowCookieSettings(false)} />
                <PrivacyPolicyModal isOpen={showPrivacyPolicy} onRequestClose={() => setShowPrivacyPolicy(false)} />
            </div>
        </AppContext.Provider>
    );
}

export default App;
