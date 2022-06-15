import { faChevronDown, faLink } from "@fortawesome/free-solid-svg-icons";
import { faFolder, faFolderClosed } from "@fortawesome/free-regular-svg-icons";

import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from '../../../assets/img/men-headset.svg';
import GridItem from '../../List/GridItem';

import { useDispatch, useSelector } from "react-redux";
import { getMediaService } from "../../../service/media";
import { selectMedias, setMedias } from "../../../store/medias";
import { Media } from "../../../service/media/types";
import { setCurrentMedias } from "../../../store/player";
import { convertMediaType, removeExtension } from "../../../common/string";
import { fileToDataUrl } from "../../../common/blob";
import { selectMediaPlaying, setMediaPlaying } from "../../../store/mediaPlaying";
import { setPlayerMode } from "../../../store/playerMode";
import { arrayUnshiftItem } from "../../../common/array";
import Margin from "../../Animations/Margin";
import Opacity from "../../Animations/Opacity";
import { setPlayerState } from "../../../store/playerState";
import { useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Position from "../../Animations/Position";

function Home() {

    const medias: any = null;
    const listItems = useSelector(selectMedias);
    const mediaPlaying = useSelector(selectMediaPlaying);
    const itemIndex = listItems.findIndex(item => item.id === mediaPlaying?.id);
    const popupRef: any = useRef();
    const closeTooltip = () => popupRef.current && popupRef.current.close();
    let recentMedias: any[] = [...listItems];
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

        dispatch(setCurrentMedias([file]));
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

    useEffect(() => {

        const orderByRecents = () => {

            if (itemIndex !== -1) {
                recentMedias = arrayUnshiftItem(recentMedias, itemIndex);
                dispatch(setMedias(recentMedias));
            }
        };

        orderByRecents();
    }, [mediaPlaying?.id]);

    return (
        <div className="c-app c-home">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Início</h1>
                <div className="c-container__header__actions">
                    { listItems.length > 0 ? <>
                    <Button onRead={ handleSelectFile } accept="audio/*,video/*" title="Procure arquivos para reproduzir" label="Abrir arquivo(s)" icon={faFolderClosed} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Popup arrow={false} ref={popupRef} keepTooltipInside=".c-app" trigger={<button className="c-button box-field" style={{ borderRadius: '0 .3rem .3rem 0' }} title="Mais opções para abrir mídia"><FontAwesomeIcon className="c-button__icon" icon={faChevronDown}/></button>} position="bottom right" >
                        <Position cssAnimation={["top", "right"]} className="c-popup noselect">
                            <label className="c-popup__item" onClick={closeTooltip}>
                                <Button className="c-popup__item__button-hidden" onRead={ handleSelectFile } accept="audio/*,video/*"/>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faFolderClosed} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Abrir arquivo(s)</h3>
                                    <span className="c-popup__item__description">Procure arquivos para reproduzir</span>
                                </div>
                            </label>
                            <div className="c-popup__item" onClick={closeTooltip}>
                                <Button className="c-popup__item__button-hidden" onlyFolder onRead={ handleSelectFile } accept="audio/*,video/*"/>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faFolder} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Abrir pasta</h3>
                                    <span className="c-popup__item__description">Escolha uma pasta e reproduza todas as mídias nessa pasta</span>
                                </div>
                            </div>
                            <div className="c-popup__item" onClick={closeTooltip}>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faLink} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Abrir URL</h3>
                                    <span className="c-popup__item__description">Insíra uma URL e faça streaming de mídia desse endereço</span>
                                </div>
                            </div>
                        </Position>
                    </Popup>
                    </> : null }
                </div>
            </div>

            { listItems.length > 0 ?
                <Opacity cssAnimation={["opacity"]} className="c-container__content__title">
                    <h3 className="c-container__content__title__text">Mídia recente</h3>
                </Opacity>
            : null }

            <div className="c-container__content" style={{ height: listItems.length === 0 ? '100%' : '' }}>
                { listItems.length == 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Conheça o novo Reprodutor Multimídia"
                    description="Use este aplicativo para reproduzir seus arquivos de áudio e vídeo e explorar suas bibliotecas pessoais."
                    button={<div className="d-flex a-items-center">
                    <Button onRead={ handleSelectFile } accept="audio/*,video/*" className="btn--primary c-button--no-media-style" label="Abrir arquivo" icon={faFolderClosed} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Popup arrow={false} ref={popupRef} keepTooltipInside=".c-app" trigger={<button className="btn--primary c-button box-field" style={{ borderRadius: '0 .3rem .3rem 0' }} title="Mais opções para abrir mídia"><FontAwesomeIcon className="c-button__icon" icon={faChevronDown}/></button>} position="bottom right" >
                        <Position cssAnimation={["top", "right"]} className="c-popup noselect">
                            <label className="c-popup__item" onClick={closeTooltip}>
                                <Button className="c-popup__item__button-hidden" onRead={ handleSelectFile } accept="audio/*,video/*"/>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faFolderClosed} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Abrir arquivo(s)</h3>
                                    <span className="c-popup__item__description">Procure arquivos para reproduzir</span>
                                </div>
                            </label>
                            <div className="c-popup__item" onClick={closeTooltip}>
                                <Button className="c-popup__item__button-hidden" onlyFolder onRead={ handleSelectFile } accept="audio/*,video/*"/>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faFolder} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Abrir pasta</h3>
                                    <span className="c-popup__item__description">Escolha uma pasta e reproduza todas as mídias nessa pasta</span>
                                </div>
                            </div>
                            <div className="c-popup__item" onClick={closeTooltip}>
                                <div className="c-popup__item__icons">
                                    <FontAwesomeIcon className="c-popup__item__icon" icon={faLink} />
                                </div>
                                <div className="c-popup__item__label">
                                    <h3 className="c-popup__item__title">Abrir URL</h3>
                                    <span className="c-popup__item__description">Insíra uma URL e faça streaming de mídia desse endereço</span>
                                </div>
                            </div>
                        </Position>
                    </Popup></div>}
                /> :
                <>
                    <Margin cssAnimation={["marginTop"]} className="c-list c-grid-list">
                        {recentMedias.map((item) => <GridItem onClick={ handleSelectMedia } file={item} key={item.id}/>)}
                    </Margin>
                </>
                }
            </div>
        </div>
    );
}

export default Home;