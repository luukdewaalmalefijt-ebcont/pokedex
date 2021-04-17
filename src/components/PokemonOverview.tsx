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

const Item = styled.li`
  width: 100vw;
  height: 100vh;
  display: inline-block;
`;

interface PokemonOverviewProps {
   data: INamedApiResource<IPokemon>;
   index: number;
//    onView: any;
}

interface PokemonOverviewState {
   isVisible: boolean,
   ref: any;
   displacement: number,
   loadImg: boolean
}

// TODO: props typing
export default class PokemonOverview extends React.Component<PokemonOverviewProps, PokemonOverviewState> {
  constructor(props : PokemonOverviewProps) {
    super(props);

    this.state = {
      isVisible: true,
      ref: React.createRef(),
      displacement: 0,
      loadImg: true
    };
  }

  render() {
    const img = PokemonFn.getImageUrl(this.props.data);
    const that = this;

    const style = {
      opacity:
        1 - this.state.displacement,
        // this.state.loadImg ? (1 - this.state.displacement) : 1,
      transitionProperty:
        "opacity",
      transitionDuration:
        "100ms"
    };

    // url: props.data.url
    return (
      <Item key={this.props.data.name} className="overview-pokemon" ref={this.state.ref} style={style}>
        <Hero size="fullheight">
          <Body>
            <Container className="has-text-centered">
              <PokemonImage
                src={img}
                placeholder={!this.state.loadImg}
                height={300}
              />
              <h2 className="is-size-2">{this.props.data.name.replace(/^\w/, c => c.toUpperCase())}</h2>
            </Container>
          </Body>
        </Hero>
      </Item>
    )
  }
}