import React, { useEffect, useState } from 'react';

import { useAppContext } from '../AppShell/App/app.context';
import data from '../../data/home.json';
import PageSection from '../../common/components/PageSection';
import { slugify } from '../../common/utils/slugify';
import { IPageData } from '../../models/pageData.model';
import Hero from '../../common/components/Hero';
import Timeline, { TimelineToggle } from '../../common/components/Timeline';

function Home() {
    const { pageData, setPageData } = useAppContext();
    const [timelineVisible, setTimelineVisible] = useState<boolean>(false);

    useEffect(() => {
        setPageData(data as IPageData);
    }, [pageData, setPageData]);

    return (
        <div className="Home page">
            { pageData.hasHero && (
                <Hero
                    id="homepage-hero"
                    title={pageData.pageTitle}
                    subTitle={pageData.pageSubtitle}
                />
            ) }
            <div className="page__content">
                <div className="page__content__inner-wrapper">
                    {pageData.pageSections.length > 0 && (
                        <div className="page__content__main">
                            {pageData.pageSections.map((section) => (
                                <PageSection key={slugify(section.content.title)} sectionData={section} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <TimelineToggle timelineVisible={timelineVisible} setTimelineVisible={setTimelineVisible} />
            <Timeline timelineVisible={timelineVisible} setTimelineVisible={setTimelineVisible} />
        </div>
    );
}

export default Home;
