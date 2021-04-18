import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

import logo from './logo.svg';
import './App.scss';
import Utils from "./fns/util";
import PokemonFn from "./fns/pokemon";
import PokemonList from "./components/PokemonList";
import PokemonOverview from "./components/PokemonOverview";
import PokemonMenu from "./components/PokemonMenu";
import useThrottle from "./hooks/throttle";

// while this TS wrapper is handy, I would have wrapped it
// in GraphQL, like this guy here: https://graphql-pokeapi.vercel.app/
// for even more convenience
import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";
import { Waypoint } from 'react-waypoint';
import LoadingScreen from 'react-loading-screen';

const OverlayBlur = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  // background-image: radial-gradient(circle, rgba(255, 255, 255, 0) 31%, rgba(100, 100, 100, 0.67) 93%);
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.3) 93%);
`;

function App() {
  // loading state
  const [isLoading, setLoading] = useState(true);

  // result for allPokemon query
  const [allPokemon, setPokemonResult] = useState<INamedApiResourceList<IPokemon>>();

  // constant for the number of pokemon on the set
  const [POKEMON_COUNT, setPokemonCount] = useState(0);

  // effect for first data load
  useMemo(() => {
    PokeAPI
      .Pokemon
      .listAll()
      .then((result) => {
        setPokemonResult(result);
        setLoading(false);
        setPokemonCount(result.results.length);
      });
  }, []);

  const menu = <PokemonMenu
    data={allPokemon!}
    currentIndex={0}
  />;

  const lister = <PokemonList
    data={allPokemon!}
    currentIndex={0}
    previousIndex={0}
  />;

  const overlayBlur = <OverlayBlur/>;

  const content = <div>
    {lister}
  </div>;

  return (
    // TODO: turn into own component so we can rid of the property
    // declarations here
    <LoadingScreen
        loading={isLoading}
        bgColor='#f1f1f1'
        spinnerColor='#c00'
        textColor='#676767'
        logoSrc='/placeholder-pokeball2.png'
        text='Welcome to EBCONT Pokedex'>
          {isLoading ? <span/> : content}
        </LoadingScreen>
  )
}

export default App;
