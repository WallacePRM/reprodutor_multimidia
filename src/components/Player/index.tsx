import { useSelector } from 'react-redux';
import { ReactComponent as VolumeIcon } from '@icon/themify-icons/icons/volume.svg';
import { ReactComponent as ShuffleIcon } from '@icon/themify-icons/icons/control-shuffle.svg';
import { ReactComponent as ReloadIcon } from '@icon/themify-icons/icons/reload.svg';
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faBars, faPause } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as MusicAlt } from '@icon/themify-icons/icons/music-alt.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faEllipsis, faForwardStep, faPlay } from '@fortawesome/free-solid-svg-icons';
import { selectPlayerTransparency } from '../../store/playerTransparent';
import { useEffect, useRef, useState } from 'react';
import { formatHHMMSS } from '../../common/time';
import { useDispatch } from 'react-redux';
import { selectMediaPlaying, setMediaPlaying } from '../../store/mediaPlaying';
import { selectCurrentMedias } from '../../store/player';

import './index.css';

function Player() {

    const [ playerState, setPlayerState ] = useState<PlayerState>({
        duration: 0,
        currentTime: 0,
    });

    const medias = useSelector(selectCurrentMedias) || [];
    const file = useSelector(selectMediaPlaying);
    const isTansparent = useSelector(selectPlayerTransparency);
    const currentTimePorcents =  playerState.duration ? playerState.currentTime / playerState.duration * 100 : 0;
    const mediaRef = useRef<HTMLAudioElement>();
    const dispatch = useDispatch();
    const firstMedia = medias && medias[0];
    const lastMedia = medias && medias[medias.length - 1];
    const coverStyle = {
        border: '1px solid rgb(var(--border-color--dark), 0.1)',
        borderRadius: '.3rem',
        backgroundColor: 'rgb(var(--bg-color--light))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const handlePlayPause = () => {

        if (!mediaRef.current || !file) return;

        if (mediaRef.current.paused) {

            mediaRef.current.play();
        }
        else {
            mediaRef.current.pause();
            const newFile = {
                ...file,
                isPlaying: false,
            };
            dispatch(setMediaPlaying(newFile));
        }
    };

    const handlePrevious = () => {

        const index = medias.findIndex((media) => media.id === file?.id);
        if (index > 0) {
            const newFile = medias[index - 1];
            dispatch(setMediaPlaying(newFile));
        }
    };

    const handleNext = () => {

        const index = medias.findIndex((media) => media.id === file?.id);
        if (index < medias.length - 1) {
            const newFile = medias[index + 1];
            dispatch(setMediaPlaying(newFile));
        }
    };

    useEffect(() => {
        if (file) {
            if (mediaRef.current) mediaRef.current.pause();
            mediaRef.current = file.type === 'music' ? new Audio(file.src) : document.getElementById('player-video') as HTMLVideoElement;
            mediaRef.current.addEventListener('loadeddata', () => {

                setPlayerState((previousState) => ({
                    ...previousState,
                    duration: mediaRef.current?.duration || 0,
                }));

                mediaRef.current?.play();
            });
            mediaRef.current.addEventListener('timeupdate', () => {

                setPlayerState((previousState) => ({
                    ...previousState,
                    currentTime: mediaRef.current?.currentTime || 0,
                }));
            });
            mediaRef.current.addEventListener('ended', () => {

                setPlayerState((previousState) => ({
                    ...previousState,
                    currentTime: 0,
                }));

                const newFile = {
                    ...file,
                    isPlaying: false,
                };

                dispatch(setMediaPlaying(newFile));

                const index = medias.findIndex((media) => media.id === file.id);
                if (index >= medias.length - 1) {
                    // dispatch(setMediaPlaying(null));
                }
                else {
                    const nextFile = medias[index + 1];
                    dispatch(setMediaPlaying(nextFile));
                }
            });
            mediaRef.current.addEventListener('playing', () => {

                const newFile = {
                    ...file,
                    isPlaying: true,
                };
                dispatch(setMediaPlaying(newFile));
            });
            mediaRef.current.addEventListener('error', () => {

               alert('Falha ao carregar o arquivo');
               return;
            });
        }
        else {
            if (mediaRef.current) {
                mediaRef.current.pause();
                setTimeout(() => setPlayerState({
                    duration: 0,
                    currentTime: 0,
                }), 0);
            };
        }
    }, [file?.id]);

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
                        { file?.type !== 'video' ?
                        <div className="c-player__file__cover" style={ file && !file?.cover ? coverStyle : {} }>
                            { file?.cover && <img src={file?.cover}/> }
                            { !file?.cover && file?.type === 'folder' &&
                            <><FontAwesomeIcon className="c-grid-list__item__icon__folder" icon={faFolderClosed} />
                            <FontAwesomeIcon className="c-grid-list__item__icon__list" icon={faBars}/></> }

                            { !file?.cover && file?.type === 'music' && <MusicAlt className="icon-color--light" style={{ height: '1.5rem', width: '1.5rem' }}/>}
                        </div>
                        : <video id="player-video" className="c-player__file__cover c-player__file__cover--video" >
                            <source src={file.src} typeof="video/mp4"/>
                        </video> }
                        <div className="c-player__file__info">
                            <h3 className="c-player__file__info__title">{file?.name}</h3>
                            <p className="c-player__file__info__singer">{file?.singer}</p>
                        </div>
                    </div>
                </div>
                <div className="c-player__controls">
                    { document.body.clientWidth > 655 &&
                    <div className="c-player__controls__item player--button  c-player__controls__item--shuffle">
                        <ShuffleIcon className="icon-color"/>
                    </div>}
                    <div onClick={ handlePrevious } className={'c-player__controls__item player--button' + (file && (medias?.length === 1 || firstMedia?.id === file?.id) ? ' disabled' : '')}>
                        <FontAwesomeIcon icon={faBackwardStep}/>
                    </div>
                    <div onClick={ handlePlayPause } className="c-player__controls__item player--button c-player__controls__item--play">
                        <FontAwesomeIcon icon={!mediaRef.current || mediaRef.current.paused ? faPlay : faPause}/>
                    </div>
                    <div onClick={ handleNext } className={'c-player__controls__item player--button' + (file && (medias?.length === 1 || lastMedia?.id  === file?.id) ? ' disabled' : '')}>
                        <FontAwesomeIcon icon={faForwardStep}/>
                    </div>
                    { document.body.clientWidth > 655 &&
                    <div className="c-player__controls__item player--button  c-player__controls__item--repeat">
                        <ReloadIcon className="icon-color"/>
                    </div>}
                </div>
                <div className="c-player__options">
                    <div className="c-player__controls__options__item player--button">
                        <VolumeIcon className="icon-color" />
                    </div>
                    <div className="c-player__controls__options__item player--button c-player__controls__options__item--config">
                        <FontAwesomeIcon icon={faEllipsis}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

type PlayerState = {
    duration: number,
    currentTime: number
};

export default Player;