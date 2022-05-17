import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as MoreAlt } from '@icon/themify-icons/icons/more-alt.svg';
import { ReactComponent as ControlPlay } from '@icon/themify-icons/icons/control-play.svg';

import { PlaylistProps } from "../../Player/config";
import './index.css';

function File(props: FileProps) {
    return (
        <div className="c-grid-list__item">
            <div className="c-grid-list__item__actions">
                <div className="c-grid-list__item__actions__item c-grid-list__item__actions__item--checkbox">
                    <input className="checkbox-input" type="checkbox" />
                    <div className="checkbox-box"></div>
                </div>
                <div className="c-grid-list__item__actions__item c-grid-list__item__actions__item--play">
                    <ControlPlay className="icon--color" />
                </div>
                <div className="c-grid-list__item__actions__item c-grid-list__item__actions__item--options">
                    <MoreAlt className="icon--color" />
                </div>
            </div>
            <div className="c-grid-list__item__thumbnail" style={ !props.file.cover ? { border: '1px solid rgb(var(--border-color--dark), .1)'} : {}}>
                { props.file.cover ?
                <img src={props.file.cover} /> :
                <div className="c-grid-list__item__icon">
                    <FontAwesomeIcon className="c-grid-list__item__icon__folder" icon={faFolderClosed}></FontAwesomeIcon>
                    <FontAwesomeIcon className="c-grid-list__item__icon__list" icon={faBars}></FontAwesomeIcon>
                </div>
                }
            </div>
            <span className="c-grid-list__item__title" title={props.file.name + (props.file.singer ? ` - ${props.file.singer}` : '')}>{props.file.name + (props.file.singer ? ` - ${props.file.singer}` : '')}</span>
        </div>
    );
}

type FileProps = {
    file: PlaylistProps,
};

export default File;