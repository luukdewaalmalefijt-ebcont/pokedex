import '../App.scss';
import styled, { css } from 'styled-components';
import React, { useState, useEffect, useMemo } from 'react';
import { Tag } from 'react-bulma-components';

import { IType } from "pokeapi-typescript";

import PokemonFn from "../fns/pokemon";
import TypeFn from "../fns/type";

interface PokemonTypeProps {
   type: IType
}

// all pokemon type possibilities
type TYPE
  = 'fighting'
  | 'grass'
  | 'water'
  | 'fire'
  | 'electric'
  | 'ice'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
  ;

// definition of the typr for the color mapping
type TypeColors = {[key in TYPE]: any};

// color mapping from type to color
// TODO: defunct. See App.scss
const COLORS : TypeColors = {
  'fighting':
    "brown",
  'grass':
    "green",
  'water':
    "dark blue",
  'fire':
    "red",
  'electric':
    "yellow",
  'ice':
    "light blue",
  'poison':
    "poison",
  'ground':
    "brown",
  'flying':
    "blue",
  'psychic':
    "pink",
  'bug':
    "light yellow",
  'rock':
    "dark gray",
  'ghost':
    "light gray",
  'dragon':
    "dark yellow",
  'dark':
    "black",
  'steel':
    "gray",
  'fairy':
    "light pink"
};

// TODO: passable color
export default function PokemonType(props : any) {
  const classes = ["type", "is-inline-block", props.type.name];

  // unsafe cast
  const name : TYPE = props.type.name;

  // custom style for tag component
  // TODO: for some reason the background prop is not working for the Bulma Tag
  const style = {
//     background: `${COLORS[name]} !important`,
//     color: (['steel', 'ghost'].includes(name)) ? "black" : "white"
  };

  // cant use the Bulma colors here since the color should be somewhat semantic
  // of the pokemon type and is not related to UI
  return <Tag
    size="medium"
    key={props.type.name}
    style={style}
    className={classes.join(" ")}>
    {props.type.name}
  </Tag>
}