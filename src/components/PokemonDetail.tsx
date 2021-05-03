import '../App.scss';
import styled, { css } from 'styled-components';
import 'bulma/bulma.sass';
import React, { useState, useEffect, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource, IAbility, IType, IMove, IStat } from "pokeapi-typescript";
import { Tabs, Image } from 'react-bulma-components';

import Utils from "../fns/util";
import PokemonFn from "../fns/pokemon";
import AbilityFn from "../fns/ability";

import PokemonImage from "./PokemonImage";
import PokemonAbilityList from "./PokemonAbilityList";
import PokemonTypeList from "./PokemonTypeList";
import PokemonMoveList from "./PokemonMoveList";
import PokemonStatList from "./PokemonStatList";
import PokemonEvolutionPane from "./PokemonEvolutionPane";
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
  position: fixed;
  //left: -100vw;
  top: 0;
  //bottom: 0;
  z-index: -1;
  transition: left 0.5s;
  overflow-y: scroll;
  overflow-x: hidden;
  color: white;

  .background {
    //background: url(${tileBackground});
    background-repeat: no-repeat;
    background-size: cover;
    //filter: blur(15px);
    background: rgba(0, 0, 0, 0.65);
    position: fixed;
    top: 0;
    width: 40%;
    left: 0;
    bottom: 0;
    // https://stackoverflow.com/a/5115490/399058
    box-shadow: 10px 0 5px -2px rgba(0, 0, 0, 0.3);
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

    // TODO: replace with bulma
    h2, .tabs li a {
      color: white;
      font-weight: bold;
      transition: all 0.75s;
    }

    .tabs {
      li.is-active a, li:hover a {
        color: #666;
      }
    }

    ul {
      margin: 0;
    }
  }

  &.show {
    z-index: 99;
    //left: 0;

    & > .content {
      left: 0;
    }
  }

  // the floating pokemon image is a bit funky
  // and might have a padding or margin overlapping the tabs bar.
  // so ignore pointer events on the container
  .image-header {
    pointer-events: none;
  }

  .detail-image {
    margin: 0;
    margin-left: 5vw;

    img {
      border: 5px solid rgba(255, 255, 255, 0.7);
      background: rgba(255, 255, 255, 0.2);
      padding: 10%;
      max-height: 40vh;
      max-width: 40vh;
      box-shadow: rgba(0, 0, 0, 1) 0px 60px 40px -7px;
      transition: all 0.75s;

      @keyframes chillHovering {
        0% {
          margin-top: 0px;
        }
        100% {
          margin-top: -25px;
        }
      }

      animation-name: chillHovering;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-direction: alternate;

      &:hover {
        transform: scale(1.05);
        box-shadow: rgba(0, 0, 0, 1) 0px 70px 40px -10px;
        filter: drop-shadow(0.4rem 0.4rem 0.45rem rgba(0, 0, 30, 0.5));
      }
    }

    /* fix strange extra margin */
    margin-bottom: -20vh;
  }
`;

interface PokemonDetailProps {
   pokemon: INamedApiResource<IPokemon>,
   onDismiss: any
}

const TAB_ABILITY     = 'ability';
const TAB_MOVES       = 'moves';
const TAB_EVOLUTIONS  = 'evolutions';
const TAB_STATS       = 'stats';

// typings for tab pane index
type TabKey
  = typeof TAB_ABILITY
  | typeof TAB_MOVES
  | typeof TAB_EVOLUTIONS
  | typeof TAB_STATS
  ;

type TabPanes = {[key in TabKey]: any};

export default function PokemonDetail(props : any) {
  const [ability, setAbility] = useState<IAbility>();
  const [stats, setStats] = useState<IStat>();
  const [details, setDetails] = useState<IPokemon>();
  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ABILITY);

  // helper for dumping api response data when debugging
  const logAndSet = (setter : any, desc : string) => {
    return (data : any) => {
      console.log(desc + ":");
      console.log(data);
      return setter(data);
    }
  };

  useEffect(() => {
    if (props.pokemon /*&& !!!ability*/) {
      PokeAPI
        .Pokemon
        .fetch(PokemonFn.getIndex(props.pokemon))
        .then(setDetails)
    }
  }, [props]);

  // edge case that should not happen
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
  const abilityEl = <PokemonAbilityList items={(details?.abilities || [])}/>;

  // tag element for its type
  const typeEl = <PokemonTypeList items={(details?.types || [])}/>;

  // pane element for moves
  const movesEl = <PokemonMoveList items={(details?.moves || [])}/>;

  // pane element for stats
  const statsEl = <PokemonStatList items={(details?.stats || [])}/>;

  // pane for evolutions
  const evolutionsEl = <PokemonEvolutionPane pokemon_details={details}/>;

  // switchboard for all tab panes
  const panes : TabPanes = {
    'ability': abilityEl,
    'moves': movesEl,
    'stats': statsEl,
    'evolutions': evolutionsEl
  };

  // generate click handler for tab
  const tabActivatorFor = (tab : TabKey) => (
    () =>
      setActiveTab(tab));

  const tabsComponent = <>
    <Tabs fullwidth align="center" type="boxed">
      <Tab active={activeTab == TAB_ABILITY} onClick={tabActivatorFor(TAB_ABILITY)}>
        Ability
      </Tab>
      <Tab active={activeTab == TAB_MOVES} onClick={tabActivatorFor(TAB_MOVES)}>
        Moves
      </Tab>
      <Tab active={activeTab == TAB_EVOLUTIONS} onClick={tabActivatorFor(TAB_EVOLUTIONS)}>
        Evolutions
      </Tab>
      <Tab active={activeTab == TAB_STATS} onClick={tabActivatorFor(TAB_STATS)}>
        Stats
      </Tab>
    </Tabs>

    {/* active tab content */}
    {panes[activeTab]}
  </>

  const style = {
//     marginTop: `${initialOffset}px`
  };

  return <Wrapper className="detail-view show columns" style={style}>
    {/* first column */}
    <div className="content column is-two-fifths is-relative">
      <div className="background"/>

      <div className="inner px-6 py-3 is-relative">
        {/* pokemon main image */}
        <div className="px-6 pt-6 image-header">
          {image}
        </div>

        {/* pokemon name */}
        <h2 className="is-relative is-title is-2">
          #{index} {props.pokemon.name} {typeEl}
        </h2>

        {/* tab panels */}
        {tabsComponent}
      </div>
    </div>

    {/* second column */}
    <div className="column is-three-fifths" onClick={props.onDismiss}>
      <BlurBackground/>
    </div>
  </Wrapper>
}