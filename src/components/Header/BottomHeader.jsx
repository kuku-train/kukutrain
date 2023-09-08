import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { getWidthPixel, getHeightPixel, HEIGHT, getPixelToNumber } from '../../utils/responsive';
import { ReactComponent as BottomHeaderElement } from '../../Assets/element/BottomTabElement.svg';
import { palette } from '../../constants/palette';
import Button from '../Button';
import Blank from '../Blank';

import { ReactComponent as RestaurantGrayIcon } from '../../Assets/icon/restaurant_gray.svg';
import { ReactComponent as ToiletGrayIcon } from '../../Assets/icon/toilet_gray.svg';
import { ReactComponent as ToiletCrimsonIcon } from '../../Assets/icon/toilet_crimson.svg';
import { ReactComponent as CheerCrimsonIcon } from '../../Assets/icon/cheer_crimson.svg';
import { ReactComponent as CheerGrayIcon } from '../../Assets/icon/cheer_gray.svg';
import { ReactComponent as SpoonIcon } from '../../Assets/icon/spoon_icon.svg';
import { ReactComponent as ChopStickLeftIcon } from '../../Assets/icon/chopstick1_icon.svg';
import { ReactComponent as ChopStickRightIcon } from '../../Assets/icon/chopstick2_icon.svg';
import { ReactComponent as TrainIcon } from '../../Assets/icon/train.svg';
import BottomSubContainer from '../Container/BottomSubContainer';
import BackHeader from './BackHeader';
import { set } from 'react-ga';

export function BottomHeader({
  locY,
  setLocY,
  setSelected,
  selected,
  selectedIdx,
  setIdx,
  alcoholIdx,
  setAlcoholIdx,
  foodIdx,
  setFoodIdx,
  noiseIdx,
  setNoiseIdx,
}) {
  const SCROLL__OFFSET__Y = 40;
  const MinY = 200;
  const MaxY = HEIGHT - 200;

  const [isScroll, setScroll] = useState(false);
  const [isToggle, setToggle] = useState(false);
  const [flag, setFlag] = useState(false);
  const [type, setType] = useState(-1);
  const [startY, setStartY] = useState(0);
  const [endY, setEndY] = useState(0);
  const [prevY, setPrevY] = useState(locY);

  useEffect(() => {
    let timeoutId;
    if (isToggle) {
      timeoutId = setTimeout(() => setFlag(true), 100);
    } else {
      timeoutId = setTimeout(() => setFlag(false), 100);
    }
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isToggle]);

  useEffect(() => {
    console.log(locY);
    if (Math.abs(startY - endY) < 50) {
      setLocY(prevY);
    } else if (startY > endY) {
      setLocY(MinY);
    } else {
      setLocY(MaxY);
    }
  }, [endY]);

  return (
    <ContainerStyled>
      <div
        onTouchStart={e => {
          setScroll(true);
          setStartY(e.touches[0].pageY);
          setPrevY(locY);
        }}
        onTouchEnd={e => {
          setScroll(false);
          setEndY(e.changedTouches[0].pageY);
        }}
        onTouchMove={e => {
          if (isScroll) {
            setLocY(e.touches[0].pageY - getPixelToNumber(getHeightPixel(SCROLL__OFFSET__Y)));
          }
        }}
        onMouseDown={() => {
          setScroll(true);
        }}
        onMouseUp={() => {
          setScroll(false);
        }}
        onMouseMove={e => {
          if (isScroll) {
            setLocY(e.pageY - getPixelToNumber(getHeightPixel(SCROLL__OFFSET__Y)));
          }
        }}
      >
        {selected !== -1 ? (
          <BackHeader selected={selected} setSelected={setSelected} />
        ) : selectedIdx === 1 ? (
          <div>
            {flag ? (
              <BottomSubContainer
                type={type}
                setType={setType}
                idxList={type === 0 ? alcoholIdx : type === 1 ? foodIdx : noiseIdx}
                setIdx={type === 0 ? setAlcoholIdx : type === 1 ? setFoodIdx : setNoiseIdx}
                isToggle={isToggle}
              />
            ) : (
              <BottomSubOffContainer isVisible={isToggle}>
                <TrainIconStyled />
              </BottomSubOffContainer>
            )}

            <HeaderBox>
              <BottomHeaderElement />
            </HeaderBox>
            <RowContainerStyled>
              <MarginStyled>
                <Button text={'화장실'} idx={0} isSelected={selectedIdx === 0} onClick={() => setIdx(0)}>
                  {selectedIdx === 0 ? <ToiletCrimsonIconStyled /> : <ToiletGrayIconStyled />}
                </Button>
              </MarginStyled>
              <MarginStyled marginLeft={getWidthPixel(152)}>
                <Button text={'응원단'} idx={2} isSelected={selectedIdx === 2} onClick={() => setIdx(2)}>
                  {selectedIdx === 2 ? <CheerCrimsonIconStyled /> : <CheerGrayIconStyled />}
                </Button>
              </MarginStyled>
            </RowContainerStyled>
            <CenterButtonStyled onClick={() => setToggle(!isToggle)}>
              {flag ? (
                <CenterButtonIconStyled isVisible={isToggle}>
                  <SpoonIconStyled isVisible={isToggle} />
                  <ChopStickLeftIconStyled isVisible={isToggle} />
                  <ChopStickRightIconStyled isVisible={isToggle} />
                </CenterButtonIconStyled>
              ) : (
                <ListButtonIconStyled isVisible={isToggle}>
                  <ListLineStyledLeft isVisible={isToggle} />
                  <Blank height={getWidthPixel(6)} />
                  <ListLineStyledMiddle isVisible={isToggle} />
                  <Blank height={getWidthPixel(6)} />
                  <ListLineStyledRight isVisible={isToggle} />
                </ListButtonIconStyled>
              )}
            </CenterButtonStyled>
          </div>
        ) : (
          <div>
            <TrainSideIconStyled />
            <HeaderStyled>
              <Blank width={getWidthPixel(30)} />
              <Button text={'화장실'} idx={0} isSelected={selectedIdx === 0} onClick={() => setIdx(0)}>
                {selectedIdx === 0 ? <ToiletCrimsonIconStyled /> : <ToiletGrayIconStyled />}
              </Button>
              <Blank width={getWidthPixel(22)} />
              <Button text={'뒤풀이'} idx={1} isSelected={selectedIdx === 1} onClick={() => setIdx(1)}>
                <RestaurantIconStyled />
              </Button>
              <Blank width={getWidthPixel(22)} />
              <Button text={'응원단'} idx={2} isSelected={selectedIdx === 2} onClick={() => setIdx(2)}>
                {selectedIdx === 2 ? <CheerCrimsonIconStyled /> : <CheerGrayIconStyled />}
              </Button>
              <Blank width={getWidthPixel(30)} />
            </HeaderStyled>
          </div>
        )}{' '}
      </div>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  width: ${getWidthPixel(428)};
  height: ${getHeightPixel(86)};
  filter: drop-shadow(0px -10px 10px #0000001a);
  background-color: #ffffff00;
  transition: transform 150ms ease-out;
`;

const RowContainerStyled = styled.div`
  width: ${getWidthPixel(428)};
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: center;
`;

const HeaderBox = styled.div`
  width: ${getWidthPixel(428)};
  height: ${getHeightPixel(86)};
  position: absolute;
`;

const HeaderStyled = styled.div`
  width: ${getWidthPixel(428)};
  height: ${getHeightPixel(86)};
  border-radius: ${getWidthPixel(30)} ${getWidthPixel(30)} 0 0;
  background-color: ${palette.background};
  display: flex;
  flex-direction: row;
  box-shadow: 0px -10px 10px #0000001a;
`;

const ToiletCrimsonIconStyled = styled(ToiletCrimsonIcon)`
  width: ${getWidthPixel(16)};
  height: ${getHeightPixel(19)};
`;

const ToiletGrayIconStyled = styled(ToiletGrayIcon)`
  width: ${getWidthPixel(16)};
  height: ${getHeightPixel(19)};
`;

const RestaurantIconStyled = styled(RestaurantGrayIcon)`
  width: ${getWidthPixel(13)};
  height: ${getHeightPixel(19)};
`;

const CheerCrimsonIconStyled = styled(CheerCrimsonIcon)`
  width: ${getWidthPixel(20)};
  height: ${getHeightPixel(17)};
`;

const CheerGrayIconStyled = styled(CheerGrayIcon)`
  width: ${getWidthPixel(20)};
  height: ${getHeightPixel(17)};
`;

const CenterButtonIconStyled = styled.div`
  width: ${getWidthPixel(63)};
  height: ${getWidthPixel(63)};
  background-color: #bc323b;
  border-radius: ${getWidthPixel(40)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ isVisible }) => css`
    animation: ${isVisible ? null : scaleDown} 0.5s ease-in-out;
    transition: visibility 0.5s ease-in-out;
  `}
`;

const ListButtonIconStyled = styled.div`
  width: ${getWidthPixel(58)};
  height: ${getWidthPixel(58)};
  background-color: #bc323b;
  border-radius: ${getWidthPixel(40)};
  margin-left: ${getWidthPixel(3)};
  margin-top: ${getWidthPixel(3)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ isVisible }) => css`
    animation: ${isVisible ? scaleUp : null} 0.5s ease-in-out;
    transition: visibility 0.5s ease-in-out;
  `}
`;

const CenterButtonStyled = styled.button`
  position: absolute;
  margin-left: ${getWidthPixel(183)};
  margin-top: -${getWidthPixel(5)};
  background-color: ${palette.none};
  border: 0px;
`;

const ListLineStyledLeft = styled.div`
  width: ${getWidthPixel(20)};
  height: ${getWidthPixel(3)};
  border-radius: ${getWidthPixel(2)};
  background-color: white;
  ${({ isVisible }) => css`
    animation: ${isVisible ? toSpoonLineLeft : fromSpoonLineLeft} 0.5s ease-in-out;
    transition: visibility 0.5s ease-in-out;
  `}
`;

const ListLineStyledMiddle = styled.div`
  width: ${getWidthPixel(20)};
  height: ${getWidthPixel(3)};
  border-radius: ${getWidthPixel(2)};
  background-color: white;
  ${({ isVisible }) => css`
    animation: ${isVisible ? toSpoonLineMiddle : fromSpoonLineMiddle} 0.5s ease-in-out;
    transition: visibility 0.5s ease-in-out;
  `}
`;

const ListLineStyledRight = styled.div`
  width: ${getWidthPixel(20)};
  height: ${getWidthPixel(3)};
  border-radius: ${getWidthPixel(2)};
  background-color: white;
  ${({ isVisible }) => css`
    animation: ${isVisible ? toSpoonLineRight : fromSpoonLineRight} 0.5s ease-in-out;
    transition: visibility 0.5s ease-in-out;
  `}
`;

const SpoonIconStyled = styled(SpoonIcon)`
  ${({ isVisible }) => css`
    animation: ${isVisible ? fromListSpoon : toListSpoon} 0.5s ease-in-out;
    transition: visibility 0.5s ease-in-out;
  `}
  width: ${getWidthPixel(11)};
  height: ${getWidthPixel(34)};
`;

const ChopStickLeftIconStyled = styled(ChopStickLeftIcon)`
  ${({ isVisible }) => css`
    animation: ${isVisible ? fromListChopStickLeft : toListChopStickLeft} 0.5s ease-in-out;
    transition: visibility 0.5s ease-in-out;
  `}
  width: ${getWidthPixel(7)};
  height: ${getWidthPixel(34)};
`;

const ChopStickRightIconStyled = styled(ChopStickRightIcon)`
  ${({ isVisible }) => css`
    animation: ${isVisible ? fromListChopStickRight : toListChopStickRight} 0.5s ease-in-out;
    transition: visibility 0.5s ease-in-out;
  `}
  width: ${getWidthPixel(7)};
  height: ${getWidthPixel(34)};
`;

const BottomSubOffContainer = styled.div`
  width: ${getWidthPixel(428)};
  display: flex;
  justify-content: center;
`;

const MarginStyled = styled.div`
  ${({ marginLeft = getWidthPixel(0), marginRight = getWidthPixel(0) }) => css`
    margin-left: ${marginLeft};
    margin-right: ${marginRight};
  `}
`;

const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

const scaleDown = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
`;

const toListSpoon = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0deg) translateY(${getWidthPixel(0)}) scale(1);
  }
  100% {
    opacity: 0.5;
    transform: rotate(90deg) translateY(${getWidthPixel(-5)}) scale(0.9);
  }
`;

const fromListSpoon = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const toListChopStickLeft = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0deg) translateX(${getWidthPixel(0)}) scale(1);
  }
  100% {
    opacity: 0.5;
    transform: rotate(-90deg) translateX(${getWidthPixel(-10)}) scale(0.9);
  }
`;

const fromListChopStickLeft = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const toListChopStickRight = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0deg) translate(${getWidthPixel(0)}, ${getWidthPixel(0)}) scale(1);
  }
  100% {
    opacity: 0.5;
    transform: rotate(-90deg) translate(${getWidthPixel(10)}, ${getWidthPixel(-10)}) scale(0.9);
  }
`;

const fromListChopStickRight = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const toSpoonLineLeft = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0deg) translate(${getWidthPixel(0)}, ${getWidthPixel(0)}) scale(1);
  }
  100% {
    opacity: 0.5;
    transform: rotate(90deg) translate(${getWidthPixel(8)},  ${getWidthPixel(-10)}) scale(1.3);
  }
`;

const fromSpoonLineLeft = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const toSpoonLineMiddle = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0deg) translateY(${getWidthPixel(0)}) scale(1);
  }
  100% {
    opacity: 0.5;
    transform: rotate(-90deg) translateY(${getWidthPixel(-5)}) scale(1.3);
  }
`;

const fromSpoonLineMiddle = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
}
`;

const toSpoonLineRight = keyframes`
  0% {
    opacity: 1;
    transform: rotate(0deg) translateX(${getWidthPixel(0)}) scale(1);
  }
  100% {
    opacity: 0.5;
    transform: rotate(95deg) translateX(${getWidthPixel(-10)}) scale(1.3);
  }
`;

const fromSpoonLineRight = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const TrainIconStyled = styled(TrainIcon)`
  width: ${getWidthPixel(111)};
  height: ${getWidthPixel(62)};
  margin-left: ${getWidthPixel(251)};
  margin-top: -${getWidthPixel(62)};
  position: absolute;
`;

const TrainSideIconStyled = styled(TrainIcon)`
  width: ${getWidthPixel(111)};
  height: ${getWidthPixel(62)};
  margin-left: ${getWidthPixel(284)};
  margin-top: -${getWidthPixel(62)};
  position: absolute;
`;

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
