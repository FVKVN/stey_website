/* eslint-disable react/no-array-index-key */
import React, { ReactNode } from 'react';
import { useTrail, animated as a, useInView } from '@react-spring/web';

interface IComponentProps {
    children: ReactNode;
}

const baseClass = 'trail-animation';

function TrailAnimation(props:IComponentProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ref, inView] = useInView();

    const items = React.Children.toArray(props.children);
    const trail = useTrail(items.length, {
        config: { mass: 45, tension: 2000, friction: 300 },
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 50,
        from: { opacity: 0, y: 50 },
    });

    return (
        <div ref={ref}>
            {trail.map(({ ...style }, index) => (
                <a.div key={index} className={baseClass} style={style}>
                    <a.div>{items[index]}</a.div>
                </a.div>
            ))}
        </div>
    );
}

export default TrailAnimation;
