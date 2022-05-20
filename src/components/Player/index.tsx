import { ReactComponent as VolumeIcon } from '@icon/themify-icons/icons/volume.svg';
import { ReactComponent as ShuffleIcon } from '@icon/themify-icons/icons/control-shuffle.svg';
import { ReactComponent as ReloadIcon } from '@icon/themify-icons/icons/reload.svg';

import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faEllipsis, faForwardStep, faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlaylistProps } from './config';

function Player(props: PlayerProps) {

    const { file } = props;

    return (
        <div className={'c-player' + (!file ? ' c-player--disabled ' : '') + (props.isTansparent ? ' c-player--transparent' : '')}>
            <div className="c-player__progress">
                <span className="c-player__progress__time">00:00:00</span>
                <div className="c-player__progress__bar">
                    <input className="input--slider" type="range" defaultValue="0" min="0" max={file?.duration || 0}/>
                </div>
                <span className="c-player__left__time">{file?.duration || '00:00:00'}</span>
            </div>
            <div  className="c-player__actions">
                <div className="c-player__file">
                    <div className="c-player__file__track">
                        <div className="c-player__file__cover">
                            { file?.cover ? <img src={file?.cover}/> : null}
                        </div>
                        <div className="c-player__file__info">
                            <h3 className="c-player__file__info__title">{file?.name}</h3>
                            <p className="c-player__file__info__singer">{file?.singer}</p>
                        </div>
                    </div>
                </div>
                <div className="c-player__controls">
                    <div className="c-player__controls__item player--button">
                        <ShuffleIcon className="icon--color"/>
                    </div>
                    <div className="c-player__controls__item player--button">
                        <FontAwesomeIcon icon={faBackwardStep}/>
                    </div>
                    <div className="c-player__controls__item player--button c-player__controls__item--play">
                        <FontAwesomeIcon icon={faPlay}/>
                    </div>
                    <div className="c-player__controls__item player--button">
                        <FontAwesomeIcon icon={faForwardStep}/>
                    </div>
                    <div className="c-player__controls__item player--button">
                        <ReloadIcon className="icon--color"/>
                    </div>
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
    file?: PlaylistProps
    isTansparent: any
};

export default Player;