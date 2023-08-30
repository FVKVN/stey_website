import React, { ReactElement, MouseEvent, useState } from 'react';
import { IExpoSection, IExpoSectionDefault } from '../../../../models/pageData.model';
import { slugify } from '../../../utils/slugify';
import Carousel from '../../Carousel';
import Modal from '../../Modal';
import TranslateByMousePosition from '../../TranslateByMousePosition';

interface IEventComponentProps {
    body: IExpoSection;
}

interface IRenderItemProps {
    item: IExpoSectionDefault;
    isPast: boolean;
}

export default function EventContent({ body }:IEventComponentProps): ReactElement {
    const { upcoming, past } = body;
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleClick(e:MouseEvent<HTMLButtonElement>):void {
        e.preventDefault();

        setModalOpen(true);
    }

    function closeModal():void {
        setModalOpen(false);
    }

    function renderItem(props : IRenderItemProps) {
        return (
            <TranslateByMousePosition
                key={`${slugify(props.item.location)}-${slugify(props.item.startDate)}`}
                className="page-section__expo__type__item"
                modifier={20}
                onHover
            >
                <button
                    onClick={handleClick}
                    className="page-section__expo__type__item__toggle"
                    type="button"
                >
                    <img
                        className="page-section__expo__type__item__image"
                        alt=""
                        src={props.item.coverImage}
                    />
                    <div className="page-section__expo__item__content">
                        <div className="page-section__expo__item__content__inner">
                            <h5 className="page-section__expo__item__title">
                                {props.item.location}
                            </h5>
                            <p>van: <strong>{props.item.startDate}</strong></p>
                            <p>tot: <strong>{props.item.endDate}</strong></p>
                        </div>
                        { props.isPast && (
                            <p className="text--right">Bekijk alle beelden <strong className="more-plus">+</strong></p>
                        )}
                    </div>
                </button>
                <Modal
                    id={`${slugify(props.item.location)}-modal`}
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                >
                    <Carousel
                        items={props.item.images}
                        type={slugify(props.item.location)}
                    />
                </Modal>
            </TranslateByMousePosition>

        );
    }

    return (
        <div className="page-section__expo">
            <div className="page-section__expo__type">
                <h4 className="page-section__expo__type__title">
                    Toekomstige tentoonstellingen
                </h4>
                <div className="page-section__expo__type__items">
                    { upcoming.length === 0 && (
                        <article className="page-section__expo__type__item page-section__expo__type__item--stretch">
                            <div className="page-section__expo__item__content">
                                <h4>Er zijn geen tentoonstellingen gepland.</h4>
                                <p>
                                    Hou deze site in de gaten, of vul het contact formulier
                                    onderaan deze pagina in om op de hoogte te blijven.
                                </p>
                            </div>
                        </article>
                    )}
                    { upcoming.length > 0 && upcoming.map((expoSection) => renderItem({
                        item: expoSection,
                        isPast: false,
                    }))}
                </div>
            </div>
            <div className="page-section__expo__type">
                <h4 className="page-section__expo__type__title">
                    Afgelopen tentoonstellingen
                </h4>
                <div className="page-section__expo__type__items">
                    { past.length > 0 && past.map((expoSection) => renderItem({
                        item: expoSection,
                        isPast: true,
                    }))}
                </div>
            </div>

        </div>
    );
}
