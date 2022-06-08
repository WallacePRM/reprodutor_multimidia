import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { ReactComponent as VolumeIcon } from '@icon/themify-icons/icons/volume.svg';
import { ReactComponent as ShuffleIcon } from '@icon/themify-icons/icons/control-shuffle.svg';
import { ReactComponent as ShuffleDesativeIcon } from '@icon/themify-icons/icons/layout-line-solid.svg';
import { ReactComponent as LoopIcon } from '@icon/themify-icons/icons/loop.svg';
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faBars, faPause } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as MusicAlt } from '@icon/themify-icons/icons/music-alt.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faEllipsis, faForwardStep, faPlay } from '@fortawesome/free-solid-svg-icons';
import { formatHHMMSS } from '../../common/time';
import { useDispatch } from 'react-redux';
import { selectMediaPlaying, setMediaPlaying } from '../../store/mediaPlaying';
import { selectCurrentMedias, setCurrentMedias } from '../../store/player';
import { selectPlayerState, setPlayerState } from '../../store/playerState';
import { selectPlayerMode, setPlayerMode } from '../../store/playerMode';
import ReactDOM from 'react-dom';
import PreviousRouter from '../PreviousRouter';
import Logo from '../Logo';
import Opacity from '../Animations/Opacity';
import Slider from '../Slider';
import { selectPlayerConfig, setPlayerConfig } from '../../store/playerConfig';

import './index.css';
import { shuffle, sortAsc } from '../../common/array';

let timeoutId: any;
function Player() {

    const dispatch = useDispatch();
    const [ playerHidden, setPlayerHidden ] = useState(false);

    const playerConfig = useSelector(selectPlayerConfig);
    const playerState = useSelector(selectPlayerState);
    const medias = useSelector(selectCurrentMedias) || [];
    const file = useSelector(selectMediaPlaying);
    const playerMode = useSelector(selectPlayerMode);
    const mediaRef = useRef<HTMLAudioElement>();
    const videoRef = useRef<HTMLVideoElement>(null);

    const fileState = playerState && playerState.file_id === file?.id ? {...playerState} : { duration: 0, currentTime: 0 };
    const currentTimePorcents =  fileState.duration ? fileState.currentTime / fileState.duration * 100 : 0;
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

    const handleChangeFullMode = () => {

        if (playerMode === 'default') {
            dispatch(setPlayerMode('full'));
        }
        else {
            dispatch(setPlayerMode('default'));
            clearInterval(timeoutId);
        }
    };

    const handleToggleVideoInterface = (e: React.MouseEvent) => {
        if (playerMode === 'full') {
            e.stopPropagation();

            if (mediaRef.current?.paused) {

                mediaRef.current?.play();
                setTimeout(() => {
                    setPlayerHidden(true);
                    document.body.style.cursor = "none";
                }, 100);
            }
            else {
                mediaRef.current?.pause();
                setPlayerHidden(false);
                document.body.style.cursor = "default";
            }
        }
    };

    const handleChangeFileCurrentTime = (e: any) => {

        if (mediaRef.current) {

            const newTime = e.target.value / 100 * playerState.duration;
            mediaRef.current.currentTime = newTime;
            dispatch(setPlayerState({ currentTime: newTime }));
        }
    };

    const handleToggleShuffle = () => {

        let newMedias = [...medias];
        if (playerConfig.shuffle) {
            newMedias = newMedias.sort((a, b) => sortAsc(a.name, b.name));
            dispatch(setCurrentMedias(newMedias));

            dispatch(setPlayerConfig({ shuffle: false }));
        }
        else {
            newMedias = shuffle(newMedias);
            dispatch(setCurrentMedias(newMedias));

            dispatch(setPlayerConfig({ shuffle: true }));
        }
    };

    const handleChangeRepeatMode = () => {

        if (playerConfig.repeatMode === 'all') {
            dispatch(setPlayerConfig({ repeatMode: 'once' }));
        }

        if (playerConfig.repeatMode === 'once') {
            dispatch(setPlayerConfig({ repeatMode: false }));
        }

        if (playerConfig.repeatMode === false) {
            dispatch(setPlayerConfig({ repeatMode: 'all' }));
        }
    };

    const toggleMouseView = (e: any) => {

        e.stopPropagation();
        clearTimeout(timeoutId);

        if (playerMode === 'full') {

            document.body.style.cursor = "default";
            playerHidden && setPlayerHidden(false);

            timeoutId = setTimeout(() => {
                if (mediaRef.current?.paused === false && playerMode === 'full') {
                    setPlayerHidden(true);
                    document.body.style.cursor = "none";
                }
            }, 3500);
        }
    };

    const mapRepeatMode = (mode: string | boolean) => {

        if (mode === 'all') {
            return 'Tudo';
        }

        if (mode === 'once') {
            return 'Um';
        }

        return 'Desativado';
    };

    useEffect(() => {
        if (file) {
            if (mediaRef.current)  {
                mediaRef.current.pause();
            }
            if (file.type === 'music') {
                mediaRef.current = new Audio(file.src);
            }
            else {
                mediaRef.current = videoRef.current as HTMLVideoElement;
            }

            mediaRef.current.addEventListener('loadeddata', () => {
                setTimeout(() => {
                if (mediaRef.current)  {
                    mediaRef.current.currentTime = file.id === playerState.file_id ? playerState.currentTime : 0;
                }

                dispatch(setPlayerState({
                    file_id: file.id,
                    duration: mediaRef.current?.duration || 0,
                    currentTime: mediaRef.current?.currentTime || 0,
                }));

                mediaRef.current?.play();

            }, 200);
            });
            mediaRef.current.addEventListener('timeupdate', () => {

                dispatch(setPlayerState({
                    currentTime: mediaRef.current?.currentTime || 0,
                }));

            });
            mediaRef.current.addEventListener('ended', () => {

                file.type === 'video' && setPlayerHidden(false);

                dispatch(setPlayerState({
                    currentTime: 0,
                }));

                const newFile = {
                    ...file,
                    isPlaying: false,
                };

                if (playerConfig.repeatMode === 'once') {
                    dispatch(setMediaPlaying(null));
                    setTimeout(() => {
                        dispatch(setPlayerState({ currentTime: 0 }));
                        dispatch(setMediaPlaying(newFile));
                    }, 0);
                    return;
                }
                else {
                    dispatch(setMediaPlaying(newFile));
                }


                const index = medias.findIndex((media) => media.id === file.id);
                if (!(index >= medias.length - 1)) {
                    const nextFile = medias[index + 1];
                    dispatch(setMediaPlaying(nextFile));
                }

                if (playerConfig.repeatMode === 'all' && index >= medias.length - 1) {
                    dispatch(setMediaPlaying(medias[0]));
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

    let videoComponent = ReactDOM.createPortal(
        <Opacity>
            <div onClick={(e) => e.stopPropagation()} className={'c-player-fullscreen__header' + (playerHidden ? ' c-player-fullscreen__header--hidden' : '')} style={{ display: playerMode === 'full' ? undefined : 'none', backgroundColor: 'rgb(24, 24 , 24, .7)' }}>
                <PreviousRouter className="c-player-fullscreen__icon"  onClick={ () => {dispatch(setPlayerMode('default')); clearInterval(timeoutId);} } title="Voltar"/>
                <Logo className="c-player-fullscreen__logo ml-10"/>
            </div>
            <video key={file?.src} ref={ videoRef } id="player-video" typeof="video/mp4" onClick={handleToggleVideoInterface} onMouseMove={toggleMouseView} className={'c-player__file__cover c-player__file__cover--video' + (playerMode === 'full' ? ' video-full-mode' : ' video-default-mode')}>
                <source src={file?.src} typeof="video/mp4"/>
            </video>
        </Opacity>, document.getElementById('video-container')!
    );

    let audioComponent = (
        <Opacity className={'c-player__file__cover' + (playerMode === 'full' ? ' c-player__file__cover--music' : '')} style={ file && !file?.cover ? coverStyle : {} }>
            { file?.cover && <img src={file?.cover}/> }
            { !file?.cover && file?.type === 'folder' &&
            <><FontAwesomeIcon className="c-grid-list__item__icon__folder" icon={faFolderClosed} />
            <FontAwesomeIcon className="c-grid-list__item__icon__list" icon={faBars}/></> }

            { !file?.cover && file?.type === 'music' && <MusicAlt className="icon-color--light" style={{ height: '1.5rem', width: '1.5rem' }}/>}
        </Opacity>
    );

    if (playerMode === 'full') {
        if (file?.type === 'music') {
        audioComponent = ReactDOM.createPortal(
            <Opacity onClick={(e) => e.stopPropagation()} className="c-player-fullscreen" style={{ backgroundImage: `url(${file?.cover || ''})` }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', height: 'calc(100% - 7.3rem)', width: '100%', background: file?.cover ? 'rgb(var(--bg-color--solid), .8)' : 'rgb(var(--bg-color--solid), 1)', backdropFilter: 'blur(2rem)' }}>
                    <div className="c-player-fullscreen__header">
                        <PreviousRouter className="c-player-fullscreen__header__icon" onClick={ () => dispatch(setPlayerMode('default'))} title="Voltar"/>
                        <Logo className="ml-10"/>
                    </div>
                    {audioComponent}
                </div>
            </Opacity>,
        document.body );
        }
    }

    return (
        <div className={'c-player' + (playerHidden ? ' c-player--hidden' : '') +
        (playerMode === 'full' && file?.type === 'video' ? ' c-player--full-mode-video theme--dark' : '') +
        (playerMode === 'full' && file?.type === 'music' ? ' c-player--full-mode-music' : '') +
        (!file ? ' c-player--disabled ' : '')}>
            <div className="c-player__progress">
                <span className="c-player__progress__time">{formatHHMMSS(playerState.currentTime) || '00:00:00'}</span>
                <Slider className="c-player__progress__bar" onChange={handleChangeFileCurrentTime} data={ {value: currentTimePorcents, min: 0, max: 100} } />
                <span className="c-player__left__time">{formatHHMMSS(playerState.duration - playerState.currentTime) || '00:00:00'}</span>
            </div>
            <div  className="c-player__actions">
                <div className="c-player__file">
                    <div className="c-player__file__track" onClick={handleChangeFullMode} title="Reproduzindo agora (Ctrl+N)">
                        { file?.type !== 'video' ? audioComponent : videoComponent }
                        <div className={'c-player__file__info' + (playerMode === 'default' && file?.type === 'video' ? ' c-player__file__info--margin-video' : '') + (playerMode === 'default' && file?.type === 'music' ? ' c-player__file__info--margin-music' : '')}>
                            <h3 className="c-player__file__info__title">{file?.name}</h3>
                            <p className="c-player__file__info__singer">{file?.singer}</p>
                        </div>
                    </div>
                </div>
                <div className="c-player__controls">
                    { document.body.clientWidth > 655 &&
                    <div onClick={handleToggleShuffle} className="c-player__controls__item player--button  c-player__controls__item--shuffle" title={`Embaralhar: ${playerConfig.shuffle ? 'Ativado' : 'Desativado'} (Ctrl+H)`}>
                        {!playerConfig.shuffle && <ShuffleDesativeIcon className="icon-color c-player__controls__item--desatived"/>}
                        <ShuffleIcon className="icon-color"/>
                    </div>}
                    <div onClick={handlePrevious} className={'c-player__controls__item player--button' + (file && (medias?.length === 1 || firstMedia?.id === file?.id) ? ' disabled' : '')} title="Voltar (Ctrl+B)">
                        <FontAwesomeIcon icon={faBackwardStep}/>
                    </div>
                    <div onClick={handlePlayPause} className="c-player__controls__item player--button c-player__controls__item--play" title="Executar (Ctrl+P)">
                        <FontAwesomeIcon icon={!mediaRef.current || mediaRef.current.paused ? faPlay : faPause}/>
                    </div>
                    <div onClick={handleNext } className={'c-player__controls__item player--button' + (file && (medias?.length === 1 || lastMedia?.id  === file?.id) ? ' disabled' : '')} title="Avançar (Ctrl+F)">
                        <FontAwesomeIcon icon={faForwardStep}/>
                    </div>
                    { document.body.clientWidth > 655 &&
                    <div onClick={handleChangeRepeatMode} className="c-player__controls__item player--button  c-player__controls__item--repeat" title={`Repetir: ${mapRepeatMode(playerConfig.repeatMode)} (Ctrl+T)`}>
                        {playerConfig.repeatMode === false && <ShuffleDesativeIcon className="icon-color c-player__controls__item--desatived"/>}
                        {playerConfig.repeatMode === 'once' && <span className="c-player__controls__item--repeat-once">1</span>}
                        <LoopIcon className="icon-color"/>
                    </div>}
                </div>
                <div className="c-player__options">
                    <div className="c-player__controls__options__item player--button">
                        <VolumeIcon className="icon-color" title="Volume"/>
                    </div>
                    <div className="c-player__controls__options__item player--button c-player__controls__options__item--config" title="Mais opções">
                        <FontAwesomeIcon icon={faEllipsis}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player;