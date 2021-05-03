import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

// blur used for nice overlay effect so the viewer doesnt get
// distracted with the outstanding Pokemon Tiles
const OverlayBlurEl = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  // background-image: radial-gradient(circle, rgba(255, 255, 255, 0) 31%, rgba(100, 100, 100, 0.67) 93%);
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.3) 93%);
`;

export default function OverlayBlur() {
  return <OverlayBlurEl/>
}