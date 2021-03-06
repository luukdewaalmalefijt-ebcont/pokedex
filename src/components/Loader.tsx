import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import LoadingScreen from 'react-loading-screen';

// todo: make work
import pokeballImage from "../../public/placeholder-pokeball2.png";

interface LoaderProps {
  isLoading: boolean,
  content: any
}

// todo: import image instead of hardcoding
export default function Loader(props : LoaderProps) {
  return <LoadingScreen
    loading={props.isLoading}
    bgColor='#f1f1f1'
    spinnerColor='#c00'
    textColor='#676767'
    logoSrc='/placeholder-pokeball2.png'
    text='Welcome to the authorative EBCONT Pokedex'>
      {props.isLoading ? <span/> : props.content}
  </LoadingScreen>
}