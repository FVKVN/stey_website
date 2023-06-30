/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-danger */
import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { SpringValue, animated, useScroll } from '@react-spring/web';
import {
    IExpoSection,
    IPageSection,
    IWorkSection,
} from '../../../models/pageData.model';
import { slugify } from '../../utils/slugify';

interface IComponentProps {
    sectionData: IPageSection;
}

function PageSection({ sectionData }: IComponentProps) {
    const parentId = slugify(sectionData.content.title);
    const { scrollYProgress, scrollY } = useScroll();

    console.log(scrollY);

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
                    {sectionData.content.subTitle !== '' && (
                        <h3 className="page-section__sub-title">
                            {sectionData.content.subTitle}
                        </h3>
                    )}

                    { renderContent(sectionData, scrollYProgress) }
                </div>
            </div>
        </div>
    );
}

function renderContent(sectionData: IPageSection, scrollYProgress: SpringValue | null): ReactElement | null {
    const { type } = sectionData;
    const { body } = sectionData.content;

    if (type === 'expo') {
        // typescript doesn't know which type
        return renderEventContent(body as unknown as IExpoSection[]);
    }

    if (type === 'work') {
        return renderMediaContent(body as unknown as IWorkSection[], scrollYProgress);
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

function renderMediaContent(body:IWorkSection[], scrollYProgress: SpringValue | null): ReactElement {
    return (
        <div className="page-section__media">
            <animated.div
                className="page-section__media-holder pinned-scroll"
                style={{
                    transform: scrollYProgress !== null
                        ? scrollYProgress.to((scrollPercentage) => `translateX(-${scrollPercentage}%)`)
                        : 'none',
                }}
            >
                { body.map((workSection: IWorkSection) => (
                    <img
                        key={`home-page-section-${slugify(workSection.type)}`}
                        className="page-section__media__item"
                        alt=""
                        src={workSection.coverImage}
                    />
                ))}
            </animated.div>

        </div>
    );
}

function renderEventContent(body:IExpoSection[]): ReactElement {
    return (
        <div className="page-section__expo">
            <div className="page-section__expo-holder">
                { body.map((expoSection: IExpoSection) => (
                    <img
                        key={`home-page-section-${slugify(expoSection.location)}`}
                        className="page-section__media__item"
                        alt=""
                        src={expoSection.coverImage}
                    />
                ))}
            </div>
        </div>
    );
}

export default PageSection;
