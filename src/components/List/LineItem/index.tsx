import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Play } from '@icon/themify-icons/icons/control-play.svg';
import { ReactComponent as MusicAlt } from '@icon/themify-icons/icons/music-alt.svg';
import { ReactComponent as LayoutWidthDefault } from '@icon/themify-icons/icons/layout-width-default.svg';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { formatMMSS } from '../../../common/time';
import { Media } from "../../../service/media/types";
import { selectMediaPlaying } from '../../../store/mediaPlaying';

import './index.css';
import { faFilm, faMusic } from '@fortawesome/free-solid-svg-icons';

function LineItem(props: FileProps) {

    const { file } = props;
    let duration = file.duration;
    const inputId = Date.now() + Math.random().toString();
    const mediaPlaying = useSelector(selectMediaPlaying);
    const audioRef = useRef<HTMLAudioElement>();

    useEffect(() => {
        if (file) {
            audioRef.current = new Audio(file.src);
            audioRef.current.addEventListener('loadedmetadata', () => {
                duration = audioRef.current?.duration || 0;
            });
        }
    }, [file]);

    const handleSelectFile = () => {
        props.onClick(file);
    };

    return (
        <div className={'c-line-list__item' + (props.className ? ` ${props.className}` : '')}>
            { mediaPlaying?.id === file.id &&
                <div className={'c-line-animated c-line-list__item--active-icon' + ( mediaPlaying.isPlaying ? ' c-line-animated--start' : '')}>
                    <div className="c-line-animated__item c-line-animated__item--first"></div>
                    <div className="c-line-animated__item c-line-animated__item--second"></div>
                    <div className="c-line-animated__item c-line-animated__item--third"></div>
                </div>
            }
            {props.fileTypeVisible &&
                <div className={'c-line-list__item__type-icon' + (mediaPlaying?.isPlaying ? ' accent--color' : ' icon-color--light')}>
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
                <span> {file.singer ? file.singer : 'Artista desconhecido'}</span>
            </div>
            <div className="c-line-list__item__info c-line-list__item__genre" >
                <span> {file.releaseDate ? new Date(file.releaseDate).getFullYear() : ''}</span>
                <span className="ml-10"> {file.genre ? file.genre : 'Gênero desconhecido'}</span>
            </div>
            <div className="c-line-list__item__info c-line-list__item__duration">
                <span>{duration ? formatMMSS(duration) : '00:00'}</span>
            </div>
        </div>
    );
}

type FileProps = {
    file: Media,
    className?: string,
    fileTypeVisible?: boolean,
    onClick: (file: Media) => void,
};

export default LineItem;