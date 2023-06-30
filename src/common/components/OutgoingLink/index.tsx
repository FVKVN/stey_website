import React from 'react';

interface IPublicProps {
    href: string;
    className?: string;
    children: React.ReactNode;
    shouldOpenNewTab?: boolean; // default true
}

function OutgoingLink(props: IPublicProps) {
    const {
        href,
        className,
        children,
        shouldOpenNewTab = true,
    } = props;

    const target = shouldOpenNewTab ? '_blank' : '';

    return (
        <a
            href={href}
            className={className}
            target={target}
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
}

export default OutgoingLink;
