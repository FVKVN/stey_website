/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-danger */
import React, { ReactElement } from 'react';
import {
    IExpoSection,
    IPageSection,
    IWorkSection,
} from '../../../models/pageData.model';
import { slugify } from '../../utils/slugify';
import MediaContent from './contentComponents/MediaContent';
import EventContent from './contentComponents/EventContent';
import ContactContent from './contentComponents/contactComponent';
import TrailAnimation from '../trailAnimation';

interface IComponentProps {
    sectionData: IPageSection;
}

function PageSection({ sectionData }: IComponentProps) {
    const parentId = slugify(sectionData.content.title);

    return (
        <div id={parentId} className="page-section" data-theme={sectionData.theme}>
            <div className="page-section__content">
                <header className="page-section__header">
                    <TrailAnimation>
                        <h2 className="page-section__title">
                            {sectionData.content.title}
                        </h2>
                    </TrailAnimation>
                </header>
                { sectionData.content.image && (
                    <TrailAnimation>
                        <figure className="page-section__image">
                            <img src={sectionData.content.image} alt={sectionData.content.imageAlt} />
                        </figure>
                    </TrailAnimation>
                )}
                <div className="page-section__body">
                    <TrailAnimation>

                        { sectionData.content.subTitle !== '' && (
                            <h3 className="page-section__sub-title">
                                {sectionData.content.subTitle}
                            </h3>
                        )}
                        { renderContent(sectionData) }
                    </TrailAnimation>

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

export default PageSection;
