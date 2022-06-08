import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";

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
import { arrayUnshiftItem, revertOrder } from "../../../common/array";
import Margin from "../../Animations/Margin";
import Opacity from "../../Animations/Opacity";
import { setPlayerState } from "../../../store/playerState";
import { useEffect } from "react";

function Home() {

    const medias: any = null;
    const listItems = useSelector(selectMedias);
    const mediaPlaying = useSelector(selectMediaPlaying);
    const itemIndex = listItems.findIndex(item => item.id === mediaPlaying?.id);
    let recentMedias: any[] = [...listItems];
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
                    <Button title="Mais opções para abrir mídia" icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/>
                    </> : null }
                </div>
            </div>

            { listItems.length > 0 ?
                <Opacity className="c-container__content__title">
                    <h3 className="c-container__content__title__text">Mídia recente</h3>
                </Opacity>
            : null }

            <div className="c-container__content" style={{ height: listItems.length === 0 ? '100%' : '' }}>
                { listItems.length == 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Conheça o novo Reprodutor Multimídia"
                    description="Use este aplicativo para reproduzir seus arquivos de áudio e vídeo e explorar suas bibliotecas pessoais."
                    button={<div className="d-flex a-items-center">
                    <Button onRead={ handleSelectFile } accept="audio/*,video/*" className="btn--primary c-button--no-media-style" label="Abrir arquivo" icon={faFolderClosed} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Button className="btn--primary" icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/></div>}
                /> :
                <>
                    <Margin className="c-list c-grid-list">
                        {recentMedias.map((item) => <GridItem onClick={ handleSelectMedia } file={item} key={item.id}/>)}
                    </Margin>
                </>
                }
            </div>
        </div>
    );
}

export default Home;