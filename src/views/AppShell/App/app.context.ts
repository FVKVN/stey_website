import { createContext, useContext } from 'react';
import { IPageData } from '../../../models/pageData.model';

export interface IUpdateCookieSettings {
    allowAnalytics: boolean;
    dismissedCookieConsent: boolean;
}

export interface IAppContextInterface {
    showCookieSettings: boolean;
    setShowCookieSettings: (showCookieSettings: boolean) => void;
    showPrivacyPolicy: boolean;
    setShowPrivacyPolicy: (showPrivacyPolicy: boolean) => void;
    updateCookieSettings: ({ allowAnalytics, dismissedCookieConsent }: IUpdateCookieSettings) => void;
    pageData: IPageData;
    setPageData: (newPageData: IPageData) => void;
}

export const defaultAppState: IAppContextInterface = {
    showCookieSettings: false,
    setShowCookieSettings: () => {},
    showPrivacyPolicy: false,
    setShowPrivacyPolicy: () => {},
    updateCookieSettings: () => {},
    pageData: {
        hasHero: false,
        theme: 'light',
        pageTitle: '',
        pageSubtitle: '',
        pageSections: [
            {
                type: 'default',
                pinned: false,
                fullWidth: false,
                theme: 'light',
                content: {
                    title: '',
                    body: [''],
                },
            },
        ],
    },
    setPageData: () => {},
};

export const AppContext = createContext<IAppContextInterface>(defaultAppState);
export const useAppContext = () => useContext(AppContext);
