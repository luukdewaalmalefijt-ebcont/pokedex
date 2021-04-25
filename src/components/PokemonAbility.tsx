import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import PokeAPI from "pokeapi-typescript";

import { IAbility } from "pokeapi-typescript";

import Utils from "../fns/util";
import PokemonFn from "../fns/pokemon";
import AbilityFn from "../fns/ability";

const List = styled.ul`
  color: white;
`;

interface PokemonAbilityProps {
   ability: IAbility
}

export default function PokemonAbility(props : any) {
  const [data, setData] = useState<IAbility>();

  useEffect(() => {
    PokeAPI
      .Ability
      .fetch(Utils.getId(props.ability.url))
      .then(setData)
  }, ["data"]);

  if (!!!data) {
    return <span className="ability loading"/>
  }

  const items = AbilityFn
    .getEntriesEn(data)
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