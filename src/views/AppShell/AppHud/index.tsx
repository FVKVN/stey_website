import React, { MouseEvent, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import classNames from 'classnames';
import { ReactComponent as Logo } from '../../../assets/svg/stey.svg';
import { useAppContext } from '../App/app.context';

import './hud.scss';
import { slugify } from '../../../common/utils/slugify';

const baseClass = 'hud';

function AppHud() {
    const { pageData } = useAppContext();
    const [hasScrolled, setHassScrolled] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', debounce(
                () => {
                    setHassScrolled(window.scrollY > 0);
                },
                20,
            ));
        }
    }, [hasScrolled]);

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
        <header
            className={
                classNames(
                    'hud__header', {
                        'hud__header--scrolled': hasScrolled,
                    },
                )
            }
        >
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
                            onClick={(e) => clickHandler(e)}
                            data-to-scrollspy-id={slugify(section.content.title)}
                            id={`content-anchor-${slugify(section.content.title)}`}
                        >
                            {section.content.title}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
}

export default AppHud;
