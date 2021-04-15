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

  // index of current pokemon in view
  const [currentInView, setCurrentInView] = useState(0);

  // the number of images to preload beyond the viewport
  const POKEMON_IMAGE_PRELOAD_BUFFER = 2;

  console.log(`[RENDER] App`);

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

  const showNext = () => {
    let newIndex = currentInView + 1;

    if (newIndex >= POKEMON_COUNT) {
      newIndex = newIndex - POKEMON_COUNT;
    }

    setCurrentInView(newIndex);
  };

  const showPrevious = () => {
    let newIndex = currentInView - 1;

    // start over from end of list, creating infinite browse
    if (newIndex < 0) {
      newIndex = POKEMON_COUNT - newIndex;
    }

    setCurrentInView(newIndex);
  };

  const onScroll = ( e : any ) => {
    if (isLoading) return;

    console.log(`current: ${currentInView}`);

    (e.deltaY > 0)
      ? showNext()
      : showPrevious()
  };

  const onScrollThrottled = useThrottle(onScroll, 50);

  useEffect(
    Utils.globalUseEffectListener(
      "wheel",
      onScrollThrottled));

//   const content = <div>
//     <PokemonList data={allPokemon!}/>
//     <OverlayBlur/>
//     <PokemonMenu data={allPokemon!}/>
//   </div>;

  const content = <div>{currentInView}</div>;

  return (
    <LoadingScreen
        loading={isLoading}
        bgColor='#f1f1f1'
        spinnerColor='#c00'
        textColor='#676767'
        logoSrc='/placeholder-pokeball2.png'
        text='Welcome to EBCONT Pokedex'
      >
        {content}
    </LoadingScreen>
  )
}

export default App;
