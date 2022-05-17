import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFolder, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from '../../../assets/img/men-headset.svg';
import File from '../../List/GridItem';

import { playlist } from "../../Player/config";
import { checkNearToBottom } from "../../../common/utils";

const listItems = playlist;

function Home(props: HomeProps) {

    const onScrollToBottom = () => {

        // 116.8
        if (checkNearToBottom(document.querySelector('.c-list'), 120)) {
            props.changePlayerTransparency(false);
        }
        else {
            props.changePlayerTransparency(true);
        }
    }

    return (
        <div className="c-page c-home">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Início</h1>
                <div className="c-container__header__actions">
                    { listItems.length > 0 ? <>
                    <Button title="Procure arquivos para reproduzir" label="Abrir arquivo(s)" icon={faFolderOpen} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Button title="Mais opções para abrir mídia" icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/>
                    </> : null }
                </div>
            </div>

            { Object.keys(listItems[0]).length > 0 ?
                <div className="c-container__content__title">
                    <h3 className="c-container__content__title__text">Mídia recente</h3>
                </div>
            : null }

            <div className="c-container__content">
                { listItems.length === 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Conheça o novo Reprodutor Multimídia"
                    description="Use este aplicativo para reproduzir seus arquivos de áudio e vídeo e explorar suas bibliotecas pessoais."
                    button={<div className="d-flex a-items-center">
                    <Button className="btn--primary" label="Abrir arquivo" icon={faFolder} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Button className="btn--primary" icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/></div>}
                /> :
                <>
                    <div onScroll={onScrollToBottom} className="c-list c-grid-list">
                        {listItems.map((item) => <File file={item} />)}
                    </div>
                </>
                }
            </div>
        </div>
    );
}

type HomeProps = {
    changePlayerTransparency?: any
}

export default Home;