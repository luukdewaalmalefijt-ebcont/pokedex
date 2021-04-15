// @ts-nocheck

function globalUseEffectListener(eventName, callback) {
  return () => {
    window
      .addEventListener(
        eventName,
        callback);

    return () => {
      window
        .removeEventListener(
          eventName,
          callback);
    }
  }
}

// https://jsfiddle.net/jonathansampson/m7G64/
// TODO: this impl seems to not correctly pass events
function throttle (callback : any, limit : number) {
    var wait = false;                  // Initially, we're not waiting
    return function (evt) {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call(evt);           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

function throttle2(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
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
  globalUseEffectListener,
  throttle, throttle2,
  debounce
}