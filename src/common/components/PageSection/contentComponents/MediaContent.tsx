import React, { useState, MouseEvent } from 'react';
import { IWorkSection } from '../../../../models/pageData.model';
import { slugify } from '../../../utils/slugify';
import Carousel from '../../Carousel';
import Modal from '../../Modal';
import TranslateByMousePosition from '../../TranslateByMousePosition';

interface IWorkComponentProps {
    body: IWorkSection[];
}

export default function MediaContent({
    body,
}:IWorkComponentProps) {
    return (
        <div className="page-section__media">
            {body.map((workSection: IWorkSection) => (
                <MediaItem
                    type={workSection.type}
                    description={workSection.description}
                    images={workSection.images}
                    coverImage={workSection.coverImage}
                />
            ))}
        </div>
    );
}

function MediaItem({
    type,
    description,
    coverImage,
    images }
: IWorkSection) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    function handleClick(e:MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();

        setModalOpen(true);
    }

    function closeModal():void {
        setModalOpen(false);
    }
    return (
        <TranslateByMousePosition
            key={`home-page-section-${slugify(type)}`}
            className="page-section__media__item"
            modifier={20}
            onHover
        >
            <button
                onClick={handleClick}
                className="page-section__media__item__toggle"
                type="button"
            >
                <img
                    className="page-section__media__item__image"
                    alt=""
                    src={coverImage}
                />
                <header className="page-section__media__item__header">
                    <h4 className="page-section__media__item__title">
                        {type}
                    </h4>
                    <span className="page-section__media__item__more">
                        Toon meer <strong className="more-plus">+</strong>
                    </span>
                </header>
            </button>
            <Modal
                id={`${type}-modal`}
                isOpen={modalOpen}
                onRequestClose={closeModal}
                className="workModal"
            >
                <div className="workModal__inner">
                    <Carousel
                        items={images}
                        type={type}
                    />
                </div>
                <aside className="workModal__aside">
                    <h4 className="workModal__type-title">
                        {type}
                    </h4>
                    <p className="workModal__type-description">
                        {description}
                    </p>
                </aside>
            </Modal>

        </TranslateByMousePosition>
    );
}
