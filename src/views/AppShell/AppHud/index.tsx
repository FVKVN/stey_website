import React, { MouseEvent, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useSpring, config } from '@react-spring/web';
import classNames from 'classnames';
import { ReactComponent as Logo } from '../../../assets/svg/stey.svg';
import { useAppContext } from '../App/app.context';

import './hud.scss';
import { slugify } from '../../../common/utils/slugify';
import { getActiveNavigationId } from '../../../common/utils/navigation';

const baseClass = 'hud';

function AppHud() {
    const { pageData } = useAppContext();
    const [hasScrolled, setHassScrolled] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<string>();
    const [, api] = useSpring(() => ({ y: 0 }));
    let isStopped = false;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', debounce(
                () => {
                    const newActiveId = getActiveNavigationId(
                        pageData.pageSections.map((section) => slugify(section.content.title)),
                    );

                    if (newActiveId !== activeId) {
                        setActiveId(newActiveId);
                    }

                    setHassScrolled(window.scrollY > 0);
                },
                10,
            ));
        }
    }, [hasScrolled, activeId, pageData.pageSections]);

    const onWheel = ():void => {
        isStopped = true;
        window.removeEventListener('wheel', onWheel);
    };

    const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        let y = 0;
        const offset = 0;

        const target = window.document.getElementById(
            e.currentTarget.href.split('#')[1],
        );

        if (target) {
            const value = window.scrollY + target.getBoundingClientRect().top;

            y = value + offset;

            window.addEventListener('wheel', onWheel);

            api.start({
                y,
                reset: true,
                from: { y: window.scrollY },
                config: config.slow,
                onRest: () => {
                    isStopped = false;
                    window.removeEventListener('wheel', onWheel);
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange: (_, ctrl) => {
                    if (!isStopped) {
                        window.scroll(0, ctrl.get().y);
                    }
                },
            });
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
                    {pageData.pageSections.map((section) => {
                        const parentId = slugify(section.content.title);
                        return (
                            <a
                                href={`#${parentId}`}
                                key={`anchor-item-to-${parentId}`}
                                className={classNames(
                                    'hud__anchor', {
                                        'hud__anchor--active': activeId === parentId,
                                    },
                                )}
                                onClick={(e) => clickHandler(e)}
                                id={`content-anchor-${parentId}`}
                            >
                                {section.content.title}
                            </a>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}

export default AppHud;
