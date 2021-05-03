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
`;

interface ImageProps {
  placeholder: boolean;
  src?: string;
  pokemon?: any; //todo typing
  // todo: currently unused
  height?: number;
}

// due to being one of the oldest components
// this is tightly coupled with an instance of IPokemon
// TODO: decouple in general generic Image component,
// and secondly a Pokemon-specific one that parses a pokemon instance
export default function PokemonImage(props : ImageProps) {
  const [loaded, setLoaded] = useState(false);

  const isPlaceholder = props.placeholder && !loaded;

  // after loading once, do not go back to placeholder
  if (!props.placeholder && !loaded) {
    setLoaded(true);
  }

  const src = (isPlaceholder)
    ? `/${PLACEHOLDER_IMAGE_NAME}`
    : (!!props.pokemon)
      ? PokemonFn.getImageUrl(props.pokemon)
      : props.src;

  const classes = [
    "is-inline-block",
    (isPlaceholder) ? "placeholder" : ""
  ];

  return <LazyLoadImage
    className="is-inline-block pokemon-image"
    src={src} // use normal <img> attributes as props
    placeholderSrc={`/${PLACEHOLDER_IMAGE_NAME}`}
    effect="opacity"
    width={300}
  />
}