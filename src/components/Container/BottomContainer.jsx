import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { getHeightPixel } from '../../utils/responsive';
import { BottomHeader } from '../Header/BottomHeader';
import BodyContainer from './BodyContainer';

export default function BottomContainer({
  locY,
  setLocY,
  selected,
  setSelected,
  alcoholIdx,
  setAlcoholIdx,
  foodIdx,
  setFoodIdx,
  noiseIdx,
  setNoiseIdx,
  selectedIdx,
  setIdx,
}) {
  return (
    <ContainerStyled marginTop={locY < 796 ? (locY > 0 ? locY + 'px' : getHeightPixel(0)) : getHeightPixel(796)}>
      <BottomHeader
        setLocY={setLocY}
        locY={locY}
        selected={selected}
        setSelected={setSelected}
        selectedIdx={selectedIdx}
        setIdx={setIdx}
        alcoholIdx={alcoholIdx}
        setAlcoholIdx={setAlcoholIdx}
        foodIdx={foodIdx}
        setFoodIdx={setFoodIdx}
        noiseIdx={noiseIdx}
        setNoiseIdx={setNoiseIdx}
      />
      <BodyContainer
        locY={locY}
        alcoholIdx={alcoholIdx}
        foodIdx={foodIdx}
        noiseIdx={noiseIdx}
        selected={selected}
        setSelected={setSelected}
        selectedIdx={selectedIdx}
      />
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  position: absolute;
  ${({ marginTop = getHeightPixel(796) }) => css`
    margin-top: ${marginTop};
  `};
  width: 100%;
`;
