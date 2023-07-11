import React, { ReactElement } from 'react';
import { IWorkSection } from '../../../../models/pageData.model';
import { slugify } from '../../../utils/slugify';

interface IWorkComponentProps {
    body: IWorkSection[];
}

export default function MediaContent({
    body,
}:IWorkComponentProps): ReactElement {
    return (
        <div className="page-section__media">
            {body.map((workSection: IWorkSection) => (
                <article
                    key={`home-page-section-${slugify(workSection.type)}`}
                    className="page-section__media__item"
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
                </article>

            ))}
        </div>
    );
}
