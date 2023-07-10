import React, { useEffect } from 'react';

import ScrollSpy from 'react-ui-scrollspy';
import { useAppContext } from '../AppShell/App/app.context';
import data from '../../data/home.json';
import PageSection from '../../common/components/PageSection';
import { slugify } from '../../common/utils/slugify';
import { IPageData } from '../../models/pageData.model';
import Hero from '../../common/components/Hero';

function Home() {
    const { pageData, setPageData } = useAppContext();

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
                <ScrollSpy useBoxMethod={false} scrollThrottle={100}>
                    {pageData.pageSections.length > 0 && (
                        pageData.pageSections.map((section) => (
                            <PageSection key={slugify(section.content.title)} sectionData={section} />
                        ))
                    )}
                </ScrollSpy>

            </div>

        </div>
    );
}

export default Home;
