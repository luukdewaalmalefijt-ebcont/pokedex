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

const Wrapper = styled.div`
  height: 100vh;
  width: 300vw;
  position: fixed;
  top: 0;
  bottom: 0;
  left: -100vw;
`;

interface PokemonListProps {
   data: INamedApiResourceList<IPokemon>,
   currentIndex: number,
   previousIndex: number
}

const normalizeIndex = (total : number, index : number) : number => {
  return (index < 0)
     ? total + index // add a negative
     : (
       (index >= total)
         ? index - total
         : index
     )
}

const initPokemonAt = (results : Array<INamedApiResource<IPokemon>>, index : number) : any => {
  const normalizedIndex = normalizeIndex(results.length, index);
  const pokemon : INamedApiResource<IPokemon> = results[normalizedIndex];

  if (!pokemon) {
    debugger;
    console.error(`could not find pokemon at index #${normalizedIndex}`);
  }

  const img = PokemonFn.getImageUrl(pokemon);

  return <PokemonOverview
    key={pokemon.name}
    data={pokemon}
    index={normalizedIndex}
  />
};

const nextIndex = (previous : number, current : number) : number => {
  if (previous <= current) {
    return current + 1
  }
  else {
    return current - 1
  }
}

function PokemonList(props : PokemonListProps) {
  // this should not be neccessary
  if (!props.data) {
    return <div>loading...</div>
  }

  const pokemonList = props.data.results;
  const previous = initPokemonAt(pokemonList, props.currentIndex-1);
  const current = initPokemonAt(pokemonList, props.currentIndex);
  const next = initPokemonAt(pokemonList, props.currentIndex+1)

  return <Wrapper>
    {previous}
    {current}
    {next}
  </Wrapper>
}

export default React.memo(PokemonList);
