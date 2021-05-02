import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import PokeAPI from "pokeapi-typescript";
import { Table } from 'react-bulma-components';

import Utils from "../fns/util";
import PokemonType from "./PokemonType";
import PokemonEvolution from "./PokemonEvolution";

import { IPokemonSpecies, IPokemon, IEvolutionChain } from "pokeapi-typescript";

const Wrapper = styled.div`
  
`;

interface PokemonEvolutionPaneProps {
   pokemon_details: IPokemon
}

export default function PokemonEvolutionPane(props : any) {
  const [evolutionChain, setEvolutionChain] = useState<IEvolutionChain>();

  useEffect(() => {
    PokeAPI
      .PokemonSpecies
      .fetch(Utils.getId(props
        .pokemon_details
        .species
        .url))
      .then((species : IPokemonSpecies) => {
        PokeAPI
          .EvolutionChain
          .fetch(Utils.getId(species
            .evolution_chain
            .url))
          .then(setEvolutionChain)
      })
  }, [props, evolutionChain]);

  if (!!!evolutionChain) {
    return <span className="evolution-pane loading">
      loading evolution chain...
    </span>
  }

  return <Wrapper>
    <PokemonEvolution
      data={evolutionChain.chain}
      root/>
  </Wrapper>
}