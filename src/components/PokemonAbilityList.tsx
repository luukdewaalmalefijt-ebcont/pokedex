import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';

import { IAbility } from "pokeapi-typescript";

import PokemonFn from "../fns/pokemon";
import AbilityFn from "../fns/ability";

import PokemonAbility from "./PokemonAbility";

const List = styled.ul`

`;

interface PokemonAbilityListProps {
  // what is passed here is a wrapper around an ability
  items: Array<any>
}

export default function PokemonAbilityList(props : any) {
  const items = props
    .items
    .map((ability : any) =>
      <li key={ability.ability.url}>
        <PokemonAbility
          ability={ability.ability}/>
      </li>
    );

  return <ul>{items}</ul>
}