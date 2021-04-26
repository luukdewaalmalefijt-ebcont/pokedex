import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import PokeAPI from "pokeapi-typescript";
import { Table } from 'react-bulma-components';

import Utils from "../fns/util";
import PokemonType from "./PokemonType";

import { IMove } from "pokeapi-typescript";

const Wrapper = styled.div`
  h3 {
    color: white;
    transition: all 0.5s;

    &:hover {
      background: black;
      border-radius: 5px;
    }
  }

  td {
    color: #666;
  }
`;

interface PokemonMoveProps {
   move: IMove
}

export default function PokemonMove(props : any) {
  const [data, setData] = useState<IMove>();
  const [isOpened, setOpened] = useState(false);

  useEffect(() => {
    PokeAPI
      .Move
      .fetch(Utils.getId(props.move.url))
      .then(setData)
  }, ["data"]);

  if (!!!data) {
    return <span className="move loading"/>
  }

  const title = Utils
    .getI18NEntryEN(data.names);

  const effects = Utils
    .filterI18NEntriesEN(data
      .effect_entries
    )
    .map(effect =>
      <div className="effect">
        {effect.effect}
      </div>
    );

  const toggleOpened = () => setOpened(!isOpened);

  const {type, accuracy, power, pp, damage_class} = data;

  const headerEl = <h3 className="is-3 py-2" onClick={toggleOpened}>
    {title}
  </h3>;

  const tableEl = (!isOpened) ? (<></>) : <Table size="fullwidth" striped>
    <tbody>
      <tr>
        <td>Type</td>
        <td><PokemonType type={type}/></td>
      </tr>

      <tr>
        <td>Accuracy</td>
        <td>{accuracy}</td>
      </tr>

      <tr>
        <td>Power</td>
        <td>{power}</td>
      </tr>

      <tr>
        <td>PP</td>
        <td>{pp}</td>
      </tr>

      <tr>
        <td>Damage class</td>
        <td>{damage_class.name}</td>
      </tr>
    </tbody>
  </Table>;

  return <Wrapper className="move">
    {headerEl}
    {tableEl}
  </Wrapper>
}