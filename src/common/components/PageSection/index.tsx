/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-danger */
import React, { ReactElement } from 'react';
import {
    IExpoSection,
    IExpoSectionDefault,
    IPageSection,
    IWorkSection,
} from '../../../models/pageData.model';
import { slugify } from '../../utils/slugify';

interface IComponentProps {
    sectionData: IPageSection;
}

interface IWorkComponentProps {
    body: IWorkSection[];
}

interface IEventComponentProps {
    body: IExpoSection;
}

function PageSection({ sectionData }: IComponentProps) {
    const parentId = slugify(sectionData.content.title);

    return (
        <div id={parentId} className="page-section">
            <div className="page-section__content">
                <header className="page-section__header">
                    <h2 className="page-section__title">
                        {sectionData.content.title}
                    </h2>
                </header>
                { sectionData.content.image && (
                    <figure className="page-section__image">
                        <img src={sectionData.content.image} alt={sectionData.content.imageAlt} />
                    </figure>
                )}
                <div className="page-section__body">
                    { sectionData.content.subTitle !== '' && (
                        <h3 className="page-section__sub-title">
                            {sectionData.content.subTitle}
                        </h3>
                    )}
                    { renderContent(sectionData) }
                </div>
            </div>
        </div>
    );
}

function renderContent(
    sectionData: IPageSection,
): ReactElement | null {
    const { type } = sectionData;

    if (type === 'expo') {
        const { body } = sectionData.content;
        return <EventContent body={body as unknown as IExpoSection} />;
    }

    if (type === 'work') {
        const { body } = sectionData.content;
        return <MediaContent body={body as unknown as IWorkSection[]} />;
    }

    if (type === 'contact') {
        return <ContactContent />;
    }

    if (type === 'default') {
        const { body } = sectionData.content;
        return renderBlockContent(body as unknown as string[]);
    }

    return null;
}

function renderBlockContent(body:string[]): ReactElement {
    return (
        <>
            { body.map((bodyString, i) => (
                <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`text-content-${i}`}
                    dangerouslySetInnerHTML={{ __html: bodyString }}
                />
            ))}
        </>
    );
}

function MediaContent({
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
                            Toon meer &gt;
                        </span>
                    </header>
                </article>

            ))}
        </div>
    );
}

function EventContent({ body }:IEventComponentProps): ReactElement {
    const { upcoming, past } = body;

    function renderItem({
        item,
        isPast,
    }: {
        item: IExpoSectionDefault;
        isPast: boolean;
    }) {
        return (
            <article
                key={`${slugify(item.location)}-${slugify(item.startDate)}`}
                className="page-section__expo__type__item"
            >
                <img
                    className="page-section__expo__type__item__image"
                    alt=""
                    src={item.coverImage}
                />
                <div className="page-section__expo__item__content">
                    <h5 className="page-section__expo__item__title">
                        {item.location}
                    </h5>
                    <p>van: <strong>{item.startDate}</strong></p>
                    <p>tot: <strong>{item.endDate}</strong></p>
                    { isPast && (
                        <p className="text--right">Bekijk alle beelden &gt;</p>
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
                { upcoming.length === 0 && (
                    <article className="page-section__expo__type__item">
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
            <div className="page-section__expo__type">
                <h4 className="page-section__expo__type__title">
                    Afgelopen tentoonstellingen
                </h4>
                { past.length > 0 && past.map((expoSection) => renderItem({
                    item: expoSection,
                    isPast: true,
                }))}
            </div>

        </div>
    );
}

function ContactContent():ReactElement {
    return (
        <div />
    );
}

export default PageSection;
