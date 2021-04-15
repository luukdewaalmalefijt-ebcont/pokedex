import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';

import '../App.scss';
import PokemonFn from "../fns/pokemon";
import PokemonOverview from "./PokemonOverview";
import Utils from "../fns/util";

// while this TS wrapper is handy, I would have wrapped it
// in GraphQL, like this guy here: https://graphql-pokeapi.vercel.app/
// for even more convenience
import PokeAPI from "pokeapi-typescript";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";

const Index = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(50, 50, 50, 0.8);
  padding: 15px;
  transition: all;

  &:hover {
    rgba(50, 50, 50, 1);
  }

  &.sticky {
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;
  }
`;

const IndexItem = styled.li`
  //
`;

const IndexItemLink = styled.a`
  color: white;
  font-weight: 600;
  //font-size: 12px;

  &:hover {
    font-weight: bold;
    color: red;
  }
`;

interface PokemonMenuProps {
  data: INamedApiResourceList<IPokemon>;
}

function PokemonMenu(props : PokemonMenuProps) {
  const element = useRef<any>(null);
  const [isSticky, setSticky] = useState(false);

  console.log(`[RENDER] PokemonMenu`);

  // clone resultset to prevent sorting the original reference
  // and messing up the "natural" pokedex order
  const indexPokemon = PokemonFn.cloneResultSet(props.data);

  const onScroll = ( e : any ) => {
    // the bounding box compared to the viewport
    const rect = element
      ?.current
      ?.getBoundingClientRect();

    let shouldSticky = (window.scrollY) >= (rect.height - window.innerHeight);

    setSticky( shouldSticky );
  };

//   const itemClicked = (identifier : string) => {
//     //console.log(`clicked menu item #${index}`);
//     document
//       ?.getElementById(identifier)
//       ?.scrollIntoView();
//   };

  useEffect(() => {
    window
      .addEventListener(
        "scroll",
        Utils.debounce(onScroll, 100, false));

    return () => window
      .removeEventListener(
        "scroll",
        onScroll);
  });

  // sort resultset copy for index
  indexPokemon
    ?.results
    ?.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

  const classes = [
    "index",
    (isSticky) ? "sticky" : ""
  ];

  // TODO: turn into own component
  const indexItems = indexPokemon
    ?.results
    ?.map((pokemon, index) => {
      return <IndexItem key={"index-" + pokemon.name} className="is-block">
        <IndexItemLink className="is-size-7" href={"#" + pokemon.name}>{pokemon.name}</IndexItemLink>
      </IndexItem>
    });

  return <Index className={classes.join(" ")} ref={element}>
    {indexItems}
  </Index>
}

export default React.memo(PokemonMenu);
