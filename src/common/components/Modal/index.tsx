import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import './modal.scss';
import Button from '../Button';
import { ReactComponent as CloseIcon } from '../../../assets/svg/icons/icon-cross.svg';

interface IPublicProps {
    id: string;
    isOpen: boolean;
    onRequestClose?: () => void;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    overlayClassName?: string;
    disableCloseOnOverlayClick?: boolean;
    hideCloseButton?: boolean;
    type?: 'wide';
}

const CLASS_NAME = 'modal';

export default function Modal({
    id,
    isOpen,
    onRequestClose,
    children,
    className,
    overlayClassName,
    contentClassName,
    disableCloseOnOverlayClick,
    hideCloseButton,
    type,
}: IPublicProps) {
    ReactModal.setAppElement('#root');

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={classNames(CLASS_NAME, className, { wide: type === 'wide' })}
            overlayClassName={classNames('Overlay', overlayClassName)}
            contentLabel="Example Modal"
            bodyOpenClassName="ReactModal__Body--open"
            shouldCloseOnOverlayClick={!disableCloseOnOverlayClick}
        >
            <>
                {!hideCloseButton && (
                    <div className={`${CLASS_NAME}__header`}>
                        <Button
                            id={`close-modal-${id}`}
                            className={`${CLASS_NAME}__close-button`}
                            onClick={onRequestClose}
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                )}
                <div className={classNames(`${CLASS_NAME}__content`, contentClassName)}>
                    {children}
                </div>
            </>
        </ReactModal>
    );
}
