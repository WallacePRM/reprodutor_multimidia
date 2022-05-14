import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFolder, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from '../../../assets/img/men-headset.svg';
import File from '../../File';

import './index.css';
import { playlist } from "../../Player/config";

const listItems = playlist;

function Home() {
    return (
        <div className="c-home">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Início</h1>
                <div className="c-container__header__actions">
                    { listItems.length > 0 ? <>
                    <Button label="Abrir arquivo(s)" icon={faFolderOpen} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Button icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/>
                    </> : null }
                </div>
            </div>
            <div className="c-container__content">
                { listItems.length === 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Conheça o novo Reprodutor Multimídia"
                    description="Use este aplicativo para reproduzir seus arquivos de áudio e vídeo e explorar suas bibliotecas pessoais."
                    button={<div className="d-flex a-items-center">
                    <Button className="btn--primary" label="Abrir arquivo" icon={faFolder} style={{ borderRadius: '.3rem 0 0 .3rem', borderRight: 0 }}/>
                    <Button className="btn--primary" icon={faChevronDown} style={{ borderRadius: '0 .3rem .3rem 0' }}/></div>}
                /> :
                <>
                    <h3 className="c-container__content__title">Mídia recente</h3>
                    <div className="c-grid-list">
                        {listItems.map((item) => <File file={item} />)}
                    </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Home;