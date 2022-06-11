import React, { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";

import PreLoad from '../../components/PreLoad';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import Logo from '../../components/Logo';
import ToggleSidebar from '../../components/ToggleSidebar';
import PreviousRouter from '../../components/PreviousRouter';
import { WindowState } from '../../App.hook';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSidebarOpened } from '../../store/sidebarOpened';
import { useSelector } from 'react-redux';
import { selectContainerMargin } from '../../store/containerMargin';
import { selectMedias, setMedias } from '../../store/medias';
import { getMediaService } from '../../service/media';

function Main(props: MainProps) {

    const [windowFocused] = props.windowState;
    const [isLoading, setIsLoading] = useState(true);
    const containerMargin = useSelector(selectContainerMargin);
    const listItems = useSelector(selectMedias);
    const dispatch = useDispatch();

    useEffect(() => {

        const hideSidebar = () => {
            dispatch(setSidebarOpened({ isOpened: false }));
        };

        document.addEventListener('click', hideSidebar);
        return () => document.removeEventListener('click', hideSidebar);
    }, []);

    useEffect(() => {

        if (listItems.length > 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return;
        };

        const getMedias = async () => {

            try {
                const result = await getMediaService().getMedias();
                dispatch(setMedias(result));

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
            catch (error) {
                console.log(error);
            }
        };

        getMedias();
    }, []);

    if (isLoading) {
        return <PreLoad />
    }
    return (
        <div className={'c-app noselect' + (windowFocused ? '' : ' window--unfocused')}>
            <main id="popup-root" className="c-app__content">
                <Sidebar />
                <div style={{ marginLeft: `${containerMargin}rem` }} className="c-container">
                    {document.body.clientWidth < 1000 ?
                        <div className="c-app__logo">
                            {document.body.clientWidth <= 655 ?
                                <div className="d-flex a-items-center z-index-6">
                                    <PreviousRouter />
                                    <ToggleSidebar />
                                    <span className="ml-10"></span>
                                </div> : null
                            }
                            <div className="z-index-6"><Logo /></div>
                        </div> : null}
                    <div className="c-container__pages">
                        <AnimatePresence>
                            <Outlet />
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <Player />
        </div>
    );
}

type MainProps = {
    windowState: WindowState;
};

export default Main;