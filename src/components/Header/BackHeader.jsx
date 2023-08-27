import React from 'react';
import styled from 'styled-components';
import { getWidthPixel, getHeightPixel } from '../../utils/responsive';

import { ReactComponent as BackIcon } from '../../Assets/icon/back.svg';
import { data } from '../../data/data';
const COLOR = ['#424242', '#9a9a9a', '#696969', '#727272'];

export default function BackHeader({ selected, setSelected }) {
  const market = data['datas'].find(data => data.id === selected);
  const { name, subname } = market;
  return (
    <ContainerStyled>
      <ButtonStyled onClick={() => setSelected(-1)}>
        <IconStyled />
      </ButtonStyled>
      <div className="info-text">
        {selected === 999 ? (
          '응원단'
        ) : (
          <StyledDetailContainer>
            <div className="bl-container main">
              <StyledFont className="name item" color={COLOR[0]} fw={600}>
                {name}
              </StyledFont>
              <StyledFont className="type item" color={COLOR[1]}>
                {subname}
              </StyledFont>
            </div>
          </StyledDetailContainer>
        )}
      </div>
    </ContainerStyled>
  );
}

const StyledFont = styled.div`
  color: ${({ color }) => color};
  text-align: center;
`;

const ContainerStyled = styled.div`
  width: ${getWidthPixel(428)};
  height: ${getHeightPixel(86)};
  border-radius: ${getWidthPixel(30)} ${getWidthPixel(30)} 0 0;
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  .info-text {
    width: ${getWidthPixel(300)};
    text-align: center;
    font-size: 14px;
    color: #bc323b;
  }
`;

const IconStyled = styled(BackIcon)`
  width: ${getWidthPixel(20)};
  height: ${getWidthPixel(20)};
`;

const ButtonStyled = styled.div`
  width: ${getWidthPixel(44)};
  height: 100%;
  position: absolute;
  left: ${getWidthPixel(30)};
  display: flex;
  align-items: center;
`;

const StyledDetailContainer = styled.div`
  .bl-container {
    margin: 0 auto;
    width: 100%;
    margin-bottom: ${getHeightPixel(10)};
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .item {
      margin-top: 0.55em;
    }

    .name {
      font-size: ${getWidthPixel(18)};
      font-weight: 800;
    }

    .type {
      font-size: ${getWidthPixel(14)};
      font-weight: 500;
      color: #bc323b;
    }
  }
}`;
