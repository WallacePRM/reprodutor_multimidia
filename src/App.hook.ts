import { useEffect, useState } from "react";
import { delay } from './common/utils';

export function useWindowState() {

    const [ containerMargin, setContainerMargin ] = useState(3);
    const [ windowFocused,  setWindowFocused ]  = useState(true);

    useEffect(() => {
      window.addEventListener('resize', () => {
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
      });
      window.onfocus = function() {

        setWindowFocused(true);
      };
      window.onblur = function() {

        setWindowFocused(false);
      };
    }, []);

    return [
      containerMargin,
      setContainerMargin,
      windowFocused,

    ]
  };
