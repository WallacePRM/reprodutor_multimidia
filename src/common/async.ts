export const delay = (() => {

  let timer: any = 0;
  return (callback: any, ms: number) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
