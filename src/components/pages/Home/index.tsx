import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";

import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from '../../../assets/img/men-headset.svg';
import GridItem from '../../List/GridItem';

import { useDispatch, useSelector } from "react-redux";
import { setPlayerTransparent } from "../../../store/playerTransparent";
import { getMediaService } from "../../../service/media";
import { selectMedias, setMedias } from "../../../store/medias";
import { useEffect } from "react";
import { Media } from "../../../service/media/types";
import { setCurrentMedias } from "../../../store/player";
import { checkNearToBottom } from "../../../common/dom";


function Home(props: HomeProps) {

    const listItems = useSelector(selectMedias);
    const dispatch = useDispatch();

    const onScrollToBottom = () => {

        // 116.8
        if (checkNearToBottom(document.querySelector('.c-list'), 120)) {
            dispatch(setPlayerTransparent({ isTransparent: false }));
        }
        else {
            dispatch(setPlayerTransparent({ isTransparent: true }));
        }
    };

    const handleSelectMedia = (file: Media) => {

        dispatch(setCurrentMedias([file]));
    };

    useEffect(() => {

        if (listItems.length > 0) return;

        const getMedias = async () => {

            const result = await getMediaService().getMedias();
            dispatch(setMedias(result));
        };

        getMedias();
    }, []);

    return (
        <div className="c-page c-home">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Início</h1>
                <div className="c-container__header__actions">
                    { listItems.length > 0 ? <>
                    <Button title="Procure arquivos para reproduzir" label="Abrir arquivo(s)" icon={faFolderClosed} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Button title="Mais opções para abrir mídia" icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/>
                    </> : null }
                </div>
            </div>

            { listItems.length > 0 ?
                <div className="c-container__content__title">
                    <h3 className="c-container__content__title__text">Mídia recente</h3>
                </div>
            : null }

            <div className="c-container__content" style={{ height: listItems.length === 0 ? '100%' : '' }}>
                { listItems.length == 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Conheça o novo Reprodutor Multimídia"
                    description="Use este aplicativo para reproduzir seus arquivos de áudio e vídeo e explorar suas bibliotecas pessoais."
                    button={<div className="d-flex a-items-center">
                    <Button className="btn--primary" label="Abrir arquivo" icon={faFolderClosed} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Button className="btn--primary" icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/></div>}
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

type HomeProps = {

}

export default Home;