import React, { MouseEvent, createRef } from 'react';
import { ReactComponent as Logo } from '../../../assets/svg/stey.svg';
import { useAppContext } from '../App/app.context';

import './hud.scss';
import { slugify } from '../../../common/utils/slugify';

const baseClass = 'hud';

function AppHud() {
    const { pageData } = useAppContext();

    const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const target = window.document.getElementById(
            e.currentTarget.href.split('#')[1],
        );

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <header className={`${baseClass}__header`}>
                <a href="/" className={`${baseClass}__logo-link`}>
                    <span className="snip-visually-hidden">Terug naar de homepage</span>
                    <Logo className={`${baseClass}__logo-link__logo`} />
                </a>
            </header>
            {pageData.pageSections.length > 0 && (
                <nav className={`${baseClass}__anchors`}>
                    {pageData.pageSections.map((section) => (
                        <a
                            href={`#${slugify(section.content.title)}`}
                            key={`anchor-item-to-${slugify(section.content.title)}`}
                            className={`${baseClass}__anchor`}
                            onClick={(e) => clickHandler(e)}
                            ref={createRef()}
                        >
                            <div
                                data-to-scrollspy-id={slugify(section.content.title)}
                                className={`${baseClass}__anchor__inner`}
                            >
                                {section.content.title}
                            </div>
                        </a>
                    ))}
                </nav>
            )}
        </>
    );
}

export default AppHud;
