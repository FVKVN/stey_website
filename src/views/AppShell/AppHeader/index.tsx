import React from 'react';
import { ReactComponent as Logo } from '../../../assets/svg/stey.svg';
import { useAppContext } from '../App/app.context';

import './header.scss';
import { slugify } from '../../../common/utils/slugify';

const baseClass = 'main-header';

function AppHeader() {
    const { pageData } = useAppContext();

    return (
        <header className={baseClass}>
            <a href="/" className={`${baseClass}__logo-link`}>
                <span className="snip-visually-hidden">Terug naar de homepage</span>
                <Logo className={`${baseClass}__logo-link__logo`} />
            </a>

            {pageData.pageSections.length > 0 && (
                <nav className={`${baseClass}__anchors`}>
                    {pageData.pageSections.map((section) => (
                        <a
                            href={`#${slugify(section.content.title)}`}
                            key={`anchor-item-to-${slugify(section.content.title)}`}
                            className={`${baseClass}__anchor`}
                        >
                            {section.content.title}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
}

export default AppHeader;
