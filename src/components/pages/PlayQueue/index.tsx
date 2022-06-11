import { faFolder, faFolderClosed, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faLink, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as LayoutListThumb } from '@icon/themify-icons/icons/layout-list-thumb.svg';
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
import Popup from "reactjs-popup";
import Position from "../../Animations/Position";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertMediaType, removeExtension } from "../../../common/string";
import { fileToDataUrl } from "../../../common/blob";
import { getMediaService } from "../../../service/media";
import { setMedias } from "../../../store/medias";

function PlayQueue() {

    const medias: any = null;
    let listItems = useSelector(selectCurrentMedias) || [];
    const mediaPlaying = useSelector(selectMediaPlaying);
    const popupAction: any = useRef();
    const closeActionTooltip = () => popupAction.current && popupAction.current.close();
    const popupRef: any = useRef();
    const closeTooltip = () => popupRef.current && popupRef.current.close();
    const dispatch = useDispatch();

    const handleSelectFile = async (e: React.ChangeEvent<any>) => {

        const input = e.currentTarget;
        const fileList = input.files || [];

        if (fileList.length > 0) {
            for (let i = 0; i < fileList.length; i++) {
                medias.push({
                    id: Date.now() + Math.random(), // Para desenvolvimento
                    name: removeExtension(fileList[i].name),
                    type: convertMediaType(fileList[i].type),
                    src: await fileToDataUrl(fileList[i]),
                    releaseDate: (fileList[i].lastModifiedDate || '').toString(),
                    duration: 0,
                    singer: '',
                    cover: '',
                    isPlaying: false,
                });
            }
        }

        await getMediaService().insertMedias(medias);
        dispatch(setMedias(listItems.concat(medias)));
    };

    const handleSelectMedia = (file: Media) => {

        dispatch(setMediaPlaying(file));
    };

    const handleClearQueue = () => {
        dispatch(setCurrentMedias([] as Media[]));
        dispatch(setMediaPlaying(null));

        setTimeout(() => dispatch(setPlayerState({ file_id: undefined, currentTime: 0 })), 0);
    };

    return (
        <div className="c-page c-play-queue">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Fila de reprodução</h1>
                <div className="c-container__header__actions">
                    <Button title="Procure arquivos para reproduzir" label="Abrir arquivo(s)" icon={faFolderClosed} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Popup arrow={false} ref={popupRef} keepTooltipInside=".c-app" trigger={<button className="c-button box-field" style={{ borderRadius: '0 .3rem .3rem 0' }} title="Mais opções para abrir mídia"><FontAwesomeIcon icon={faChevronDown}/></button>} position="bottom right" >
                        <Position cssAnimation={["top", "right"]} className="c-popup noselect">
                            <label className="c-popup__item" onClick={closeTooltip}>
                                <Button className="c-popup__item__button-hidden" onRead={ handleSelectFile } accept="audio/*,video/*"/>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faFolderClosed} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Adicionar arquivo(s) à fila de reprodução</h3>
                                    <span className="c-popup__item__description">Procurar arquivos para adicionar à fila de reprodução</span>
                                </div>
                            </label>
                            <div className="c-popup__item" onClick={closeTooltip}>
                                <Button className="c-popup__item__button-hidden" onlyFolder onRead={ handleSelectFile } accept="audio/*,video/*"/>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faFolder} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Adicionar pasta à fila de reprodução</h3>
                                    <span className="c-popup__item__description">Escolha uma pasta e adicione todas as mídias nessa pasta à fila de reprodução</span>
                                </div>
                            </div>
                            <div className="c-popup__item" onClick={closeTooltip}>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faLink} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Adicionar uma mídia da URL para reproduzir na fila</h3>
                                    <span className="c-popup__item__description">Insíra uma URL e a mídia desse endereço à fila de reprodução</span>
                                </div>
                            </div>
                        </Position>
                    </Popup>
                </div>
            </div>
            <Opacity cssAnimation={["opacity"]} className="c-container__content__title">
                <div className="d-flex a-items-center">
                    <div className={'c-container__content__title__actions' + (listItems.length === 0 ? ' disabled' : '')} style={{ margin: '0' }}>
                        <Button onClick={handleClearQueue} className="mr-10" label="Limpar" icon={faTrashCan} title="Limpar (Ctrl+Shift+X)" />

                        <Popup keepTooltipInside ref={popupAction}  arrow={false} trigger={<button className="c-button box-field"><FontAwesomeIcon className="c-button__icon" icon={faPlus}/>{document.body.clientWidth > 655 && <span className="c-button__label ml-10">Adicionar a</span>}</button>} position="bottom left" >
                            <Position cssAnimation={["top", "left"]} className="c-popup noselect" style={{ minWidth: '130px' }}>
                                <div className="c-popup__item c-popup__item--row" onClick={closeActionTooltip} style={{ borderBottom: 'var(--border)'}}>
                                    <div className="c-popup__item__icons">
                                        <LayoutListThumb className="c-popup__item__icon icon-color" />
                                    </div>
                                    <div className="c-popup__item__label">
                                        <h3 className="c-popup__item__title">Fila de reprodução</h3>
                                    </div>
                                </div>
                                <div className="c-popup__item c-popup__item--row" onClick={closeActionTooltip}>
                                    <div className="c-popup__item__icons">
                                        <FontAwesomeIcon icon={faPlus} className="c-popup__item__icon icon-color" />
                                    </div>
                                    <div className="c-popup__item__label">
                                        <h3 className="c-popup__item__title">Nova playlist</h3>
                                    </div>
                                </div>
                            </Position>
                        </Popup>
                    </div>
                </div>
            </Opacity>

            <div className="c-container__content" style={{ height: listItems.length === 0 ? '100%' : '' }}>
                { listItems.length > 0 &&
                    <Margin cssAnimation={["marginTop"]} className="c-list c-line-list">
                        { listItems.map((item, index) => <LineItem onClick={ handleSelectMedia } fileTypeVisible className={(isOdd(index) ? 'c-line-list__item--nostyle' : '') + (item.id === mediaPlaying?.id ? ' c-line-list__item--active' : '')} file={item} key={item.id} />) }
                    </Margin>
                }
            </div>
        </div>
    );
}

export default PlayQueue;