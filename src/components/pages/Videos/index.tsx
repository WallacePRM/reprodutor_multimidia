import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { sortAsc } from "../../../common/array";
import { selectMedias, setMedias } from "../../../store/medias";
import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from "../../../assets/img/video.svg";
import { checkNearToBottom } from "../../../common/dom";
import { useDispatch } from "react-redux";
import { setPlayerTransparent } from "../../../store/playerTransparent";
import GridItem from "../../List/GridItem";
import { setCurrentMedias } from "../../../store/player";
import { Media } from "../../../service/media/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { convertMediaType, removeExtension } from "../../../common/string";
import { fileToDataUrl } from "../../../common/blob";
import { getMediaService } from "../../../service/media";
import { selectMediaPlaying, setMediaPlaying } from "../../../store/mediaPlaying";

import './index.css';

function Videos() {

    const filterField = 'name';
    const listItems = useSelector(selectMedias);
    const videoList = listItems.filter(item => item.type === 'video').sort((a, b) => sortAsc((a as any)[filterField].toLocaleLowerCase(), (b as any)[filterField].toLocaleLowerCase()));
    const files: any[] = [];
    const mediaPlaying = useSelector(selectMediaPlaying);
    const dispatch = useDispatch();

    const handleSelectFile = async (e: React.ChangeEvent<any>) => {

        const input = e.currentTarget;
        const fileList = input.files || [];

        if (fileList.length > 0) {
            for (let i = 0; i < fileList.length; i++) {

                if (convertMediaType(fileList[i].type) === 'video') {
                    files.push({
                        id: Date.now() + Math.random(), // Para desenvolvimento
                        name: removeExtension(fileList[i].name),
                        type: 'video',
                        src: await fileToDataUrl(fileList[i]),
                        releaseDate: fileList[i].lastModifiedDate.toString(),
                        duration: 0,
                        singer: '',
                        cover: '',
                        isPlaying: false,
                    });
                }
            };
        }

        await getMediaService().insertMedias(files);
        dispatch(setMedias(listItems.concat(files)));
    };

    const handleSelectMedia = (file: Media) => {

        dispatch(setCurrentMedias([file]));
        if (mediaPlaying?.id !== file.id) {
            dispatch(setMediaPlaying(file));
        }
        else {
            dispatch(setMediaPlaying(null));
            setTimeout(() => dispatch(setMediaPlaying(file)), 0);
        }
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
                    { videoList.length > 0 && <Button onRead={handleSelectFile} onlyFolder accept="video/mp4" title="Procure arquivos para reproduzir" label="Adicionar pasta" icon={faFolderClosed} />}
                </div>
            </div>

            { videoList.length > 0 &&
            <div className="c-container__content__title">
                <div className="d-flex a-items-center">
                    <div className="c-container__content__title__actions">
                        <div className="c-container__content__title__actions__item box-field box-field--transparent">
                            <label>Ordernar por: <span className="accent--color">A - Z</span></label>
                            <FontAwesomeIcon className="box-field__icon ml-10" icon={faChevronDown} />
                        </div>
                    </div>
                </div>
            </div>
            }

            <div className="c-container__content" style={{ height: videoList.length === 0 ? '100%' : '' }}>
                { videoList.length == 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Não conseguimos encontrar nenhum vídeo"
                    description="Sua biblioteca de vídeos não contém nenhum conteúdo de vídeo."
                    button={<div className="d-flex a-items-center">
                    <Button onRead={handleSelectFile} onlyFolder accept="video/mp4" className="btn--primary c-button--no-media-style" label="Adicionar pasta" icon={faFolderClosed}/>
                    </div>}
                /> :
                <>
                    <div onScroll={onScrollToBottom} className="c-list c-grid-list">
                        {videoList.map((item) => <GridItem className="c-grid-list__item--video"  onClick={ handleSelectMedia } file={item} key={item.id}/>)}
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default Videos;