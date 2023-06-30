import React, { CSSProperties, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import './button.scss';
import { logButtonClick } from '../../utils/analytics/analytics';

export interface IButtonProps {
    id: string;
    children?: string | ReactNode;
    className?: string;
    typeName?: 'primary' | 'secondary' | 'text' | 'tertiary';
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    style?: CSSProperties;
    submit?: {
        formName: string;
    };
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
    const btnClass = classNames('button', {
        'button--primary': props.typeName === 'primary',
        'button--secondary': props.typeName === 'secondary',
        'button--tertiary': props.typeName === 'tertiary',
        'button--text': props.typeName === 'text',
    });

    const buttonClasses = classNames(btnClass, props.className);

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (typeof props.onClick === 'function') {
            props.onClick(e);
        }
        logButtonClick({ buttonId: props.id });
    };

    return (
        <button
            id={props.id}
            className={buttonClasses}
            onClick={clickHandler}
            type={props.submit ? 'submit' : 'button'}
            disabled={props.disabled}
            ref={ref}
            style={props.style}
        >
            {props.children}
        </button>
    );
});

export default Button;
