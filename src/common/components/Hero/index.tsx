import React from 'react';
import './hero.scss';

interface IHeroProps {
    title: string;
    subTitle?: string;
    id: string;
}

const baseClass = 'hero';

export default function Hero(props: IHeroProps) {
    return (
        <div id={props.id} className={baseClass}>
            <div className={`${baseClass}__content`}>
                <h1 className={`${baseClass}__title page-title`}>
                    {props.title}
                    { props.subTitle && (
                        <small>{props.subTitle}</small>
                    )}

                </h1>
            </div>
        </div>
    );
}
