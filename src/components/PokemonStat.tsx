import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import PokeAPI from "pokeapi-typescript";
import { Table } from 'react-bulma-components';

import Utils from "../fns/util";

import { IStat } from "pokeapi-typescript";

const Wrapper = styled.div`
  position: relative;

  .bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-radius: 50px;
  }

  h3 {
    color: white;
    position: relative;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

interface PokemonStatProps {
   name: string,
   value: number,
   id: number,
   effort: number,
   index: number
}

const COLORS = [
  // eye-hurting primary colors
//   "red",
//   "orange",
//   "yellow",
//   "magenta",
//   "pink",
//   "cyan"

  // color scheme based on sampling the hero image
  "#1e7bcb",
  "#95241c",
  "#33223d",
  "#a8851b",
  "#84468a",
  "#241b3d"
];

export default function PokemonStat(props : any) {
  const relSize = 25 + (((props.value || 0) / 255) * 100);

  const barStyle = {
    width: `${relSize}%`,
    minWidth: `${relSize}%`,
    backgroundColor: COLORS[props.index]
  };

  return <Wrapper>
    <div
      className="bar"
      data-value={props.value}
      data-size={relSize}
      style={barStyle}
    />
    <h3 className="px-4 py-2">{props.name}</h3>
  </Wrapper>
}