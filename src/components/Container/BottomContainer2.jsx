import React, { useState, useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';
import styled, { css } from 'styled-components';
import Sheet from 'react-modal-sheet';

import { getHeightPixel } from '../../utils/responsive';
import { BottomHeader2 } from '../Header/BottomHeader2';
import BodyContainer from './BodyContainer';
import { WIDTH } from '../../utils/responsive';
import { deviceModel } from '../../utils';

import { useOverlay, useModal, OverlayProvider, FocusScope, useButton, useDialog } from 'react-aria';
import Blank from '../Blank';
import { m } from 'framer-motion';

export default function BottomContainer2({
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
  const sheetState = useOverlayTriggerState({});
  const openButtonRef = useRef(null);

  const openButton = useButton({ onPress: sheetState.open }, openButtonRef);
  return (
    <div>
      {!sheetState.isOpen && (
        <HeaderStyled>
          <HeaderButtonStyled {...openButton.buttonProps} ref={openButtonRef}>
            <BottomHeader2
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

            {deviceModel() === 'android' && <Blank height={getHeightPixel(210)} />}
          </HeaderButtonStyled>
          <BlankBox />
        </HeaderStyled>
      )}
      {deviceModel() === 'nomobile' ? (
        <NoMobileCustomSheet isOpen={sheetState.isOpen} onClose={sheetState.close}>
          <OverlayProvider>
            <FocusScope contain autoFocus restoreFocus>
              <SheetComp
                sheetState={sheetState}
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
            </FocusScope>
          </OverlayProvider>
        </NoMobileCustomSheet>
      ) : (
        <CustomSheet isOpen={sheetState.isOpen} onClose={sheetState.close}>
          <OverlayProvider>
            <FocusScope contain autoFocus restoreFocus>
              <SheetComp
                sheetState={sheetState}
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
            </FocusScope>
          </OverlayProvider>
        </CustomSheet>
      )}
    </div>
  );
}

const SheetComp = ({
  sheetState,
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
}) => {
  const containerRef = useRef(null);
  const dialog = useDialog({}, containerRef);
  const overlay = useOverlay({ onClose: sheetState.close, isOpen: true, isDismissable: true }, containerRef);

  useModal();

  return (
    <div>
      <Sheet.Container {...overlay.overlayProps} {...dialog.dialogProps} ref={containerRef}>
        <Sheet.Header>
          <BottomHeader2
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
        </Sheet.Header>
        <Sheet.Content>
          <BodyContainer
            alcoholIdx={alcoholIdx}
            foodIdx={foodIdx}
            noiseIdx={noiseIdx}
            selected={selected}
            setSelected={setSelected}
            selectedIdx={selectedIdx}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </div>
  );
};

const HeaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: ${getHeightPixel(86)};
  bottom: 0;
  z-index: 100;
`;

const BlankBox = styled.div``;

const HeaderButtonStyled = styled.button`
  display: flex;
  background-color: #00000000;
  border: none;
`;

const NoMobileCustomSheet = styled(Sheet)`
  width: ${WIDTH + 'px'};
  position: absolute;
  margin-left: calc(50% - 47px);
  height: 100%;

  .react-modal-sheet-container {
    height: calc(100% - env(safe-area-inset-top) - ${getHeightPixel(200)}) !important;
    background-color: #00000000 !important;
    box-shadow: none !important;
  }
`;

const CustomSheet = styled(Sheet)`
  width: ${WIDTH + 'px'};
  position: absolute;
  height: 100%;

  .react-modal-sheet-container {
    height: calc(100% - env(safe-area-inset-top) - ${getHeightPixel(200)}) !important;
    background-color: #00000000 !important;
    box-shadow: none !important;
  }
`;
