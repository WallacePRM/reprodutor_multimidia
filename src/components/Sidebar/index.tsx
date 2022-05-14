import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as Home } from '@icon/themify-icons/icons/home.svg';
import { ReactComponent as MusicAlt } from '@icon/themify-icons/icons/music-alt.svg';
import { ReactComponent as LayoutWidthDefault } from '@icon/themify-icons/icons/layout-width-default.svg';
import { ReactComponent as LayoutListThumb } from '@icon/themify-icons/icons/layout-list-thumb.svg';
import { ReactComponent as Settings } from '@icon/themify-icons/icons/settings.svg';

import { useEffect, useRef } from 'react';
import Logo from '../Logo';
import PreviousRouter from '../PreviousRouter';
import Searchbar from '../Searchbar';
import ToggleSidebar from '../ToggleSidebar';
import styles from './index.module.css';

function Sidebar(props: SidebarProps) {

    const ref = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (props && props.changeContainerMargin) {
            props.changeContainerMargin(document.body.offsetWidth > 655 ? (ref.current?.offsetWidth || 321) * 0.0625 : 0);
        }
    }, [ref.current]);

    return (
        <div ref={ref} className={styles['c-sidebar']}>
            <header className={styles['c-sidebar__header']}>
                { document.body.clientWidth > 655 ? <PreviousRouter title="Voltar"/> : null }
                { document.body.clientWidth >= 1000 ? <><span className="ml-10"></span><Logo/></> : null }
            </header>
            <div className={styles['c-sidebar__content']}>
                {document.body.clientWidth < 1000 && document.body.clientWidth > 655 ?
                    <div className="m-5 mb-0" title="Abrir navegação"><ToggleSidebar /></div>
                : null }
                <div className={styles['c-sidebar__search-field']} title="Clique para pesquisar">
                    <Searchbar />
                </div>
                <nav className={styles['c-sidebar__nav']}>
                    <a href="#" className={styles['c-sidebar__item'] + ' ' + styles['c-sidebar__item--active']} title="Início (Ctrl+Shifht+F)">
                        <div className="d-flex a-items-center">
                            <Home className={styles['c-sidebar__item__icon']} />
                            <label className={styles['c-sidebar__item__label']}>Início</label>
                        </div>
                        <div className={styles['c-sidebar__highlighter']}></div>
                    </a>
                    <a href="#" className={styles['c-sidebar__item']} title="Biblioteca de músicas (Ctrl+R)">
                        <div className="d-flex a-items-center">
                            <MusicAlt className={styles['c-sidebar__item__icon']} />
                            <label className={styles['c-sidebar__item__label']}>Biblioteca de músicas</label>
                        </div>
                        <div className={styles['c-sidebar__highlighter']}></div>
                    </a>
                    <a href="#" className={styles['c-sidebar__item']} title="Biblioteca de vídeos (Ctrl+D)">
                        <div className="d-flex a-items-center">
                            <LayoutWidthDefault className={styles['c-sidebar__item__icon']} />
                            <label className={styles['c-sidebar__item__label']}>Biblioteca de vídeos</label>
                        </div>
                        <div className={styles['c-sidebar__highlighter']}></div>
                    </a>
                    <div className={styles['c-sidebar__separator']} ></div>
                    <a href="#" className={styles['c-sidebar__item']} title="File de reproduções (Ctrl+Q)">
                        <div className="d-flex a-items-center">
                            <LayoutListThumb className={styles['c-sidebar__item__icon']} />
                            <label className={styles['c-sidebar__item__label']}>Fila de reprodução</label>
                        </div>
                        <div className={styles['c-sidebar__highlighter']}></div>
                    </a>
                    <a href="#" className={styles['c-sidebar__item']} title="Playlists (Ctrl+Y)">
                        <div className="d-flex a-items-center">
                            <FontAwesomeIcon className={styles['c-sidebar__item__icon']} icon={faYoutube} style={{ color: 'rgb(var(--red-color), .8)'}}/>
                            <label className={styles['c-sidebar__item__label']}>Playlists</label>
                        </div>
                        <div className={styles['c-sidebar__highlighter']}></div>
                    </a>
                </nav>
            </div>
            <footer className={styles['c-sidebar__footer']}>
                <a href="#" className={styles['c-sidebar__item'] + ' ' + styles['c-sidebar__item--rotate']} title="Configurações">
                    <div className="d-flex a-items-center">
                        <Settings className={styles['c-sidebar__item__icon']} />
                        <label className={styles['c-sidebar__item__label']}>Configurações</label>
                    </div>
                    <div className={styles['c-sidebar__highlighter']}></div>
                </a>
            </footer>
        </div>
    )
}

type SidebarProps = {
    changeContainerMargin: any;
}

export default Sidebar;