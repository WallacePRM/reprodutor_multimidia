import React, { useEffect, useState } from 'react';

import PreLoad from '../../components/PreLoad';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import Logo from '../../components/Logo';
import ToggleSidebar from '../../components/ToggleSidebar';
import PreviousRouter from '../../components/PreviousRouter';
import { WindowState } from '../../App.hook';
import { playlist } from '../../components/Player/config';
import { sortAsc } from '../../common/utils';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSidebarOpened, toggleSidebar } from '../../store/sidebarOpened';
import { useSelector } from 'react-redux';
import { selectContainerMargin } from '../../store/containerMargin';

function Main(props: MainProps) {

    const [ windowFocused ] = props.windowState;
    const [ isLoading, setIsLoading ] = useState(true);

    const file = playlist.filter(item => item.type === 'music').sort((a, b) => sortAsc(a.name.toLocaleLowerCase(), b.name.toLocaleLowerCase()))[-1];
    const dispatch = useDispatch();
    const containerMargin = useSelector(selectContainerMargin);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        const hideSidebar = () => {
            dispatch(setSidebarOpened({ isOpened: false }));
        };

        document.addEventListener('click', hideSidebar);
        return () => document.removeEventListener('click', hideSidebar);
    }, []);

    if (isLoading) {
        return <PreLoad />
    }
    return (
        <div className={'c-app noselect' + (windowFocused ? '' : ' window--unfocused')}>
            <main className="c-app__content">
            <Sidebar />
            <div style={{ marginLeft: `${containerMargin}rem`}} className="c-container">
                {document.body.clientWidth < 1000 ?
                <div className="c-app__logo">
                    { document.body.clientWidth <= 655 ?
                    <div className="d-flex a-items-center z-index-6">
                        <PreviousRouter />
                        <ToggleSidebar/>
                        <span className="ml-10"></span>
                    </div> : null
                    }
                    <div className="z-index-6"><Logo/></div>
                </div> : null }
                <div className="c-container__pages">
                    <Outlet />
                </div>
            </div>
            </main>
            <Player file={file} />
        </div>
    );
}

type MainProps = {
    windowState: WindowState;
};

export default Main;