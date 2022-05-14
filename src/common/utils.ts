export const delay = (function() {
    var timer: any = 0;
    return function(callback: any, ms: number){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();