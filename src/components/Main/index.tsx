import React, { useEffect, useRef, useState } from 'react';

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

function Main(props: MainProps) {

    const [ containerMargin, setContainerMargin, windowFocused, playerTransparent ] = props.windowState;
    const file = playlist.filter(item => item.type === 'music').sort((a, b) => sortAsc(a.name.toLocaleLowerCase(), b.name.toLocaleLowerCase()))[7];
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <PreLoad />
    }
    return (
        <div className={'c-app noselect' + (windowFocused ? '' : ' window--unfocused')}>
            <main className="c-app__content">
            <Sidebar changeContainerMargin={setContainerMargin} />
            <div style={{ marginLeft: `${containerMargin}rem`}} className="c-container">
                {document.body.clientWidth < 1000 ?
                <div className="c-app__logo">
                    { document.body.clientWidth <= 655 ? <div className="d-flex a-items-center z-index-6"><PreviousRouter /> <ToggleSidebar /> <span className="ml-10"></span></div>  : null }
                    <div className="z-index-6"><Logo/></div>
                </div> : null }
                <div className="c-container__pages">
                    <Outlet />
                </div>
            </div>
            </main>
            <Player file={file} isTansparent={playerTransparent} />
        </div>
    );
}

type MainProps = {
    windowState: WindowState;
};

export default Main;