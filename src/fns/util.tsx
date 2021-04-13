// @ts-nocheck

// https://jsfiddle.net/jonathansampson/m7G64/
function throttle (callback : any, limit : number) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call();           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

// https://dev.to/ibrahima92/build-a-sticky-navigation-bar-with-react-3bjh
function debounce(func : any, wait = 20, immediate = true) {
  let timeOut : any;

  return () => {
    let context = this,
      args = arguments;

    const later = () => {
      timeOut = null;
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeOut;

    clearTimeout(timeOut);

    timeOut = setTimeout(later, wait);

    if (callNow) func.apply(context, args)
  }
}

export default {
  throttle,
  debounce
}