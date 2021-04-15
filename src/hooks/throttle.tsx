// @ts-nocheck

import React, { useState, useEffect, useMemo } from 'react';

// https://stackoverflow.com/a/66317405/399058
export default function useThrottle (func : any, delay = 200) {
  const [timeout, saveTimeout] = useState(null);

  const throttledFunc = function () {
    if (timeout) {
      clearTimeout(timeout);
    }

    else {
      func(...arguments);
    }

    const newTimeout = setTimeout(() => {
      func(...arguments);

      if (newTimeout === timeout) {
        saveTimeout(null);
      }
    }, delay);

    saveTimeout(newTimeout);
  }

  return throttledFunc;
}