import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import './checkbox.scss';

interface ICheckboxProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    invalid?: boolean;
    toggleButton?: boolean;
}

export default function Checkbox(props: ICheckboxProps) {
    const checkboxClass = classNames('Checkbox', props.className, {
        invalid: props.invalid,
        ToggleButton: props.toggleButton,
    });

    return (
        <div className={checkboxClass}>
            <input
                type="checkbox"
                id={props.id}
                name={props.name}
                checked={!!props.checked}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            <label htmlFor={props.id}>{props.children}</label>
        </div>
    );
}
