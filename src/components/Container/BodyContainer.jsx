import React, { useState } from 'react';
import styled from 'styled-components';

import ListPage from '../../pages/ListPage';
import { getWidthPixel, getHeightPixel } from '../../utils/responsive';

import { palette } from '../../constants/palette';
import Detail from '../Detail/Detail';

export default function BodyContainer({ locY, alcoholIdx, foodIdx, noiseIdx, selected, setSelected, selectedIdx }) {
  return (
    <ContainerStyled>
      {selected === -1 ? (
        <>
          <DividerStyled />
          <ListPage
            alcoholIdx={alcoholIdx}
            foodIdx={foodIdx}
            noiseIdx={noiseIdx}
            setSelected={setSelected}
            selectedIdx={selectedIdx}
          />
        </>
      ) : (
        <Detail locY={locY} restaurant_id={selected} />
      )}
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  width: 100%;
  height: ${getHeightPixel(926)};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
`;

const DividerStyled = styled.div`
  width: ${getWidthPixel(368)};
  height: ${getHeightPixel(3)};
  border-radius: 2px;
  background-color: ${palette.gray_02};
`;
