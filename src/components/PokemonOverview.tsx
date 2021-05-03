import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Hero, Container } from 'react-bulma-components';
import { Waypoint } from 'react-waypoint';

import '../App.scss';
import PokemonFn from "../fns/pokemon";
import Utils from "../fns/util";
import PokemonImage from "./PokemonImage";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";

const { Header, Body, Footer } = Hero;

const Item = styled.div`
  //
`;

interface PokemonOverviewProps {
   data: INamedApiResource<IPokemon>;
   index: number;
   onClick: any
}

interface PokemonOverviewState {
   isVisible: boolean,
   ref: any;
   displacement: number,
   loadImg: boolean,
   showDetails: boolean,
}

export default class PokemonOverview extends React.Component<PokemonOverviewProps, PokemonOverviewState> {
  constructor(props : PokemonOverviewProps) {
    super(props);

    this.state = {
      isVisible: true,
      ref: React.createRef(),
      displacement: 0,
      loadImg: true,
      showDetails: false
    };
  }

  render() {
    const img = PokemonFn.getImageUrl(this
      .props
      .data);

    const that = this;

    const classes = [
      "overview-pokemon",
      "is-relative",
    ];

    const capitalizedName = Utils.capitalize(this
      .props
      .data
      .name );

    const header = <h2 className="is-size-3">
      {capitalizedName}
    </h2>;

    return (
      <Item
        key={this.props.data.name}
        onClick={this.props.onClick || (() => {})}
        className={classes.join(" ")}
        ref={this.state.ref}>
          <Container className="has-text-centered">
            <PokemonImage
              src={img}
              placeholder={!this.state.loadImg}
              height={300}
            />
            {header}
          </Container>
      </Item>
    )
  }
}