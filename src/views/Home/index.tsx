import React, { useEffect } from 'react';
import { useAppContext } from '../AppShell/App/app.context';
import data from '../../data/home.json';
import Hero from '../../common/components/Hero';
import PageSection from '../../common/components/PageSection';
import { slugify } from '../../common/utils/slugify';
import { IPageData } from '../../models/pageData.model';

function Home() {
    const { pageData, setPageData } = useAppContext();
    useEffect(() => {
        setPageData(data as IPageData);
    }, [pageData, setPageData]);

    return (
        <div className="Home page">
            { pageData.hasHero && (
                <Hero
                    title={pageData.pageTitle}
                    hasImage={
                        pageData.heroImagePath !== undefined
                        && pageData.heroImagePath !== ''
                    }
                    imagePath={pageData.heroImagePath}
                />
            ) }

            {pageData.pageSections.length > 0 && (
                pageData.pageSections.map((section) => (
                    <PageSection key={slugify(section.content.title)} sectionData={section} />
                ))
            )}

        </div>
    );
}

export default Home;
