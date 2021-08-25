import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

import '../App.scss';
import Utils from "../fns/util";
import Filter from "./Filter";

import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";
import { Level } from "react-bulma-components";

const LevelItem = Level.Item;

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

// TODO: props typing
export default function Hero(props: any) {
  // TODO: use debounce to improve performance more
  const handleChange = (e : any) =>
    props.setNameFilter(e.target.value);

  const header = <h1 className="has-text-centered is-relative">
    Pokédex
  </h1>;

  const attribution = <span className="wallpaper-attribution">
    Copyright © WallpaperCave
  </span>;

  const body = <Level>
    <LevelItem className="has-text-centered">
      <Filter value={props.nameFilter} onChange={handleChange}/>
    </LevelItem>
  </Level>;

  return <PokemonHero>
    <PokemonMenuGradient/>
    <PokemonHeroGradient/>

    {header}
    {body}
    {attribution}
  </PokemonHero>;
}