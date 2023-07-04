/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-danger */
import React, { ReactElement, useEffect, useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { Tween } from 'react-gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
    IExpoSection,
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
    body: IExpoSection[];
}

function PageSection({ sectionData }: IComponentProps) {
    const parentId = slugify(sectionData.content.title);

    return (
        <div
            id={parentId}
            className="page-section"
        >
            <div className="page-section__content">
                <header className="page-section__header">
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
    const { body } = sectionData.content;

    if (type === 'expo') {
        return <EventContent body={body as unknown as IExpoSection[]} parentId={parentId} />;
    }

    if (type === 'work') {
        return <MediaContent body={body as unknown as IWorkSection[]} parentId={parentId} />;
    }

    if (type === 'default') {
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
                        pin: false,
                        start: 'clamp(top top)',
                        end: 'clamp(bottom 60%)',
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
                            Toon meer
                        </span>
                    </header>
                </article>

            ))}
        </PinnedSection>
    );
}

function EventContent({ body, parentId }:IEventComponentProps): ReactElement {
    return (
        <PinnedSection className="page-section__expo" parentId={parentId}>
            {body.map((expoSection: IExpoSection) => (
                <img
                    key={`home-page-section-${slugify(expoSection.location)}`}
                    className="page-section__expo__item"
                    alt=""
                    src={expoSection.coverImage}
                />
            ))}
        </PinnedSection>
    );
}

export default PageSection;
