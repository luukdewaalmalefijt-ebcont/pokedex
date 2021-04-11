import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Hero, Container } from 'react-bulma-components';
import { Waypoint } from 'react-waypoint';

import PokemonFn from "../fns/pokemon";
import Utils from "../fns/util";
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

interface PokemonOverviewState {
   isVisible: boolean,
   ref: any;
   displacement: number
}

// TODO: props typing
export default class PokemonOverview extends React.Component<PokemonOverviewProps, PokemonOverviewState> {
  constructor(props : PokemonOverviewProps) {
    super(props);

    this.state = {
      isVisible: !props.index,
      ref: React.createRef(),
      displacement: (props.index) ? 1 : 0
    };
  }

  render() {
    const img = PokemonFn.getImageUrl(this.props.data);
    const that = this;

    const style = {
      opacity:
        1 - this.state.displacement,
      transitionProperty:
        "opacity",
      transitionDuration:
        "100ms"
    };

    const onScroll = ( e : any ) => {
      // the bounding box compared to the viewport
      const rect = that.state.ref?.current?.getBoundingClientRect();
      // rect may be undefined for unrendering elements
      if (!rect) {
        return;
      }
      // height of our pokemon element (100vh)
      const height = rect.height;
      // absolute offset compared to view, either above or below
      const offset = Math.abs(rect.y);
      // bounded offset by maximum height
      const minDisplacement = Math.min(offset, height);
      // displacement fraction.
      // 0 == in perfect position
      // 1 == out of view
      const displacement = minDisplacement / height

      that.setState({
        displacement
      });

      //console.log(`[${that.props.data.name}] height: ${height}, offset: ${offset}, mindisplacement: ${minDisplacement}, displacement: ${displacement}`);
    };

    // url: props.data.url
    return (
      <Item key={this.props.data.name} className="overview-pokemon" ref={this.state.ref} style={style}>
        <Waypoint
          // let container know the index of the Pokemon that scrolled into view
          // so we can centrally track which is currently showing
          onEnter={() => {
            this.setState({isVisible: true});
            this.props.onView();
            window.addEventListener("scroll", Utils.throttle(onScroll, 100));
          }}

          // track own visibility state
          onLeave={() => {
            this.setState({isVisible: false});
            window.removeEventListener("scroll", onScroll);
          }}

          onPositionChange={() => {
            //
          }}
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