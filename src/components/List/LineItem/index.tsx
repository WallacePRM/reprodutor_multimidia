import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Play } from '@icon/themify-icons/icons/control-play.svg';
import { useSelector } from 'react-redux';
import { formatMMSS } from '../../../common/time';
import { Media } from "../../../service/media/types";
import { selectMediaPlaying } from '../../../store/mediaPlaying';
import { faFilm, faMusic } from '@fortawesome/free-solid-svg-icons';
import Opacity from '../../Animations/Opacity';

import './index.css';

function LineItem(props: FileProps) {

    const { file } = props;
    let duration = file.duration;
    const inputId = Date.now() + Math.random().toString();
    const mediaPlaying = useSelector(selectMediaPlaying);

    const handleSelectFile = () => {
        props.onClick(file);
    };

    return (
        <Opacity cssAnimation={["opacity"]} className={'c-line-list__item' + (props.className ? ` ${props.className}` : '')}>
            { mediaPlaying?.id === file.id &&
                <div className={'c-line-animated c-line-list__item--active-icon' + ( mediaPlaying.isPlaying ? ' c-line-animated--start' : '')}>
                    <div className="c-line-animated__item c-line-animated__item--first"></div>
                    <div className="c-line-animated__item c-line-animated__item--second"></div>
                    <div className="c-line-animated__item c-line-animated__item--third"></div>
                </div>
            }
            {props.fileTypeVisible &&
                <div className={'c-line-list__item__type-icon' + (mediaPlaying?.id === file.id ? ' accent--color' : ' icon-color--light')}>
                    { file?.type === 'music' && <FontAwesomeIcon icon={faMusic} /> }
                    { file?.type === 'video' && <FontAwesomeIcon icon={faFilm} /> }
                </div>}
            <div className="c-line-list__item__actions">
                <input id={inputId} className="checkbox-input" type="checkbox" />
                <label htmlFor={inputId} className="checkbox-box"></label>
                <div onClick={ handleSelectFile } className="c-line-list__item__actions__item">
                    <Play className="icon-color" />
                </div>
            </div>
            <div className="c-line-list__item__info c-line-list__item__title" >
                <span>{file.name}</span>
            </div>
            <div className="c-line-list__item__info c-line-list__item__singer" >
                <span>{file.author ? file.author : 'Artista desconhecido'}</span>
            </div>
            <div className="c-line-list__item__info c-line-list__item__album" >
                <span>{file.album ? file.album : 'Álbum desconhecido'}</span>
            </div>
            <div className="c-line-list__item__info c-line-list__item__genre" >
                <span>{file.releaseDate ? new Date(file.releaseDate).getFullYear() : ''}</span>
                <span className="ml-10"> {file.genre ? file.genre : 'Gênero desconhecido'}</span>
            </div>
            <div className="c-line-list__item__info c-line-list__item__duration">
                <span>{duration ? formatMMSS(duration) : '00:00'}</span>
            </div>
        </Opacity>
    );
}

type FileProps = {
    file: Media,
    className?: string,
    fileTypeVisible?: boolean,
    onClick: (file: Media) => void,
};

export default LineItem;