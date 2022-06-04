import { faFolderClosed, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMedias, setCurrentMedias } from "../../../store/player";
import Button from "../../Button";
import LineItem from "../../List/LineItem";
import { Media } from "../../../service/media/types";
import { isOdd } from "../../../common/number";
import { selectMediaPlaying, setMediaPlaying } from "../../../store/mediaPlaying";

function PlayQueue() {

    let listItems = useSelector(selectCurrentMedias) || [];
    const mediaPlaying = useSelector(selectMediaPlaying);
    const dispatch = useDispatch();

    const handleSelectMedia = (file: Media) => {

        const playlist = listItems;
        const fileIndex = playlist.findIndex((item) => item.id === file.id);
        playlist.splice(fileIndex, 1);
        playlist.unshift(file);

        dispatch(setCurrentMedias(playlist));
    };

    const handleClearQueue = () => {
        dispatch(setCurrentMedias([] as Media[]));
        dispatch(setMediaPlaying(null));
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
            <div className="c-container__content__title">
                <div className="d-flex a-items-center">
                    <div className={'c-container__content__title__actions' + (listItems.length === 0 ? ' disabled' : '')} style={{ margin: '0' }}>
                        <Button onClick={handleClearQueue} className="mr-10" label="Limpar" icon={faTrashCan} title="Limpar (Ctrl+Shift+X)" />
                        <Button label="Adicionar a" icon={faPlus} />
                    </div>
                </div>
            </div>

            <div className="c-container__content" style={{ height: listItems.length === 0 ? '100%' : '' }}>
                { listItems.length > 0 &&
                    <div className="c-list c-line-list">
                        { listItems.map((item, index) => <LineItem onClick={ handleSelectMedia } fileTypeVisible className={(isOdd(index) ? 'c-line-list__item--nostyle' : '') + (item.id === mediaPlaying?.id ? ' c-line-list__item--active' : '')} file={item} key={item.id} />) }
                    </div>
                }
            </div>
        </div>
    );
}

export default PlayQueue;