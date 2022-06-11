export const checkNearToBottom = (element: any, diff?: number) => {

    const documentHeight = element.scrollHeight - (diff || 0);
    const currentScroll = element.scrollTop + element.offsetHeight;

    return currentScroll >= documentHeight;
};

export const isVisible = (elem: HTMLElement) => {
    if (!(elem instanceof HTMLElement)) throw Error('DomUtil: elem is not an element.');
    const style: any = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
      elem.getBoundingClientRect().width === 0) {
      return false;
    }
    const elemCenter   = {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer: any = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
      if (pointContainer === elem) return true;
    }
    while (pointContainer = pointContainer?.parentNode);
    return false;
};

export const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};