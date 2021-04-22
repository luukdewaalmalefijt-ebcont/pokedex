import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';

import { IType } from "pokeapi-typescript";

import PokemonFn from "../fns/pokemon";
import TypeFn from "../fns/type";

const List = styled.ul`
  color: white;
`;

interface PokemonTypeProps {
   type: IType
}

// TODO: color
export default function PokemonType(props : any) {
  console.log(props);
  const classes = ["type", "is-inline-block", props.type.name];
  return <span className={classes.join(" ")}>{props.type.name}</span>
}