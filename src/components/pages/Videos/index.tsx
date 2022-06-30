import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { sortAsc } from "../../../common/array";
import { selectMedias, setMedias } from "../../../store/medias";
import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from "../../../assets/img/video.svg";
import { useDispatch } from "react-redux";
import GridItem from "../../List/GridItem";
import { setCurrentMedias } from "../../../store/player";
import { Media } from "../../../service/media/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { convertMediaType, removeExtension } from "../../../common/string";
import { fileToDataUrl } from "../../../common/blob";
import { getMediaService } from "../../../service/media";
import { selectMediaPlaying, setMediaPlaying } from "../../../store/mediaPlaying";
import { setPlayerMode } from "../../../store/playerMode";
import Margin from "../../Animations/Margin";
import Opacity from "../../Animations/Opacity";
import { setPlayerState } from "../../../store/playerState";
import Popup from "reactjs-popup";
import { useRef } from "react";
import SelectBlock from "../../SelectBlock";
import { selectSelectedFiles } from "../../../store/selectedFiles";

import './index.css';

function Videos() {

    const filterField = 'name';
    const selectedItems = useSelector(selectSelectedFiles);
    const listItems = useSelector(selectMedias);
    const videoList = listItems.filter(item => item.type === 'video').sort((a, b) => sortAsc((a as any)[filterField].toLocaleLowerCase(), (b as any)[filterField].toLocaleLowerCase()));
    const files: any[] = [];
    const mediaPlaying = useSelector(selectMediaPlaying);
    const popupRef: any = useRef();
    const closeTooltip = () => popupRef.current && popupRef.current.close();
    const dispatch = useDispatch();

    const handleSelectFile = async (e: React.ChangeEvent<any>) => {

        const input = e.currentTarget;
        const fileList = input.files || [];

        const medias = await getMediaService().insertMedias(fileList);
        dispatch(setMedias(listItems.concat(medias)));
    };

    const handleSelectMedia = (file: Media) => {

        if (file.type === 'video') {
            dispatch(setPlayerMode('full'));
        }

        dispatch(setCurrentMedias(videoList));
        if (mediaPlaying?.id !== file.id) {
            dispatch(setMediaPlaying(file));
        }
        else {
            dispatch(setMediaPlaying(null));
            setTimeout(() => {
                dispatch(setPlayerState({ file_id: file.id, currentTime: 0, duration: 0 }));
                dispatch(setMediaPlaying(file))
            }, 0);
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
            <Opacity cssAnimation={["opacity"]} className="c-container__content__title">
                <div className="d-flex a-items-center">
                    <div className="c-container__content__title__actions">
                        {/* <div className="c-container__content__title__actions__item box-field box-field--transparent">
                            <label>Ordernar por: <span className="accent--color">A - Z</span></label>
                            <FontAwesomeIcon className="box-field__icon ml-10" icon={faChevronDown} />
                        </div> */}

                        <Popup keepTooltipInside arrow={false} mouseLeaveDelay={300} mouseEnterDelay={0} ref={popupRef} trigger={<div className="c-container__content__title__actions__item box-field box-field--transparent"><label>Ordernar por: <span className="accent--color">A - Z</span></label><FontAwesomeIcon className="box-field__icon ml-10" icon={faChevronDown} /></div>} position="bottom right" >
                            <div  className="c-popup noselect" style={{ minWidth: '130px' }}>
                                <div className="c-popup__item c-popup__item--active c-popup__item--row" onClick={closeTooltip}>
                                    <div className="c-popup__item__label">
                                        <h3 className="c-popup__item__title">A - Z</h3>
                                    </div>
                                    <div className="highlighter"></div>
                                </div>
                                <div className="c-popup__item c-popup__item--row" onClick={closeTooltip}>
                                    <div className="c-popup__item__label">
                                        <h3 className="c-popup__item__title">Data de modificação</h3>
                                    </div>
                                    <div className="highlighter"></div>
                                </div>
                            </div>
                        </Popup>
                    </div>
                </div>
                { selectedItems.length > 0 &&
                <Opacity cssAnimation={["opacity"]}>
                    <SelectBlock list={videoList}/>
                </Opacity>}
            </Opacity>
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
                    <Margin cssAnimation={["marginTop"]} className="c-list c-grid-list">
                        {videoList.map((item) => <GridItem className="c-grid-list__item--video"  onClick={ handleSelectMedia } file={item} key={item.id}/>)}
                    </Margin>
                </>
                }
            </div>
        </div>
    );
}

export default Videos;