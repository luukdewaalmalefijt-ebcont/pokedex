import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { Tile } from 'react-bulma-components';

import '../App.scss';
import tileBackground from "../backgrounds/dbvfogs-4f2c3dd5-b13e-49c3-8e41-150a7ed95c01.jpg";
import PokemonFn from "../fns/pokemon";
import PokemonOverview from "./PokemonOverview";
import PokemonImage from "./PokemonImage";
import Utils from "../fns/util";

// while this TS wrapper is handy, I would have wrapped it
// in GraphQL, like this guy here: https://graphql-pokeapi.vercel.app/
// for even more convenience
import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";

const Wrapper = styled.div`
  transition: filter 1s;
  position: relative;

  &.details-opened {
    filter: blur(5px);
    pointer-events: none;
  }

  .tile-background {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    bottom: 0;
    //background-image: url('/static/media/a305ae5e100f5f9086469496e56ec696c872e3ad_hq.jpg');
    background-image: url(${tileBackground});
    background-repeat: no-repeat;
    //background-attachment: fixed;
    background-size: cover;
    filter: blur(7px);
    transition: all 0.75s;
  }

  .pokemon-tile {
    transition: all 0.75s;

    .box {
      transition: all 0.75s;
      border-radius: 7px;
      border: 5px solid #333;
      box-sizing: border-box;
    }

    h2 {
      transition: all 0.75s;
      color: white;
      font-weight: bold;
      opacity: 0.7;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }

    img.pokemon-image {
      transition: all 0.7s;
      max-height: 250px;
      min-height: 250px;
      opacity: 0.8;
    }

    &:not(.details-opened):hover {
      .box {
        transform: scale(1.1) rotate(-5deg);
        z-index: 5;
        border: 5px solid rgba(255, 255, 255, 0.7);

        box-shadow: rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

        h2 {
          opacity: 1;
          z-index: 6;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
        }

        .tile-background {
          //transition: all 0.75s;
          filter: blur(0px);
        }

        img.pokemon-image {
          opacity: 1;
          z-index: 6;
          filter: drop-shadow(0.4rem 0.4rem 0.45rem rgba(0, 0, 30, 0.5));
        }
      }
    }
  }

  /* This fires as soon as the element enters the DOM */
  .pokemon-item-enter{
    opacity: 0;
    transition: all;
    position: relative;
    top: 300px;
  }

  /* This is where we can add the transition*/
  .pokemon-item-enter-active{
    opacity: 1;
    top: 0;
  }

  /* This fires as soon as the element is invisible */
  .pokemon-item-exit{

  }

  /* fires as element leaves the DOM*/
  .pokemon-item-exit-active{
    opacity: 0;
    top: 300px;
  }
`;

const ListerTopGradient = styled.div`
    background: rgb(0,0,0);
    /* thank you https://cssgradient.io/ */
    background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
    position: absolute;
    width: 100%;
    height: 70vh;
    top: 0;
    left: 0;
    right: 0;
`;

// the number of tiles to use horizontally
const TILE_COUNT_ROW = 4;

interface PokemonListProps {
   data: INamedApiResourceList<IPokemon>,
   currentIndex: number,
   previousIndex: number,
   onShowDetail: any,
   detailsOpened: boolean,
   filter: string
}

function PokemonList(props : PokemonListProps) {
  if (!props.data) {
    return <div>loading...</div>
  }

  // apply name filter to result set. I expected this to be slow
  // but its not so bad. It helps that the Pokemon Images are lazy-loaded
  // so the initial entry filtering is quick and doesnt generate so much
  // image loading requests. It could be even improved by a debounce handler on the filtering input in App.tsx
  const pokemonList = props
    .data
    .results
    .filter((pokemon : INamedApiResource<IPokemon>) => {
      return props.filter.length < 2 || pokemon
        .name
        .toLowerCase()
        .includes(props
          .filter
          .toLowerCase())
    });

  // create generator for splitting list in groups of 4 for layout
  const pokemonListGenerator = Utils
    .chunkArrayInGroups(
      pokemonList,
      TILE_COUNT_ROW );

  // TODO: cant pass this to Tile size
  const bulmaTileSizeSpecifier : number = ( 12 / TILE_COUNT_ROW ) || 3;

  // containers for Tile rows
  let parentTiles = [];
  let genNext = pokemonListGenerator.next();

  while (!genNext.done) {
    const tiles = genNext
      .value
      .map((pokemon : INamedApiResource<IPokemon>) => {
        const placeholder =
          <PokemonImage placeholder={true}/>;

        return <Tile
          size={3}
          kind="child"
          key={pokemon.name}
          className="pokemon-tile is-relative px-3">
            <LazyLoad
              className=""
              placeholder={ placeholder }
              key={ pokemon.name }
              offset={ 300 }
              once={ true }
              unmountIfInvisible={ true }>
                <CSSTransition
                  classNames="pokemon-item"
                  timeout={500}
                  appear>
                    <div className="box is-relative py-5">
                      <div className="tile-background"/>
                      <PokemonOverview
                        key={pokemon.name}
                        data={pokemon}
                        index={-1} // todo
                        onClick={() => props.onShowDetail(pokemon)}
                      />
                    </div>
                </CSSTransition>
            </LazyLoad>
        </Tile>
      });

    parentTiles.push(
      <Tile key={parentTiles.length} kind="parent" className="my-6" size={12}>
        {tiles}
      </Tile>
    );

    genNext = pokemonListGenerator.next();
  }

  return <Wrapper className={props.detailsOpened ? "details-opened" : ""}>
    <ListerTopGradient/>
    <Tile kind="ancestor" size={12} vertical={true}>
      {parentTiles}
    </Tile>
  </Wrapper>
}

export default React.memo(PokemonList);
