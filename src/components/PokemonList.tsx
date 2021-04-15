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

interface PokemonListProps {
   data: INamedApiResourceList<IPokemon>;
}

function PokemonList(props : PokemonListProps) {
  console.log(`[RENDER] PokemonList`);

  const items = props.data?.results.map((pokemon, index) => {
    const img = PokemonFn.getImageUrl(pokemon);

    return <PokemonOverview
        key={pokemon.name}
        data={pokemon}
        index={index}

        onView={() => {
          //setCurrentInView(index);
        }}
      />
  });

  return <ul>
    {items}
  </ul>
}

export default React.memo(PokemonList);
