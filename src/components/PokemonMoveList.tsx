import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';

import { IMove } from "pokeapi-typescript";

import PokemonFn from "../fns/pokemon";
import MoveFn from "../fns/ability";

import PokemonMove from "./PokemonMove";

const List = styled.ul`
  li {
    list-style-type: none;
  }
`;

interface PokemonMoveListProps {
   items: Array<any>
}

export default function PokemonMoveList(props : any) {
  const items = props
    .items
    .map((move : any) =>
      <li key={JSON.stringify(move)}>
        <PokemonMove move={move.move}/>
      </li>
    );

  return <List>{items}</List>
}