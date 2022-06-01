import { useSelector } from 'react-redux';
import { ReactComponent as VolumeIcon } from '@icon/themify-icons/icons/volume.svg';
import { ReactComponent as ShuffleIcon } from '@icon/themify-icons/icons/control-shuffle.svg';
import { ReactComponent as ReloadIcon } from '@icon/themify-icons/icons/reload.svg';
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faBars, faPause } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as MusicAlt } from '@icon/themify-icons/icons/music-alt.svg';
import { ReactComponent as LayoutWidthDefault } from '@icon/themify-icons/icons/layout-width-default.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faEllipsis, faForwardStep, faPlay } from '@fortawesome/free-solid-svg-icons';
import { selectPlayerTransparency } from '../../store/playerTransparent';
import { Media } from '../../service/media/types';
import { useEffect, useRef, useState } from 'react';
import { formatHHMMSS } from '../../common/time';

import './index.css';

function Player(props: PlayerProps) {

    const { file } = props;
    const isTansparent = useSelector(selectPlayerTransparency);
    const coverStyle = {
        border: '1px solid rgb(var(--border-color--dark), 0.1)',
        borderRadius: '.3rem',
        backgroundColor: 'rgb(var(--bg-color--light))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const [ playerState, setPlayerState ] = useState<PlayerState>({
        duration: 0,
        currentTime: 0,
    });
    const currentTimePorcents =  playerState.duration ? playerState.currentTime / playerState.duration * 100 : 0;
    const audioRef = useRef<HTMLAudioElement>();

    const handlePlayPause = () => {

        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

    };

    useEffect(() => {
        if (file) {
            audioRef.current = new Audio(file.musicSrc);
            audioRef.current.addEventListener('loadeddata', () => {
                setPlayerState((previousState) => ({
                    ...previousState,
                    duration: audioRef.current?.duration || 0,
                }));

                audioRef.current?.play();
            });
            audioRef.current.addEventListener('timeupdate', () => {
                setPlayerState((previousState) => ({
                    ...previousState,
                    currentTime: audioRef.current?.currentTime || 0,
                }));
            });
            audioRef.current.addEventListener('ended', () => {
                setPlayerState((previousState) => ({
                    ...previousState,
                    currentTime: 0,
                }));
            });
        }
    }, [file]);

    return (
        <div className={'c-player' + (!file ? ' c-player--disabled ' : '') + (isTansparent ? ' c-player--transparent' : '')}>
            <div className="c-player__progress">
                <span className="c-player__progress__time">{formatHHMMSS(playerState.currentTime) || '00:00:00'}</span>
                <div className="c-player__progress__bar">
                    <input className="input--slider" onChange={() => {}} type="range" value={currentTimePorcents} min="0" max={100}/>
                    <div className="c-player__progress__inner-bar" style={{ width: currentTimePorcents + '%'}}></div>
                </div>
                <span className="c-player__left__time">{formatHHMMSS(playerState.duration) || '00:00:00'}</span>
            </div>
            <div  className="c-player__actions">
                <div className="c-player__file">
                    <div className="c-player__file__track">
                        <div className="c-player__file__cover" style={ file && !file?.cover ? coverStyle : {} }>
                            { file?.cover && <img src={file?.cover}/> }
                            { !file?.cover && file?.type === 'folder' &&
                            <><FontAwesomeIcon className="c-grid-list__item__icon__folder" icon={faFolderClosed} />
                            <FontAwesomeIcon className="c-grid-list__item__icon__list" icon={faBars}/></> }

                            { !file?.cover && file?.type === 'music' && <MusicAlt className="icon--color" style={{ height: '1.5rem', width: '1.5rem' }}/>}
                            { !file?.cover && file?.type === 'video' && <LayoutWidthDefault className="icon--color" style={{ height: '1.5rem', width: '1.5rem' }}/> }
                        </div>
                        <div className="c-player__file__info">
                            <h3 className="c-player__file__info__title">{file?.name}</h3>
                            <p className="c-player__file__info__singer">{file?.singer}</p>
                        </div>
                    </div>
                </div>
                <div className="c-player__controls">
                    { document.body.clientWidth > 655 &&
                    <div className="c-player__controls__item player--button  c-player__controls__item--shuffle">
                        <ShuffleIcon className="icon--color"/>
                    </div>}
                    <div className="c-player__controls__item player--button">
                        <FontAwesomeIcon icon={faBackwardStep}/>
                    </div>
                    <div onClick={ handlePlayPause } className="c-player__controls__item player--button c-player__controls__item--play">
                        <FontAwesomeIcon icon={!audioRef.current || audioRef.current.paused ? faPlay : faPause}/>
                    </div>
                    <div className="c-player__controls__item player--button">
                        <FontAwesomeIcon icon={faForwardStep}/>
                    </div>
                    { document.body.clientWidth > 655 &&
                    <div className="c-player__controls__item player--button  c-player__controls__item--repeat">
                        <ReloadIcon className="icon--color"/>
                    </div>}
                </div>
                <div className="c-player__options">
                    <div className="c-player__controls__options__item player--button">
                        <VolumeIcon className="icon--color" />
                    </div>
                    <div className="c-player__controls__options__item player--button c-player__controls__options__item--config">
                        <FontAwesomeIcon icon={faEllipsis}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

type PlayerProps = {
    file: Media | null
};

type PlayerState = {
    duration: number,
    currentTime: number
}

export default Player;