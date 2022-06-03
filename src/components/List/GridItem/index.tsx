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

    const { file } = props;
    const inputId = (Date.now() + Math.random().toString());
    const handleSelectFile = () => {
        props.onClick(file);
    };

    return (
        <div onClick={ handleSelectFile } className={'c-grid-list__item ' + (props.className ? props.className : '')}>
            <div className="c-grid-list__item__thumbnail" style={ !file.cover ? { border: '1px solid rgb(var(--border-color--dark), .1)'} : {}}>
                { file.cover ?
                    <img src={file.cover} /> :
                    <div className="c-grid-list__item__icon">
                        { file.type === 'folder' ?
                        <><FontAwesomeIcon className="c-grid-list__item__icon__folder" icon={faFolderClosed} />
                        <FontAwesomeIcon className="c-grid-list__item__icon__list" icon={faBars}/></> : null}
                        { file.type === 'music' ?
                        <><MusicAlt className="icon-color--light" style={{ height: '3.5rem', width: '3.5rem' }}/></> : null}
                        { file.type === 'video' ?
                        <><LayoutWidthDefault className="icon-color--light" style={{ height: '3.5rem', width: '3.5rem' }}/></> : null}
                    </div>
                }
                <div className="c-grid-list__item__actions">
                    <div className="c-grid-list__item__actions__item c-grid-list__item__actions__item--checkbox">
                        <input id={inputId} className="checkbox-input" type="checkbox" />
                        <label htmlFor={inputId} className="checkbox-box"></label>
                    </div>
                    <div className="c-grid-list__item__actions__item c-grid-list__item__actions__item--play">
                        <ControlPlay className="icon-color" />
                    </div>
                    <div className="c-grid-list__item__actions__item c-grid-list__item__actions__item--options">
                        <MoreAlt className="icon-color" />
                    </div>
                </div>
            </div>
            <div className="c-grid-list__item__info">
                <span className="c-grid-list__item__title" title={file.name + (file.singer ? ` - ${file.singer}` : '')}>{file.name + (file.singer ? ` - ${file.singer}` : '')}</span>
                { file.type === 'video' ? <span className="c-grid-list__item__subtitle">{file.duration || ''}</span> : null}
                { file.type === 'music' ? <span className="c-grid-list__item__subtitle">{file.singer || ''}</span> : null}
            </div>
        </div>
    );
}

type FileProps = {
    file: Media,
    className?: string,
    onClick: (file: Media) => void,
};

export default GridItem;