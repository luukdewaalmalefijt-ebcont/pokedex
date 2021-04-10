import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

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

const OverlayBlur = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background-image: radial-gradient(circle, rgba(255, 255, 255, 0) 31%, rgba(100, 100, 100, 0.67) 93%);
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.3) 93%);
`;

const Index = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
`;

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
    // TODO: turn into own component
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

    // clone resultset to prevent sorting the original reference
    // and messing up the "natural" pokedex order
    const indexPokemon = PokemonFn.cloneResultSet(allPokemon);

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
        return <li><a href="#">{pokemon.name}</a></li>
      });

    return <div>
      <Index className="index">
        {indexItems}
      </Index>
      <ul>
        {items}
      </ul>
      <OverlayBlur/>
    </div>
  }
}

export default App;
