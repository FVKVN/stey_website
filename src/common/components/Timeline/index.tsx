import React, { Dispatch } from 'react';
import classNames from 'classnames';

import data from '../../../data/timeline.json';
import Button from '../Button';
import { ReactComponent as TimelineIcon } from '../../../assets/svg/icons/icon-timeline.svg';
import './timeline.scss';

interface IGenericTimelineProps {
    timelineVisible: boolean;
    setTimelineVisible: Dispatch<boolean>
}

export default function Timeline(props: IGenericTimelineProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleClose() {
        props.setTimelineVisible(!props.timelineVisible);
        document.body.style.overflow = !props.timelineVisible ? 'hidden' : 'unset';
    }

    return (
        <aside className={
            classNames('Timeline', {
                'Timeline--open': props.timelineVisible,
            })
        }
        >
            <div className="Timeline__inner">
                <ol className="Timeline__list">
                    {data.map((timelineEntry) => (
                        <li key={timelineEntry.id} className="Timeline__list__item">
                            {timelineEntry.images.length > 0 && (
                                <figure className="Timeline__list__item__image-container">
                                    {timelineEntry.images.map((image, i) => (
                                        <img
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={`timeline-list-item-image-${i}`}
                                            src={image}
                                            alt=""
                                            className="Timeline__list__item__image"
                                        />
                                    ))}
                                </figure>
                            )}
                            <h4 className="Timeline__list__item__title">
                                {timelineEntry.date}
                            </h4>
                            <p className="Timeline__list__item__description">
                                {timelineEntry.description}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </aside>
    );
}

export function TimelineToggle(props: IGenericTimelineProps) {
    function handleClick() {
        props.setTimelineVisible(!props.timelineVisible);
        document.body.style.overflow = !props.timelineVisible ? 'hidden' : 'unset';
    }

    return (
        <Button
            id="TimelineToggle"
            onClick={handleClick}
            typeName="primary"
            className="TimelineToggle"
        >
            <span className="TimelineToggle__icon-holder">
                <TimelineIcon className="TimelineToggle__icon" />
            </span>
            <span className="TimelineToggle__text">Open tijdslijn</span>
        </Button>
    );
}
