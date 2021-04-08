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
import { Waypoint } from 'react-waypoint';

function App() {
  // loading state
  const [isLoading, setLoading] = useState(true);

  // result for allPokemon query
  const [allPokemon, setPokemonResult] = useState<INamedApiResourceList<IPokemon>>();

  // index of current pokemon in view
  const [currentInView, setCurrentInView] = useState(0);

  // the number of images to preload beyond the viewport
  const POKEMON_IMAGE_PRELOAD_BUFFER = 2;

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

      // preload 2 images before the current one if we scroll up
      // and 2 below it when we scroll down
      const renderImg = (
        index <= (currentInView + POKEMON_IMAGE_PRELOAD_BUFFER) &&
        index >= (currentInView - POKEMON_IMAGE_PRELOAD_BUFFER)
      );

      return <PokemonOverview
        data={pokemon}
        index={index}
        loadImg={renderImg}
        onView={() => {
          if (index > currentInView) {
            console.log(`updatting current view offset ${currentInView} to ${index}`);
            setCurrentInView(index);
          }
        }}
      />
    });

    return <ul>{items}</ul>
  }
}

export default App;
