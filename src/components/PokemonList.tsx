import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { Tile } from 'react-bulma-components';

import '../App.scss';
import tileBackground from "../backgrounds/dbvfogs-4f2c3dd5-b13e-49c3-8e41-150a7ed95c01.png";
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
  .tile-background {
    position: absolute;
    top: 0;
    width: 100%;
    leftL 0;
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
      border-radius: 7px;
      border: 2px solid #333;
    }

    h2 {
      color: white;
      font-weight: bold;
    }

    img.pokemon-image {
      max-height: 250px;
      min-height: 250px;
    }

    &:hover {
      transform: scale(1.1);
      z-index: 5;

      .tile-background {
        //transition: all 0.75s;
        filter: blur(0px);
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

interface PokemonListProps {
   data: INamedApiResourceList<IPokemon>,
   currentIndex: number,
   previousIndex: number
}

function PokemonList(props : PokemonListProps) {
  // this should not be neccessary
  if (!props.data) {
    return <div>loading...</div>
  }

  const pokemonList = props.data.results;

  // create generator for splitting list in groups of 4 for layout
  const pokemonListGenerator = Utils.chunkArrayInGroups(pokemonList, 4);

  let parentTiles = [];
  let genNext = pokemonListGenerator.next();

  while (!genNext.done) {
    const tiles = genNext
      .value
      .map((pokemon : INamedApiResource<IPokemon>) => {
        const placeholder = <PokemonImage placeholder={true}/>;
        return <Tile size={3} kind="child" className="pokemon-tile is-relative px-3">
          <LazyLoad className="" placeholder={ placeholder } key={ pokemon.name } offset={ 300 } once={ true } unmountIfInvisible={ true }>
            <CSSTransition
              classNames="pokemon-item"
              timeout={500}
              appear
            >
              <div className="box is-relative py-5">
                <div className="tile-background"/>
                <PokemonOverview
                  key={pokemon.name}
                  data={pokemon}
                  index={-1} // todo
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

  return <Wrapper>
    <Tile kind="ancestor" size={12} vertical={true}>
      {parentTiles}
    </Tile>
  </Wrapper>
}

export default React.memo(PokemonList);
