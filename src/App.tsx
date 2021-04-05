import React, { useState, useEffect, useMemo } from 'react';

import logo from './logo.svg';
import './App.scss';

// while this TS wrapper is handy, I would have wrapped it
// in GraphQL, like this guy here: https://graphql-pokeapi.vercel.app/
// for even more convenience
import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";

function App() {
  // loading state
  const [isLoading, setLoading] = useState(true);

  // result for allPokemon query
  const [allPokemon, setPokemonResult] = useState<INamedApiResourceList<IPokemon>>();

  // effect for first data load
  useMemo(() => {
    PokeAPI
      .Pokemon
      .listAll()
      .then((result) => {
        setPokemonResult(result);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  else {
    const items = allPokemon?.results.map((pokemon) => {
      return <li key={pokemon.url}>
        name: {pokemon.name}
        url: {pokemon.url}
      </li>
    });

    return <ul>{items}</ul>
  }
}

export default App;
