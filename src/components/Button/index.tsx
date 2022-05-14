import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

function Button(props: ButtonProps) {
    return (
        <div className={'c-button box-field' + ( props.className ? ` ${props.className}` : '' )} style={ props.style ? props.style : {} }>
            { props.icon ? <FontAwesomeIcon className={'c-button__icon' + (props.label ? ' mr-10' : '')} icon={props.icon} /> : null }
            { props.label ? <span className="c-button__label">{props.label}</span> : null }
        </div>
    );
}

type ButtonProps = {
    label?: string,
    icon?: any,
    style?: Object
    className?: string,
};

export default Button;