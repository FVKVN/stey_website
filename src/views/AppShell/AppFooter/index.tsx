import React from 'react';

import './app-footer.scss';
import Button from '../../../common/components/Button';
import { useAppContext } from '../App/app.context';

const baseClass = 'app-footer';
export default function AppFooter() {
    const {
        setShowCookieSettings,
        setShowPrivacyPolicy,
    } = useAppContext();

    const onShowCookieSettings = () => {
        if (typeof setShowCookieSettings === 'function') {
            setShowCookieSettings(true);
        }
    };

    const onShowPrivacyPolicy = () => {
        if (typeof setShowPrivacyPolicy === 'function') {
            setShowPrivacyPolicy(true);
        }
    };

    return (
        <footer className={baseClass}>
            <div className={`${baseClass}__inner`}>
                <p className={`${baseClass}__item`}>
                    © Firmin Steyaert - {new Date().getFullYear()}
                </p>
                <p className={`${baseClass}__item`}>
                    <Button
                        id="cookie-consent-settings-footer"
                        typeName="text"
                        onClick={onShowCookieSettings}
                    >
                        Cookie-instellingen
                    </Button>
                    <Button
                        id="show-privacy-policy"
                        className={`${baseClass}__privacy-policy`}
                        typeName="text"
                        onClick={onShowPrivacyPolicy}
                    >
                        Privacybeleid
                    </Button>
                </p>
                <p className={`${baseClass}__item`}>
                    Created by <a href="mailto:hey@fvkvn.be">FVKVN</a>
                </p>
            </div>
        </footer>
    );
}
