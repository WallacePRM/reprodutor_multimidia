import React, { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";

import PreLoad from '../../components/PreLoad';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import Logo from '../../components/Logo';
import ToggleSidebar from '../../components/ToggleSidebar';
import PreviousRouter from '../../components/PreviousRouter';
import { WindowState } from '../../App.hook';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSidebarOpened } from '../../store/sidebarOpened';
import { useSelector } from 'react-redux';
import { selectContainerMargin } from '../../store/containerMargin';
import { selectMedias, setMedias } from '../../store/medias';
import { getMediaService } from '../../service/media';
import { getPlayerService } from '../../service/player';
import { getPageService } from '../../service/page';
import { setMediaPlaying } from '../../store/mediaPlaying';
import { setCurrentMedias } from '../../store/player';
import { setPlayerState } from '../../store/playerState';
import { setPlayerConfig } from '../../store/playerConfig';
import { setPageConfig } from '../../store/pageConfig';
import { selectSelectedFiles, setSelectedFiles } from '../../store/selectedFiles';

function Main(props: MainProps) {

    const [windowFocused] = props.windowState;
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const containerMargin = useSelector(selectContainerMargin);
    const selectedItems = useSelector(selectSelectedFiles);
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

                const playerService = getPlayerService();
                const playerState = await playerService.getLastMedia();
                const playerConfig = await playerService.getPlayerConfig();

                const pageConfig = await getPageService().getPageConfig();

                if (pageConfig) {
                    dispatch(setPageConfig(pageConfig));
                }

                if (playerConfig) {
                    dispatch(setPlayerConfig(playerConfig));
                }

                if (playerState) {
                    dispatch(setPlayerState(playerState));

                    const media = result.find(item => item.id === playerState.file_id) || null;
                    dispatch(setCurrentMedias(media ? [media] : null));
                    dispatch(setMediaPlaying(media));
                }

                setIsLoading(false);
            }
            catch (error) {
                console.log(error);

                throw new Error("Falha ao baixar mídias");
            }
        };

        getMedias();
    }, []);

    useEffect(() => {

        const resetSelectedItems = () => {
            dispatch(setSelectedFiles([]));
        };

        if (selectedItems.length > 0) {
            resetSelectedItems();
        }
    }, [location.pathname]);

    useEffect(() => {

        const setDefaultRoute = () => {

            const lastRoute = location.pathname;
            localStorage.setItem('lastRoute', lastRoute);
        };

        setDefaultRoute();
    }, [location]);

    if (isLoading) {
        return <PreLoad />
    }
    return (
        <div className={'c-app noselect' + (windowFocused ? '' : ' window--unfocused')}>
            <main id="popup-root" className="c-app__content">
                <Sidebar />
                <div style={{ marginLeft: `${containerMargin.margin}rem` }} className="c-container">
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