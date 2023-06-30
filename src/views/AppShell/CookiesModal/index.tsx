import { useState, FormEvent, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import './cookies-modal.scss';
import Modal from '../../../common/components/Modal';
import { LOCAL_STORAGE_ALLOW_ANALYTICS_KEY } from '../../../config/state.config';
import Button from '../../../common/components/Button';
import Checkbox from '../../../common/components/Checkbox';
import OutgoingLink from '../../../common/components/OutgoingLink';
import { useAppContext } from '../App/app.context';

function CookiesModal({ isOpen, onRequestClose }: { isOpen: boolean; onRequestClose: () => void }) {
    const [allowAnalytics] = useLocalStorage<boolean>(LOCAL_STORAGE_ALLOW_ANALYTICS_KEY, false);
    const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState<boolean>(!!allowAnalytics);
    const { updateCookieSettings } = useAppContext();

    const closeModal = () => {
        if (typeof onRequestClose === 'function') {
            onRequestClose();
        }
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        updateCookieSettings({
            dismissedCookieConsent: true,
            allowAnalytics: isAnalyticsAllowed,
        });

        closeModal();
    };

    const acceptAll = () => {
        updateCookieSettings({
            dismissedCookieConsent: true,
            allowAnalytics: true,
        });

        closeModal();
    };

    useEffect(() => {
        if (isOpen) {
            setIsAnalyticsAllowed(allowAnalytics);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <Modal id="cookie-settings" isOpen={isOpen} onRequestClose={onRequestClose} className="CookiesModal">
            <h2>Voorkeurenmenu</h2>
            <p>
                Wanneer u een website bezoekt, kan er informatie in uw browser worden opgeslagen of eruit worden
                opgehaald, voornamelijk in de vorm van cookies. Deze informatie kan over u, uw voorkeuren of uw apparaat
                zijn en wordt voornamelijk gebruikt om de website correct te laten werken. De informatie identificeert u
                normaal gesproken niet direct, maar kan u een beter op uw voorkeuren toegesneden surfervaring geven.
                Omdat we uw recht op privacy respecteren, kunt u er voor kiezen sommige soorten cookies te blokkeren.
                Klik op de namen voor de verschillende categorieën voor meer informatie en om onze standaardinstellingen
                te wijzigen. Weest u zich er echter wel van bewust dat het blokkeren van sommige soorten cookies uw
                ervaring van de website en de door ons aangeboden diensten nadelig kan beïnvloeden.
                <br />
                <OutgoingLink href="https://www.delijn.be/nl/voettekst/privacy.html">Meer informatie</OutgoingLink>
            </p>
            <p>
                <Button id="cookie-settings-allow-all" typeName="primary" onClick={acceptAll}>
                    Alle toestaan
                </Button>
            </p>
            <form name="cookie-settings" noValidate onSubmit={onSubmit} className="CookiesModal__settings">
                <h3>Strikt noodzakelijke cookies</h3>
                <div>
                    <Checkbox id="functional" name="functional" checked disabled onChange={() => {}} toggleButton>
                        Altijd aan
                    </Checkbox>
                </div>
                <p>
                    Deze cookies zijn nodig om de website te gebruiken en kunnen daarom niet uitgeschakeld worden.
                    Voorbeelden hiervan zijn het instellen van jouw privacy voorkeuren, inloggen met jouw account of een
                    formulier invullen en dat u onze YouTube-video&apos;s kan bekijken. je kan deze cookies eventueel
                    via jouw browser zelf blokkeren, maar dan zal de website mogelijk niet meer werken zoals verwacht.
                    Deze cookies slaan geen persoonlijk identificeerbare informatie op.
                </p>

                <h3>Prestatiecookies</h3>
                <div>
                    <Checkbox
                        id="analytics"
                        name="analytics"
                        checked={isAnalyticsAllowed}
                        onChange={(e) => setIsAnalyticsAllowed(e.currentTarget.checked)}
                        toggleButton
                    >
                        {isAnalyticsAllowed ? 'Aan' : 'Uit'}
                    </Checkbox>
                </div>
                <p>
                    Deze cookies helpen ons om statistieken over bezoekers te verzamelen en het gebruik van de website
                    te analyseren. Ze helpen ons te begrijpen welke pagina&rsquo;s het meest en minst populair zijn en
                    hoe bezoekers door de website navigeren. Alle informatie die deze cookies verzamelen wordt opgeteld
                    over bezoekers heen en is daarom anoniem.
                </p>
                <p className="CookiesModal__settings__action">
                    <Button id="save-cookie-settings" typeName="primary" submit={{ formName: 'cookie-settings' }}>
                        Mijn keuzes bevestigen
                    </Button>
                </p>
            </form>
        </Modal>
    );
}

export default CookiesModal;
