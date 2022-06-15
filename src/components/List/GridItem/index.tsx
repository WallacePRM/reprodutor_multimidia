import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as MoreAlt } from '@icon/themify-icons/icons/more-alt.svg';
import { ReactComponent as ControlPlay } from '@icon/themify-icons/icons/control-play.svg';
import { ReactComponent as MusicAlt } from '@icon/themify-icons/icons/music-alt.svg';
import { ReactComponent as LayoutWidthDefault } from '@icon/themify-icons/icons/layout-width-default.svg';
import { Media } from "../../../service/media/types";
import { formatCharacterHHMMSS } from "../../../common/time";
import { urlBase } from "../../../service/media/api-media-service";

import './index.css';
import Opacity from "../../Animations/Opacity";

function GridItem(props: FileProps) {

    const { file } = props;
    const inputId = (Date.now() + Math.random().toString());
    const handleSelectFile = () => {
        props.onClick(file);
    };

    return (
        <div onClick={ handleSelectFile } className={'c-grid-list__item ' + (props.className ? props.className : '')}>
            <div className="c-grid-list__item__thumbnail" style={ !file.thumbnail ? { border: '1px solid rgb(var(--border-color--dark), .1)'} : {}}>
                { file.thumbnail ?
                    <Opacity className="h-100 w-100" cssAnimation={["opacity"]}>
                        <img src={file.thumbnail} />
                    </Opacity> :
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
                <span className="c-grid-list__item__title" title={file.name + (file.author ? ` - ${file.author}` : '')}>{file.name + (file.author ? ` - ${file.author}` : '')}</span>
                { file.type === 'video' ? <span className="c-grid-list__item__subtitle">{file.duration === 0 ? formatCharacterHHMMSS(file.duration) :''}</span> : null}
                { file.type === 'music' ? <span className="c-grid-list__item__subtitle">{file.author || ''}</span> : null}
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