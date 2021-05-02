import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import PokeAPI from "pokeapi-typescript";
import { Table } from 'react-bulma-components';

import Utils from "../fns/util";
import PokemonType from "./PokemonType";

import { IPokemonSpecies, IPokemon, IEvolutionChain, IChainLink } from "pokeapi-typescript";

const Wrapper = styled.ul`
  &[data-root="true"] > .arrow {
    display: none;
  }

  .arrow {
    font-weight: bold;
    font-size: 30px;
  }

  li {
    list-style-type: none;
  }
`;

interface PokemonEvolutionProps {
   data: IChainLink,
   root: boolean
}

export default function PokemonEvolution(props : any) {
  const subEvolutions = props
    .data
    .evolves_to
    .map((link : IChainLink, i : number) =>
      <li key={i} className="subevolution mx-4">
        <PokemonEvolution data={link}/>
      </li>);

  const name = props.data.species.name;

  // TODO: load pokemon image
  return <Wrapper className="evolution" data-root={props.root}>
    <span className="arrow">↳</span>
    {name}
    {subEvolutions}
  </Wrapper>
}