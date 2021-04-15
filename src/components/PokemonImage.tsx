import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import PokemonFn from "../fns/pokemon";

const PLACEHOLDER_IMAGE_NAME = "placeholder-pokeball2.png";

const Img = styled.img`
  opacity: 1;
  height: 300px;

  ${props => props?.src?.includes(PLACEHOLDER_IMAGE_NAME) && css`
    //animation: App-logo-spin infinite 20s linear;
  `}
`;

// TODO: use onLoad to detect when the real iage has actually loaded:
// https://www.javascriptstuff.com/detect-image-load/
// https://github.com/DeedMob/react-load-image
// https://codeburst.io/how-to-progressively-load-images-in-react-using-hooks-80c50fd447cd
export default function PokemonImage(props : any) {
  const [loaded, setLoaded] = useState(false);

  const isPlaceholder = props.placeholder && !loaded;

  //console.log(`[RENDER] PokemonImage`);

  // after loading once, do not go back to placeholder
  if (!props.placeholder && !loaded) {
    setLoaded(true);
  }

  const src = (isPlaceholder)
    ? `/${PLACEHOLDER_IMAGE_NAME}`
    : props.src;

  const classes = [
    "is-inline-block",
    (isPlaceholder) ? "placeholder" : ""
  ];

  return <Img
     className={classes.join(" ")}
     src={src}
     loading="lazy"
   />

  // TODO: the dedicated lazy component worked fine but worsened performance
//     return <LazyLoadImage
//       className="is-inline-block"
//        height={300}
//        src={props.src} // use normal <img> attributes as props
//        placeholderSrc={`/${PLACEHOLDER_IMAGE_NAME}`}
//        visibleByDefault={!props.placeholder}
//        //width={image.width}
//     />
}