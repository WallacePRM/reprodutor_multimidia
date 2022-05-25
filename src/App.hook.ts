import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { delay } from './common/utils';
import { setContainerMargin } from "./store/containerMargin";
import { setSidebarOpened, toggleSidebar } from "./store/sidebarOpened";

export function useWindowState(): WindowState {

  const [ windowFocused, setWindowFocused ] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {

    window.onfocus = function () {

      setWindowFocused(true);
    };
    window.onblur = function () {

      setWindowFocused(false);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      delay(() => {
        if (document.body.clientWidth < 1000) {
          if (document.body.clientWidth <= 655) {
            dispatch(setContainerMargin({ margin: 0 }));
          }
          else {
            dispatch(setContainerMargin({ margin: 3 }));
          }
        }

        if (document.body.clientWidth >= 1000) {
          dispatch(setContainerMargin({ margin: 20 }));
        }

        dispatch(setSidebarOpened({ isOpened: false }));
      }, 0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return [
    windowFocused,
  ]
};

export type WindowState = [ boolean ];