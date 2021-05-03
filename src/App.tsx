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
import useThrottle from "./hooks/throttle";

// while this TS wrapper is handy, I would have wrapped it
// in GraphQL, like this guy here: https://graphql-pokeapi.vercel.app/
// for even more convenience.
// update 02/05/21: they now also have GQL: https://beta.pokeapi.co/graphql/console/
import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";
import { Waypoint } from 'react-waypoint';
import LoadingScreen from 'react-loading-screen';

// blur used for nice overlay effect so the viewer doesnt get
// distracted with the outstanding Pokemon Tiles
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

const PokemonHero = styled.div`
  background: url('https://wallpapercave.com/wp/zHsOYE4.jpg');
  background-size: cover;
  height: 70vh;
  position: relative;

  h1 {
    color: white;
    font-weight: bold;
    font-size: 40px;
  }

  .level {
    height: 65vh;
    .name-filter {
      max-width: 600px;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }
  }

  .wallpaper-attribution {
    position: absolute;
    right: 20px;
    bottom: 20px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 11px;
    z-index: 9;
  }
`;

// gradient for the hero image so it nicely goes towards the black background behind the Pokemon Tiles
const PokemonHeroGradient = styled.div`
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

// gradient to make sure top menu items op out nicely
const PokemonMenuGradient = styled.div`
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
  position: absolute;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  right: 0;
`;

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
        setPokemonCount(result.results.length);
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

  // TODO: move to filter input component
  // TODO: use debounce to improve performance more
  const handleChange = (e : any) => setNameFilter(e.target.value);

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

  const overlayBlur = <OverlayBlur/>;

  const detailView = <PokemonDetail
    pokemon={detailPokemon}
    onDismiss={closeDetails}
  />

  const hero = <PokemonHero>
    <PokemonMenuGradient/>
    <PokemonHeroGradient/>
    <h1 className="has-text-centered is-relative">Pokédex</h1>
    {/* TODO: use Bulma component */}
    <div className="level">
      <div className="level-item has-text-centered">
        <input
          className="input is-large name-filter"
          type="text"
          placeholder="Pokemon name..."
          value={nameFilter}
          onChange={handleChange}
        />
      </div>
    </div>
    <span className="wallpaper-attribution">Copyright © WallpaperCave</span>
  </PokemonHero>;

  const content = <div>
    {hero}
    {lister}
    {detailView}
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
