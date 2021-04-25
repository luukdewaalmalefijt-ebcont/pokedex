import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';

import { IType } from "pokeapi-typescript";

import PokemonFn from "../fns/pokemon";
import TypeFn from "../fns/type";

import PokemonType from "./PokemonType";

const List = styled.ul`

`;

interface PokemonTypeListProps {
   items: Array<any>
}

export default function PokemonTypeList(props : any) {
  const items = props
    .items
    .map((type : any) =>
      <PokemonType type={type.type}/>
    );

  return <div className="tags has-addons is-inline-block">{items}</div>
}