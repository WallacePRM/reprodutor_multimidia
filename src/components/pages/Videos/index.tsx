import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { sortAsc } from "../../../common/array";
import { selectMedias } from "../../../store/medias";
import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from "../../../assets/img/video.svg";
import { checkNearToBottom } from "../../../common/dom";
import { useDispatch } from "react-redux";
import { setPlayerTransparent } from "../../../store/playerTransparent";
import GridItem from "../../List/GridItem";
import { setCurrentMedias } from "../../../store/player";
import { Media } from "../../../service/media/types";

function Videos() {

    const filterField = 'name';
    let listItems = useSelector(selectMedias);
    listItems = listItems.filter(item => item.type === 'video').sort((a, b) => sortAsc((a as any)[filterField].toLocaleLowerCase(), (b as any)[filterField].toLocaleLowerCase()));
    const dispatch = useDispatch();

    const handleSelectMedia = (file: Media) => {

        dispatch(setCurrentMedias([file]));
    };

    const onScrollToBottom = () => {

        // 116.8
        if (checkNearToBottom(document.querySelector('.c-list'), 120)) {
            dispatch(setPlayerTransparent({ isTransparent: false }));
        }
        else {
            dispatch(setPlayerTransparent({ isTransparent: true }));
        }
    };

    return (
        <div className="c-page c-videos">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Vídeo</h1>
                <div className="c-container__header__actions">
                    { listItems.length > 0 && <Button title="Procure arquivos para reproduzir" label="Adicionar pasta" icon={faFolderClosed} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>}
                </div>
            </div>

            <div className="c-container__content" style={{ height: listItems.length === 0 ? '100%' : '' }}>
                { listItems.length == 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Não conseguimos encontrar nenhum vídeo"
                    description="Sua biblioteca de vídeos não contém nenhum conteúdo de vídeo."
                    button={<div className="d-flex a-items-center">
                    <Button className="btn--primary c-button--no-media-style" label="Adicionar pasta" icon={faFolderClosed}/>
                    </div>}
                /> :
                <>
                    <div onScroll={onScrollToBottom} className="c-list c-grid-list">
                        {listItems.map((item) => <GridItem onClick={ handleSelectMedia } file={item} key={item.id}/>)}
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default Videos;