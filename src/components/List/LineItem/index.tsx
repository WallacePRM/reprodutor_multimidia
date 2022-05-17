
import { PlaylistProps } from "../../Player/config";
import { ReactComponent as Play } from '@icon/themify-icons/icons/control-play.svg';

import './index.css';

function LineItem(props: FileProps) {
    return (
        <div className={'c-line-list__item' + (props.className ? ` ${props.className}` : '')}>
            <div className="c-line-list__item__actions">
                <input className="checkbox-input" type="checkbox" />
                <div className="checkbox-box"></div>
                <div className="c-line-list__item__actions__item">
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
    file: PlaylistProps,
    className?: string,
};

export default LineItem;