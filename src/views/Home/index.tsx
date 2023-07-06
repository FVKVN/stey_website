import React, { useEffect } from 'react';

import ScrollSpy from 'react-ui-scrollspy';
import { useAppContext } from '../AppShell/App/app.context';
import data from '../../data/home.json';
import PageSection from '../../common/components/PageSection';
import { slugify } from '../../common/utils/slugify';
import { IPageData } from '../../models/pageData.model';
import AppHud from '../AppShell/AppHud';
import Hero from '../../common/components/Hero';

function Home() {
    const { pageData, setPageData } = useAppContext();

    useEffect(() => {
        setPageData(data as IPageData);
    }, [pageData, setPageData]);

    return (
        <div className="Home page">
            <ScrollSpy>
                <AppHud />

                <div className="page__scroller">

                    <div className="page__content">
                        { pageData.hasHero && (
                            <Hero
                                id="homepage-hero"
                                title={pageData.pageTitle}
                                subTitle={pageData.pageSubtitle}
                            />
                        ) }
                        {pageData.pageSections.length > 0 && (
                            pageData.pageSections.map((section) => (
                                <PageSection key={slugify(section.content.title)} sectionData={section} />
                            ))
                        )}
                    </div>
                </div>
            </ScrollSpy>

        </div>
    );
}

export default Home;
