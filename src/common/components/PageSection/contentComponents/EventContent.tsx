import React, { ReactElement } from 'react';
import { IExpoSection, IExpoSectionDefault } from '../../../../models/pageData.model';
import { slugify } from '../../../utils/slugify';

interface IEventComponentProps {
    body: IExpoSection;
}

interface IRenderItemProps {
    item: IExpoSectionDefault;
    isPast: boolean;
}

export default function EventContent({ body }:IEventComponentProps): ReactElement {
    const { upcoming, past } = body;

    function renderItem(props : IRenderItemProps) {
        return (
            <article
                key={`${slugify(props.item.location)}-${slugify(props.item.startDate)}`}
                className="page-section__expo__type__item"
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
            </article>
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
