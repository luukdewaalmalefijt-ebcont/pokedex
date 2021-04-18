import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { Tile } from 'react-bulma-components';

import '../App.scss';
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
        return <Tile size={3}>
          <LazyLoad placeholder={ placeholder } key={ pokemon.name } offset={ 300 } once={ true }>
            <CSSTransition
                classNames="pokemon-item"
                timeout={500}
                appear
              >
                <PokemonOverview
                  key={pokemon.name}
                  data={pokemon}
                  index={-1} // todo
                />
            </CSSTransition>
          </LazyLoad>
        </Tile>
      });

    parentTiles.push(
      <Tile key={parentTiles.length} kind="parent" size={12}>
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
