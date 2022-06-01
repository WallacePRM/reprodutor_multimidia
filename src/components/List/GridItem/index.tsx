import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as MoreAlt } from '@icon/themify-icons/icons/more-alt.svg';
import { ReactComponent as ControlPlay } from '@icon/themify-icons/icons/control-play.svg';
import { ReactComponent as MusicAlt } from '@icon/themify-icons/icons/music-alt.svg';
import { ReactComponent as LayoutWidthDefault } from '@icon/themify-icons/icons/layout-width-default.svg';
import { Media } from "../../../service/media/types";

import './index.css';

function GridItem(props: FileProps) {

    const handleSelectFile = () => {
        props.onClick(props.file);
    };

    return (
        <div onClick={ handleSelectFile } className="c-grid-list__item">
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
                        { props.file.type === 'folder' ?
                        <><FontAwesomeIcon className="c-grid-list__item__icon__folder" icon={faFolderClosed} />
                        <FontAwesomeIcon className="c-grid-list__item__icon__list" icon={faBars}/></> : null}
                        { props.file.type === 'music' ?
                        <><MusicAlt className="icon--color" style={{ height: '3.5rem', width: '3.5rem' }}/></> : null}
                        { props.file.type === 'video' ?
                        <><LayoutWidthDefault className="icon--color" style={{ height: '3.5rem', width: '3.5rem' }}/></> : null}
                    </div>
                }
            </div>
            <span className="c-grid-list__item__title" title={props.file.name + (props.file.singer ? ` - ${props.file.singer}` : '')}>{props.file.name + (props.file.singer ? ` - ${props.file.singer}` : '')}</span>
        </div>
    );
}

type FileProps = {
    file: Media,
    onClick: (file: Media) => void,
};

export default GridItem;