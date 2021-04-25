// @ts-nocheck

// helper for common pattern of registering global event handler
// in useEffect, and deregistering it upon de-render
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

function getId(url : string) : number {
  const parts = url.split("/");
  return parseInt(parts[parts.length-2]) // 2 due to trailing slash
}

function filterI18NEntriesEN(entrylist: Array<any>) : Array<any> {
  return entrylist
    .filter(entry =>
      "en" == entry
        .language
        .name)
}

function getI18NEntryEN(entrylist: Array<any>) : string {
  return filterI18NEntriesEN(entrylist)[0].name
}

function capitalize(s) : string {
  return s.replace(/^\w/, c => c.toUpperCase())
}

// https://stackoverflow.com/a/37644329/399058
function* chunkArrayInGroups(arr : any, size : number) {
  for (var i=0; i<arr.length; i+=size)
    yield arr.slice(i, i+size);
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

const normalizeIndex = (total : number, index : number) : number => {
  return (index < 0)
     ? total + index // add a negative
     : (
       (index >= total)
         ? index - total
         : index
     )
}

const nextIndex = (previous : number, current : number) : number => {
  if (previous <= current) {
    return current + 1
  }
  else {
    return current - 1
  }
}

export default {
  // hook utils
  globalUseEffectListener,

  // perf
  throttle, throttle2,
  debounce,

  // arrays
  chunkArrayInGroups,

  // indexes
  normalizeIndex,
  nextIndex,
  getId,

  // manip
  capitalize,

  // i18n
  filterI18NEntriesEN,
  getI18NEntryEN,
}