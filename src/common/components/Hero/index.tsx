import React from 'react';
import './hero.scss';

interface IHeroProps {
    title: string;
    hasImage: boolean;
    imagePath?: string;
    imageAltText?: string;
}

const baseClass = 'hero';

export default function Hero(props: IHeroProps) {
    return (
        <div className={baseClass}>
            {props.hasImage && (
                <figure className={`${baseClass}__bg`}>
                    <img src={props.imagePath} alt={props.imageAltText} />
                </figure>
            )}
            <div className={`${baseClass}__content`}>
                <h1 className={`${baseClass}__title page-title`}>
                    {props.title}
                </h1>
            </div>
        </div>
    );
}
