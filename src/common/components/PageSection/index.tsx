/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-danger */
import React, { ReactElement, useEffect, useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { Tween } from 'react-gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
    IExpoSection,
    IExpoSectionDefault,
    IPageSection,
    IWorkSection,
} from '../../../models/pageData.model';
import { slugify } from '../../utils/slugify';

gsap.registerPlugin(ScrollTrigger);

interface IComponentProps {
    sectionData: IPageSection;
}

interface IPinnedSectionComponentProps {
    parentId: string;
    className?: string;
    children: ReactNode;
}

interface IWorkComponentProps {
    parentId: string;
    body: IWorkSection[];
}

interface IEventComponentProps {
    parentId: string;
    body: IExpoSection;
}

function PageSection({ sectionData }: IComponentProps) {
    const parentId = slugify(sectionData.content.title);

    return (
        <div
            id={parentId}
            className="page-section"
        >
            <div className="page-section__content">
                <header
                    className={
                        classNames('page-section__header', {
                            'page-section__header--not-sticky': sectionData.pinned,
                        })
                    }
                >
                    <h2 className="page-section__title">
                        {sectionData.content.title}
                    </h2>
                </header>
                <div
                    className={
                        classNames('page-section__body', {
                            'page-section__body--full': sectionData.fullWidth,
                        })
                    }
                >
                    { sectionData.content.subTitle !== '' && (
                        <h3 className="page-section__sub-title">
                            {sectionData.content.subTitle}
                        </h3>
                    )}
                    { renderContent(sectionData, parentId) }
                </div>
            </div>
        </div>
    );
}

function renderContent(
    sectionData: IPageSection,
    parentId: string,
): ReactElement | null {
    const { type } = sectionData;

    if (type === 'expo') {
        const { body } = sectionData.content;
        return <EventContent body={body as unknown as IExpoSection} parentId={parentId} />;
    }

    if (type === 'work') {
        const { body } = sectionData.content;
        return <MediaContent body={body as unknown as IWorkSection[]} parentId={parentId} />;
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

function PinnedSection({ children, className, parentId }: IPinnedSectionComponentProps) {
    const [holderWidth, setHolderWidth] = useState(0);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const holderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollBack = (holderWidth - containerWidth) + 60;

    useEffect(() => {
        if (holderRef.current !== null) {
            const rect = holderRef.current.getBoundingClientRect();
            setHolderWidth(rect.width);
            setOffsetLeft(rect.left);
        }

        if (containerRef.current !== null) {
            const rect = containerRef.current.getBoundingClientRect();
            setContainerWidth(rect.width);
        }
    }, [holderWidth, offsetLeft, containerWidth]);

    return (
        <div ref={containerRef} className={`${className} page-section__pinned-section`}>
            <Tween
                to={{
                    x: `-${scrollBack}px`,
                    scrollTrigger: {
                        trigger: `#${parentId}`,
                        scrub: true,
                        pin: true,
                        start: 'clamp(top top)',
                    },
                }}
            >
                <div ref={holderRef} className="page-section__pinned-section__content-holder">
                    {children}
                </div>
            </Tween>
        </div>
    );
}

function MediaContent({
    body,
    parentId,
}:IWorkComponentProps): ReactElement {
    return (
        <PinnedSection className="page-section__media" parentId={parentId}>
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
        </PinnedSection>
    );
}

function EventContent({ body, parentId }:IEventComponentProps): ReactElement {
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
        <PinnedSection className="page-section__expo" parentId={parentId}>
            <div className="page-section__expo__type">
                <h4 className="page-section__expo__type__title">
                    Toekomstige tentoonstellingen
                </h4>
                { upcoming.length === 0 && (
                    <article className="page-section__expo__type__item">
                        <div className="page-section__expo__item__content">
                            <h5>Er zijn geen tentoonstellingen gepland.</h5>
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

        </PinnedSection>
    );
}

function ContactContent():ReactElement {
    return (
        <div />
    );
}

export default PageSection;
