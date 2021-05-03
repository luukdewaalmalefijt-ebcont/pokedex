import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

import logo from './logo.svg';
import './App.scss';
import Utils from "./fns/util";
import PokemonFn from "./fns/pokemon";
import PokemonList from "./components/PokemonList";
import PokemonOverview from "./components/PokemonOverview";
import PokemonMenu from "./components/PokemonMenu";
import PokemonDetail from "./components/PokemonDetail";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import OverlayBlur from "./components/OverlayBlur"
import useThrottle from "./hooks/throttle";

// while this TS wrapper is handy, I would have wrapped it
// in GraphQL, like this guy here: https://graphql-pokeapi.vercel.app/
// for even more convenience.
// update 02/05/21: they now also have GQL: https://beta.pokeapi.co/graphql/console/
import PokeAPI from "pokeapi-typescript";

import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";
import { Waypoint } from 'react-waypoint';
import LoadingScreen from 'react-loading-screen';

function App() {
  // loading state
  const [isLoading, setLoading] = useState(true);

  // result for allPokemon query
  const [allPokemon, setPokemonResult]
    = useState<INamedApiResourceList<IPokemon>>();

  // constant for the number of pokemon on the set
  const [POKEMON_COUNT, setPokemonCount]
    = useState(0);

  // the pokemon instance to show in detail overlay
  const [detailPokemon, setDetailPokemon]
    = useState<INamedApiResource<IPokemon>>();

  // pokemon name to filter on. Just a nice-to-have
  const [nameFilter, setNameFilter]
    = useState("");

  // effect for first data load
  useMemo(() => {
    PokeAPI
      .Pokemon
      .listAll()
      .then((result) => {
        setPokemonResult(result);
        setLoading(false);
        setPokemonCount(result
          .results
          .length);
      });
  }, []);

  const openDetails = (pokemon : INamedApiResource<IPokemon>) => {
    document
      .documentElement
      .classList
      .add(
        'no-scroll');

    setDetailPokemon(pokemon);
  };

  const closeDetails = () => {
    document
      .documentElement
      .classList
      .remove(
        'no-scroll');

    setDetailPokemon(undefined)
  };

  const menu = <PokemonMenu
    data={allPokemon!}
    currentIndex={0}
  />;

  const lister = <PokemonList
    data={allPokemon!}
    currentIndex={0}
    previousIndex={0}
    onShowDetail={openDetails}
    detailsOpened={!!detailPokemon}
    filter={nameFilter}
  />;

  const detailView = <PokemonDetail
    pokemon={detailPokemon}
    onDismiss={closeDetails}
  />

  const hero = <Hero
    nameFilter={nameFilter}
    setNameFilter={setNameFilter}
  />;

  const content = <div>
    {hero}
    {lister}
    {detailView}
  </div>;

  return <Loader
    isLoading={isLoading}
    content={content}
  />
}

export default App;
