import '../App.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import PokemonFn from "../fns/pokemon";

const PLACEHOLDER_IMAGE_NAME = "placeholder-pokeball2.png";

const Img = styled.img`
  opacity: 1;
  max-height: 300px;
  min-height: 300px;

  ${props => props?.src?.includes(PLACEHOLDER_IMAGE_NAME) && css`
    //animation: App-logo-spin infinite 20s linear;
  `}
`;

export default function PokemonImage(props : any) {
  const [loaded, setLoaded] = useState(false);

  const isPlaceholder = props.placeholder && !loaded;

  // after loading once, do not go back to placeholder
  if (!props.placeholder && !loaded) {
    setLoaded(true);
  }

  // if the image is not a definite placehodler,
  // try to
  const src = (isPlaceholder)
    ? `/${PLACEHOLDER_IMAGE_NAME}`
    : (!!props.pokemon)
      ? PokemonFn.getImageUrl(props.pokemon)
      : props.src;

  const classes = [
    "is-inline-block",
    (isPlaceholder) ? "placeholder" : ""
  ];

//   return <Img
//      className={classes.join(" ")}
//      src={src}
//      loading="lazy"
//    />

  // TODO: the dedicated lazy component worked fine but worsened performance
  return <LazyLoadImage
    className="is-inline-block pokemon-image"
    src={src} // use normal <img> attributes as props
    placeholderSrc={`/${PLACEHOLDER_IMAGE_NAME}`}
    effect="opacity"
    width={300}
  />
}