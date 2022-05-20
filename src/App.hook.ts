import { useEffect, useRef, useState } from "react";
import { delay } from './common/utils';

export function useWindowState(): WindowState {

  const [containerMargin, setContainerMargin] = useState(3);
  const [playerTransparent, setPlayerTransparent] = useState(false);
  const [windowFocused, setWindowFocused] = useState(true);

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
            setContainerMargin(0);
          }
          else {
            setContainerMargin(3);
          }
        }

        if (document.body.clientWidth >= 1000) {
          setContainerMargin(20);
        }
      }, 0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [ setContainerMargin ]);

  return [
    containerMargin,
    setContainerMargin,
    windowFocused,
    playerTransparent,
    setPlayerTransparent
  ]
};

export type WindowState = [ number, (n: number) => void, boolean, boolean, (p: boolean) => void ];