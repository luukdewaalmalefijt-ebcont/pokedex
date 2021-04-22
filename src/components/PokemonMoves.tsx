import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';

import { IMove } from "pokeapi-typescript";

const List = styled.ul`
  
`;

interface PokemonMovesProps {
   moves: IMove
}

export default function PokemonMoves(props : any) {
  console.log(props);
  return <div/>
}