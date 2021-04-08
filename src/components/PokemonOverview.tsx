import styled, { css } from 'styled-components';
import { Hero } from 'react-bulma-components';

import PokemonFn from "../fns/pokemon";
import PokemonImage from "./PokemonImage";

const { Header, Body, Footer } = Hero;

const Item = styled.li`
  // TODO
`;

// TODO: props typing
export default function PokemonOverview(props : any) {
  const img = PokemonFn.getImageUrl(props.data);

  // url: props.data.url
  return <Item key={props.data.name} className="overview-pokemon">
    <Hero size="fullheight">
      <Body>
        <div>
          <PokemonImage
            src={img}
            placeholder={!props.loadImg}
            height={150}
          />
          <h2>{props.data.name}</h2>
        </div>
      </Body>
    </Hero>
  </Item>
}