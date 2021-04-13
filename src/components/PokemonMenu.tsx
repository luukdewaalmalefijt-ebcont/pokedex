import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

import '../App.scss';
import PokemonFn from "../fns/pokemon";
import PokemonOverview from "./PokemonOverview";

// while this TS wrapper is handy, I would have wrapped it
// in GraphQL, like this guy here: https://graphql-pokeapi.vercel.app/
// for even more convenience
import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";

const Index = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(50, 50, 50, 0.8);
  padding: 15px;

  &:hover {
    rgba(50, 50, 50, 1);
  }
`;

const IndexItem = styled.li`
  //
`;

const IndexItemLink = styled.a`
  color: white;
  font-weight: 600;
  //font-size: 12px;

  &:hover {
    font-weight: bold;
    color: red;
  }
`;

interface PokemonMenuProps {
  data: INamedApiResourceList<IPokemon>;
}

function PokemonMenu(props : PokemonMenuProps) {
  // clone resultset to prevent sorting the original reference
  // and messing up the "natural" pokedex order
  const indexPokemon = PokemonFn.cloneResultSet(props.data);

  // sort resultset copy for index
  indexPokemon
    ?.results
    ?.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

  // TODO: turn into own component
  const indexItems = indexPokemon
    ?.results
    ?.map((pokemon, index) => {
      return <IndexItem key={"index-" + pokemon.name} className="is-block">
        <IndexItemLink className="is-size-7" href="#">{pokemon.name}</IndexItemLink>
      </IndexItem>
    });

  return <Index className="index">
    {indexItems}
  </Index>
}

export default React.memo(PokemonMenu);
