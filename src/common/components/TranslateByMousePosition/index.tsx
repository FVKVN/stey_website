/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useLayoutEffect, useState, RefObject } from 'react';
import { animated as a, useSpring, useInView } from '@react-spring/web';

interface IComponentProps {
    children: ReactNode;
    modifier?: number;
    className?: string;
    onHover?: boolean;
}

interface ICheckInBoundsProps {
    x: number;
    y: number;
    ref: RefObject<HTMLDivElement>;
}

function checkInBounds({ x, y, ref }: ICheckInBoundsProps):boolean {
    if (ref.current !== null) {
        const bounds = ref.current.getBoundingClientRect();

        const inBoundsX = x >= bounds.left && x <= bounds.right;
        const inBoundsY = y >= bounds.top && y <= bounds.bottom;

        return inBoundsX && inBoundsY;
    }

    return false;
}

function TranslateByMousePosition(props: IComponentProps) {
    const [ref, inView] = useInView();
    const [mousePosition, setMousePosition] = useSpring(() => ({
        xy: [0, 0],
    }));
    const modifier = props.modifier ? props.modifier : 20;
    const [isInBounds, setIsInBounds] = useState<boolean>(false);
    const shouldCheckHover = props.onHover;

    function handleMouseMove(e: MouseEvent):void {
        const x = e.clientX;
        const y = e.clientY;

        if (shouldCheckHover) {
            setIsInBounds(checkInBounds({ x, y, ref }));
        } else {
            setIsInBounds(true);
        }

        const xy = inView && isInBounds
            ? [
                -((x - ref.current.clientWidth) / 2) / modifier,
                -((y - ref.current.clientHeight) / 2) / modifier,
            ] : [0, 0];

        setMousePosition({
            xy,
        });
    }

    useLayoutEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });

    return (
        <a.div
            className={props.className}
            ref={ref}
            style={{
                transform: mousePosition.xy.to(
                    (x, y) => `translate3d(${x}px, ${y}px, 0)`,
                ),
            }}
        >
            {props.children}
        </a.div>
    );
}

export default TranslateByMousePosition;
