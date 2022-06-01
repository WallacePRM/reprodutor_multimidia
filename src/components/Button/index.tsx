import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { ChangeEventHandler, useRef } from 'react';
import './index.css';

function Button(props: ButtonProps) {

    const ref: any = useRef(null);

    const handleTriggerInput = () => {
        if (ref.current) {
            ref.current?.click();
        }
    };

    return (
        <>
            <button onClick={ handleTriggerInput } className={'c-button box-field' + ( props.className ? ` ${props.className}` : '' )} style={ props.style ? props.style : {} } title={props.title ? props.title : ''}>
                { props.icon ? <FontAwesomeIcon className={'c-button__icon' + (props.label ? ' mr-10' : '')} icon={props.icon} /> : null }
                { props.label ? <span className="c-button__label">{props.label}</span> : null }
            </button>
            { !props.onClick ? <input onChange={ props.onRead } ref={ ref } type="file" multiple accept="[\w]+\.(mp3)" hidden/> : null}
        </>
    );
}

type ButtonProps = {
    label?: string,
    icon?: FontAwesomeIconProps['icon'],
    style?: object,
    title?: string,
    className?: string,
    onClick?: () => void,
    onRead?: ChangeEventHandler<HTMLInputElement>,
};

export default Button;