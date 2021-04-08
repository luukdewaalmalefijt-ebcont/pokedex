import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Hero, Container } from 'react-bulma-components';
import { Waypoint } from 'react-waypoint';

import PokemonFn from "../fns/pokemon";
import PokemonImage from "./PokemonImage";
import { INamedApiResourceList, IPokemon, INamedApiResource } from "pokeapi-typescript";

const { Header, Body, Footer } = Hero;

const Item = styled.li`
  // TODO
`;

interface PokemonOverviewProps {
   data: INamedApiResource<IPokemon>;
   index: number;
   loadImg: boolean;
   onView: any;
}

type PokemonOverviewState = PokemonOverviewProps;

// TODO: props typing
export default class PokemonOverview extends React.Component<PokemonOverviewProps, PokemonOverviewState> {
  constructor(props : PokemonOverviewProps) {
    super(props);
  }

  render() {
    const img = PokemonFn.getImageUrl(this.props.data);

    // url: props.data.url
    return (
      <Item key={this.props.data.name} className="overview-pokemon">
        <Waypoint
          onEnter={this.props.onView}
        />
        <Hero size="fullheight">
          <Body>
            <Container className="has-text-centered">
              <PokemonImage
                src={img}
                placeholder={!this.props.loadImg}
                height={150}
              />
              <h2>{this.props.data.name}</h2>
            </Container>
          </Body>
        </Hero>
      </Item>
    )
  }
}