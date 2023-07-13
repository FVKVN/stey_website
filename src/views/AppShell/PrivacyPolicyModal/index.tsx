import Modal from '../../../common/components/Modal';
import './privacy-policy-modal.scss';

function PrivacyPolicyModal({ isOpen, onRequestClose }: { isOpen: boolean; onRequestClose: () => void }) {
    return (
        <Modal id="privacy-policy" isOpen={isOpen} onRequestClose={onRequestClose} className="PrivacyPolicy">
            <h2>Privacy policy</h2>
        </Modal>
    );
}

export default PrivacyPolicyModal;
