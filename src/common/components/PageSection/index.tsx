/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-danger */
import React, { ReactElement, useEffect, useState, useRef } from 'react';
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
                <header className={classNames('page-section__header', {
                    'page-section__header--not-sticky': sectionData.pinned,
                })}
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

function MediaContent({
    body,
    parentId,
}:IWorkComponentProps): ReactElement {
    const [holderWidth, setHolderWidth] = useState(0);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const holderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollBack = (holderWidth - containerWidth) + 30;

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
        <div ref={containerRef} className="page-section__media">
            <Tween
                to={{
                    x: `-${scrollBack}px`,
                    scrollTrigger: {
                        trigger: `#${parentId}`,
                        scrub: true,
                        pin: true,
                        start: 'top top',
                    },
                }}
            >
                <div ref={holderRef} className="page-section__media-holder">
                    {body.map((workSection: IWorkSection) => (
                        <img
                            key={`home-page-section-${slugify(workSection.type)}`}
                            className="page-section__media__item"
                            alt=""
                            src={workSection.coverImage}
                        />
                    ))}
                </div>
            </Tween>
        </div>
    );
}

function EventContent({ body, parentId }:IEventComponentProps): ReactElement {
    const [holderWidth, setHolderWidth] = useState(0);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const holderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollBack = (holderWidth - containerWidth) + 30;

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
        <div ref={containerRef} className="page-section__expo">
            <Tween
                to={{
                    x: `-${scrollBack}px`,
                    scrollTrigger: {
                        trigger: `#${parentId}`,
                        scrub: true,
                        pin: true,
                        start: 'top top',
                    },
                }}
            >
                <div ref={holderRef} className="page-section__expo-holder">
                    {body.map((expoSection: IExpoSection) => (
                        <img
                            key={`home-page-section-${slugify(expoSection.location)}`}
                            className="page-section__expo__item"
                            alt=""
                            src={expoSection.coverImage}
                        />
                    ))}
                </div>
            </Tween>
        </div>
    );
}

export default PageSection;
