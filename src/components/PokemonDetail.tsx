import '../App.scss';
import styled, { css } from 'styled-components';
import 'bulma/bulma.sass';
import React, { useState, useEffect, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource, IAbility, IType, IMove } from "pokeapi-typescript";
import { Tabs, Image } from 'react-bulma-components';

import PokemonFn from "../fns/pokemon";
import AbilityFn from "../fns/ability";
import PokemonImage from "./PokemonImage";
import PokemonAbility from "./PokemonAbility";
import PokemonType from "./PokemonType";
import PokemonMoves from "./PokemonMoves";
import tileBackground from "../backgrounds/a305ae5e100f5f9086469496e56ec696c872e3ad_hq.jpg";

const Tab = Tabs.Tab;

const BlurBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  // todo
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  //left: -100vw;
  top: 0;
  //bottom: 0;
  z-index: -1;
  transition: left 0.5s;
  overflow-y: scroll;
  overflow-x: hidden;

  // TODO: replace with bulma
  h2 {
    color: white;
  }

  .background {
    //background: url(${tileBackground});
    background-repeat: no-repeat;
    background-size: cover;
    //filter: blur(15px);
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    width: 40%;
    left: 0;
    bottom: 0;
  }

  & > .content {
    z-index: 99;
    height: 100vh;
    width: 40vw;
    left: -40vw;
    transition: left 1s;
    //box-shadow: rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    //background: black;
    //filter: blur(0);
  }

  &.show {
    z-index: 99;
    //left: 0;

    & > .content {
      left: 0;
    }
  }

  .detail-image {
    img {
      background: rgba(255, 255, 255, 0.3);
      padding: 10%;
      max-height: 50vh;
    }
  }
`;

interface PokemonDetailProps {
   pokemon: INamedApiResource<IPokemon>,
   onDismiss: any
}

// typings for tab pane index
type TabKey = 'ability' | 'moves';
type TabPanes = {[key in TabKey]: any};

export default function PokemonDetail(props : any) {
  const [ability, setAbility] = useState<IAbility>();
  const [type, setType] = useState<IType>();
  const [moves, setMoves] = useState<IMove>();
  const [activeTab, setActiveTab] = useState<TabKey>("ability");

  useEffect(() => {
    if (props.pokemon && !!!ability) {
      const index = PokemonFn.getIndex(props.pokemon);

      // load pokemon abilities
      PokeAPI
        .Ability
        .fetch(index)
        .then(setAbility);

      // load type
      PokeAPI
        .Type
        .fetch(index)
        .then(setType);

      // load moves
      PokeAPI
        .Move
        .fetch(index)
        .then(setMoves);
    }
  });

  // edge case that shoujld not happen
  if (!props.pokemon) {
    return <Wrapper className="detail-view hidden">
      no pokemon selected
    </Wrapper>
  }

  // absolute index of pokemon in pokedex
  const index = PokemonFn.getIndex(props.pokemon);

  // main pokemon image
  const image = <Image
    rounded
    size="1by1"
    src={PokemonFn.getImageUrl(props.pokemon)}
    className="detail-image is-relative"
  />;

  // description of its abilities
  const abilityEl = (!!!ability) ? <span/> : <PokemonAbility ability={ability}/>

  // tag element for its type
  const typeEl = (!!!type) ? <span/> : <PokemonType type={type}/>

  // pane element for moves
  const movesEl = (!!!moves) ? <span/> : <PokemonMoves moves={moves}/>

  // switchboard for all tab panes
  const panes : TabPanes = {
    'ability': abilityEl,
    'moves': movesEl
  };

  return <Wrapper className="detail-view show columns">
    {/* first column */}
    <div className="content column is-two-fifths is-relative">
      <div className="background"/>

      <div className="inner px-6 py-3">
        {/* pokemon main image */}
        <div className="px-6 py-6">
          {image}
        </div>

        {/* pokemon name */}
        <h2 className="is-relative is-title is-2">
          #{index} {props.pokemon.name} {typeEl}
        </h2>

        {/* tab panels */}
        <div>
          {/* active tab content */}
          {panes[activeTab]}

          <Tabs fullwidth align="center" type="toggle">
            <Tab active={activeTab == "ability"}>
              Ability
            </Tab>
            <Tab active={activeTab == "moves"}>
              Moves
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>

    {/* second column */}
    <div className="column is-three-fifths" onClick={props.onDismiss}>
      <BlurBackground/>
    </div>
  </Wrapper>
}