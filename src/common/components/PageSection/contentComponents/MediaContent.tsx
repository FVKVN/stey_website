import React, { ReactElement, useState, MouseEvent } from 'react';
import { IWorkSection } from '../../../../models/pageData.model';
import { slugify } from '../../../utils/slugify';
import Carousel from '../../Carousel';
import Modal from '../../Modal';

interface IWorkComponentProps {
    body: IWorkSection[];
}

export default function MediaContent({
    body,
}:IWorkComponentProps): ReactElement {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleClick(e:MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();

        setModalOpen(true);
    }

    function closeModal():void {
        setModalOpen(false);
    }

    return (
        <div className="page-section__media">
            {body.map((workSection: IWorkSection) => (
                <article
                    key={`home-page-section-${slugify(workSection.type)}`}
                    className="page-section__media__item"
                >
                    <button
                        onClick={handleClick}
                        className="page-section__media__item__toggle"
                        type="button"
                    >
                        <img
                            className="page-section__media__item__image"
                            alt=""
                            src={workSection.coverImage}
                        />
                        <header className="page-section__media__item__header">
                            <h4 className="page-section__media__item__title">
                                {workSection.type}
                            </h4>
                            <span className="page-section__media__item__more">
                                Toon meer <strong className="more-plus">+</strong>
                            </span>
                        </header>
                    </button>
                    <Modal
                        id={`${workSection.type}-modal`}
                        isOpen={modalOpen}
                        onRequestClose={closeModal}
                    >
                        <Carousel
                            items={workSection.images}
                            type={workSection.type}
                        />
                    </Modal>
                </article>
            ))}
        </div>
    );
}
