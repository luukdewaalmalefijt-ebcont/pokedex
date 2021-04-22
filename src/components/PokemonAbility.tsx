import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';

import { IAbility } from "pokeapi-typescript";

import PokemonFn from "../fns/pokemon";
import AbilityFn from "../fns/ability";

const List = styled.ul`
  color: white;
`;

interface PokemonAbilityProps {
   ability: IAbility
}

export default function PokemonAbility(props : any) {
  const items = AbilityFn
    .getEntriesEn(props.ability)
    .map((entry, i) =>
      <li key={i}>
        <span className="long">
          {entry.effect}
        </span>
        <span className="short">
          {entry.short_effect}
        </span>
      </li>)

  return <List className="ability is-relative">
    {items}
  </List>
}