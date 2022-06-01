
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Play } from '@icon/themify-icons/icons/control-play.svg';
import { Media } from "../../../service/media/types";

import './index.css';

function LineItem(props: FileProps) {

    const inputId = (Date.now() + Math.random().toString());
    const handleSelectFile = () => {
        props.onClick(props.file);
    };

    return (
        <div className={'c-line-list__item' + (props.className ? ` ${props.className}` : '')}>
            <FontAwesomeIcon className="c-line-list__item--active-icon" icon={faChartSimple}/>
            <div className="c-line-list__item__actions">
                <input id={inputId} className="checkbox-input" type="checkbox" />
                <label htmlFor={inputId} className="checkbox-box"></label>
                <div onClick={ handleSelectFile } className="c-line-list__item__actions__item">
                    <Play className="icon--color" />
                </div>
            </div>
            <div className="c-line-list__item__title" >
                <span>{props.file.name}</span>
            </div>
            <div className="c-line-list__item__singer" >
                <span> {props.file.singer ? props.file.singer : 'Artista desconhecido'}</span>
            </div>
            <div className="c-line-list__item__duration">
                <span>00:00</span>
            </div>
        </div>
    );
}

type FileProps = {
    file: Media,
    onClick: (file: Media) => void,
    className?: string,
};

export default LineItem;