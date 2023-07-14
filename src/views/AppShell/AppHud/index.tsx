import React, { MouseEvent, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useSpring, config } from '@react-spring/web';
import classNames from 'classnames';
import { ReactComponent as Logo } from '../../../assets/svg/stey.svg';
import { useAppContext } from '../App/app.context';

import './hud.scss';
import { slugify } from '../../../common/utils/slugify';
import { getActiveNavigationId } from '../../../common/utils/navigation';
import Button from '../../../common/components/Button';

const baseClass = 'hud';
const querySize = 992;

interface IQuery {
    matches: boolean;
}

function AppHud() {
    const { pageData } = useAppContext();
    const [hasScrolled, setHassScrolled] = useState<boolean>(false);
    const [anchorsOpen, setAnchorsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<IQuery>({
        matches: window.innerWidth < querySize,
    });
    const [activeId, setActiveId] = useState<string>();
    const [, api] = useSpring(() => ({ y: 0 }));
    let isStopped = false;

    function onMqlChange(e:MediaQueryListEvent) {
        setQuery(e);
    }

    function getTabIndex():number {
        if (query.matches) {
            return anchorsOpen ? 0 : -1;
        }

        return 0;
    }

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mql = window.matchMedia(`(max-width: ${querySize}px)`);
            mql.addEventListener('change', onMqlChange);

            return () => {
                mql.removeEventListener('change', onMqlChange);
            };
        }
    }, []);

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

    function onAnchorToggleClick() {
        setAnchorsOpen(!anchorsOpen);
    }

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
                <>
                    {query.matches && (
                        <Button
                            id="anchorToggleHeader"
                            onClick={onAnchorToggleClick}
                            className={classNames(
                                'hud__anchors__toggle', {
                                    'hud__anchors__toggle--open': anchorsOpen,
                                },
                            )}
                            aria-label={anchorsOpen ? 'sluit' : 'open'}
                        >
                            <span className="snip-visually-hidden">
                                {`${anchorsOpen ? 'sluit' : 'open'} navigatie`}
                            </span>
                            <span className={`${baseClass}__anchors__toggle__icon`}>
                                +
                            </span>
                        </Button>
                    )}

                    <nav
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                        tabIndex={getTabIndex()}
                        className={
                            classNames(
                                'hud__anchors', {
                                    'hud__anchors--open': query.matches && anchorsOpen,
                                },
                            )
                        }
                    >
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
                </>

            )}
        </header>
    );
}

export default AppHud;
