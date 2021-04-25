import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import PokeAPI from "pokeapi-typescript";

import Utils from "../fns/util";
import PokemonType from "./PokemonType";

import { IMove } from "pokeapi-typescript";

const Wrapper = styled.div`
  h3, table td {
    color: white;
  }
`;

interface PokemonMoveProps {
   move: IMove
}

export default function PokemonMove(props : any) {
  const [data, setData] = useState<IMove>();

  useEffect(() => {
    PokeAPI
      .Move
      .fetch(Utils.getId(props.move.url))
      .then(setData)
  }, ["data"]);

  if (!!!data) {
    return <span className="move loading"/>
  }

  const title = Utils.getI18NEntryEN(data.names);
  const effects = Utils.filterI18NEntriesEN(data.effect_entries).map(effect => <div className="effect">{effect.effect}</div>);

  console.log(data);

  // TODO
  return <Wrapper className="move">
    <h3 className="is-3">{title}</h3>
    <table>
      <tr>
        <td>Type</td>
        <td><PokemonType type={data.type}/></td>
      </tr>

      <tr>
        <td>Accuracy</td>
        <td>{data.accuracy}</td>
      </tr>

      <tr>
        <td>Power</td>
        <td>{data.power}</td>
      </tr>

      <tr>
        <td>PP</td>
        <td>{data.pp}</td>
      </tr>

      <tr>
        <td>Damage class</td>
        <td>{data.damage_class}</td>
      </tr>
    </table>
  </Wrapper>
}