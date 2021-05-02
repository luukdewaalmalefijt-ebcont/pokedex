import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';

import { IStat } from "pokeapi-typescript";

import PokemonFn from "../fns/pokemon";
import Utils from "../fns/util";

import PokemonStat from "./PokemonStat";

const List = styled.ul`
  li {
    list-style-type: none;
  }
`;

interface PokemonStatListProps {
   items: Array<any>
}

export default function PokemonStatList(props : any) {
  const items = props
    .items
    .map((stat : any, i : number) =>
      <li key={JSON.stringify(stat)}>
        <PokemonStat
          value={stat.base_stat}
          id={Utils.getId(stat.stat.name)}
          effort={stat.effort}
          name={stat.stat.name}
          index={i}
        />
      </li>
    );

  return <List>{items}</List>
}