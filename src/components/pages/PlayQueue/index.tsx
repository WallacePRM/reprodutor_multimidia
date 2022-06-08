import { faFolderClosed, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMedias, setCurrentMedias } from "../../../store/player";
import Button from "../../Button";
import LineItem from "../../List/LineItem";
import { Media } from "../../../service/media/types";
import { isOdd } from "../../../common/number";
import { selectMediaPlaying, setMediaPlaying } from "../../../store/mediaPlaying";
import Margin from "../../Animations/Margin";
import Opacity from "../../Animations/Opacity";
import { current } from "@reduxjs/toolkit";
import { setPlayerState } from "../../../store/playerState";

function PlayQueue() {

    let listItems = useSelector(selectCurrentMedias) || [];
    const mediaPlaying = useSelector(selectMediaPlaying);
    const dispatch = useDispatch();

    const handleSelectMedia = (file: Media) => {

        dispatch(setMediaPlaying(file));
    };

    const handleClearQueue = () => {
        dispatch(setCurrentMedias([] as Media[]));
        dispatch(setMediaPlaying(null));
        dispatch(setPlayerState({ file_id: undefined, currentTime: 0 }));
    };

    return (
        <div className="c-page c-play-queue">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Fila de reprodução</h1>
                <div className="c-container__header__actions">
                    <Button title="Procure arquivos para reproduzir" label="Abrir arquivo(s)" icon={faFolderClosed} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Button title="Mais opções para abrir mídia" icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/>
                </div>
            </div>
            <Opacity className="c-container__content__title">
                <div className="d-flex a-items-center">
                    <div className={'c-container__content__title__actions' + (listItems.length === 0 ? ' disabled' : '')} style={{ margin: '0' }}>
                        <Button onClick={handleClearQueue} className="mr-10" label="Limpar" icon={faTrashCan} title="Limpar (Ctrl+Shift+X)" />
                        <Button label="Adicionar a" icon={faPlus} />
                    </div>
                </div>
            </Opacity>

            <div className="c-container__content" style={{ height: listItems.length === 0 ? '100%' : '' }}>
                { listItems.length > 0 &&
                    <Margin className="c-list c-line-list">
                        { listItems.map((item, index) => <LineItem onClick={ handleSelectMedia } fileTypeVisible className={(isOdd(index) ? 'c-line-list__item--nostyle' : '') + (item.id === mediaPlaying?.id ? ' c-line-list__item--active' : '')} file={item} key={item.id} />) }
                    </Margin>
                }
            </div>
        </div>
    );
}

export default PlayQueue;