import React, { useState, useEffect, useMemo } from 'react';

import logo from './logo.svg';
import './App.scss';
import PokemonFn from "./fns/pokemon";
import PokemonOverview from "./components/PokemonOverview";

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

  // index of current pokemon in view
  const [currentInView, setCurrentInView] = useState(0);

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
    const items = allPokemon?.results.map((pokemon, index) => {
      const img = PokemonFn.getImageUrl(pokemon);
      const renderImg = [currentInView-1, currentInView, currentInView+1].includes(index);

//       return <li key={pokemon.url}>
//         <img src={img} loading="lazy" height={150}/>
//         name: {pokemon.name}
//         url: {pokemon.url}
//       </li>

      return <PokemonOverview
        data={pokemon}
        index={index}
        loadImg={renderImg}
      />
    });

    return <ul>{items}</ul>
  }
}

export default App;
