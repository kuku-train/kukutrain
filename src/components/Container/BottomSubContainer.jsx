import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import FilterDropDown from '../Button/FilterDropDown';
import { FILTER__LIST, FILTER__TYPE__LIST } from '../../constants';
import { getWidthPixel, getHeightPixel } from '../../utils/responsive';
import FilterButton from '../Button/FilterButton';
import Blank from '../Blank';

export default function BottomSubContainer({ type, idxList, setIdx, setType, isToggle }) {
  const [isVisible, setVisible] = useState(false);
  return (
    <ContainerStyled isVisible={isToggle}>
      <InnerContainerStyled>
        <FilterDropDown
          text={type === -1 ? '선택' : FILTER__LIST[FILTER__TYPE__LIST[type]].title}
          isVisible={isVisible}
          setVisible={setVisible}
          setType={setType}
        />
        <Blank width={getWidthPixel(125)} />
        {type !== -1 ? (
          <FilterContainerStyled>
            {FILTER__LIST[FILTER__TYPE__LIST[type]].list.map((filter, index) => {
              return (
                <FilterButton
                  text={filter}
                  idx={index}
                  idxList={idxList}
                  setIdx={setIdx}
                  key={FILTER__TYPE__LIST[type] + index}
                  isSelected={idxList.includes(index)}
                />
              );
            })}
          </FilterContainerStyled>
        ) : null}
      </InnerContainerStyled>
    </ContainerStyled>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ContainerStyled = styled.div`
  width: ${getWidthPixel(428)};
  height: ${getHeightPixel(150)};
  background-color: #89898966;
  position: absolute;
  margin-top: -${getHeightPixel(70)};
  border-radius: ${getWidthPixel(30)};
  ${({ isVisible }) => css`
    animation: ${isVisible ? fadeIn : fadeOut} 0.5s linear;
  `}
`;

const InnerContainerStyled = styled.div`
  width: ${getWidthPixel(428)};
  height: ${getHeightPixel(70)};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${getWidthPixel(30)};
`;

const FilterContainerStyled = styled.div`
  height: ${getHeightPixel(70)};
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
`;
