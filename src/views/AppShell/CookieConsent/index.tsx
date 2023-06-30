import { useLocalStorage } from 'usehooks-ts';
import Button from '../../../common/components/Button';
import Modal from '../../../common/components/Modal';
import OutgoingLink from '../../../common/components/OutgoingLink';
import { LOCAL_STORAGE_CONSENT_KEY } from '../../../config/state.config';
import { useAppContext } from '../App/app.context';
import './cookie-consent.scss';

const CLASS_NAME = 'CookieConsent';

function CookieConsent() {
    const { showCookieSettings, setShowCookieSettings } = useAppContext();
    const [dismissedCookieConsent] = useLocalStorage<boolean>(LOCAL_STORAGE_CONSENT_KEY, false);
    const { updateCookieSettings } = useAppContext();

    const onShowCookieSettings = () => {
        if (typeof setShowCookieSettings === 'function') {
            setShowCookieSettings(true);
        }
    };

    const acceptAll = () => {
        updateCookieSettings({
            dismissedCookieConsent: true,
            allowAnalytics: true,
        });
    };

    return (
        <Modal
            id="cookie-banner"
            isOpen={!dismissedCookieConsent && !showCookieSettings}
            className={CLASS_NAME}
            disableCloseOnOverlayClick
            hideCloseButton
        >
            <p>
                Deze website gebruikt cookies voor analysedoeleinden.
                {' '}
                <OutgoingLink href="https://www.delijn.be/nl/content/privacy/">
                    Bekijk ons privacybeleid
                </OutgoingLink>
                .
            </p>
            <div className={`${CLASS_NAME}__actions`}>
                <Button id="cookie-consent-settings" typeName="text" onClick={onShowCookieSettings}>
                    Cookie-instellingen
                </Button>
                <Button id="cookie-consent-allow-all" typeName="primary" onClick={acceptAll}>
                    Alle cookies accepteren
                </Button>
            </div>
        </Modal>
    );
}

export default CookieConsent;
