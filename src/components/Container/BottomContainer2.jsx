import React, { useState, useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';
import styled, { css } from 'styled-components';
import Sheet from 'react-modal-sheet';

import { getHeightPixel } from '../../utils/responsive';
import { BottomHeader } from '../Header/BottomHeader';
import BodyContainer from './BodyContainer';
import { WIDTH } from '../../utils/responsive';

import { useOverlay, useModal, OverlayProvider, FocusScope, useButton, useDialog } from 'react-aria';

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
        <div>
          <HeaderButtonStyled {...openButton.buttonProps} ref={openButtonRef}>
            <BottomHeader
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
          </HeaderButtonStyled>
        </div>
      )}

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
          <BottomHeader
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

const HeaderButtonStyled = styled.button`
  display: flex;
  position: absolute;
  top: ${getHeightPixel(846)};
  background-color: #00000000;
  border: none;
`;

const CustomSheet = styled(Sheet)`
  width: ${WIDTH + 'px'};
  position: absolute;
  margin-left: 45%;
  margin-top: ${getHeightPixel(150)};
  height: ${getHeightPixel(926)};

  .react-modal-sheet-container {
    height: calc(100% - env(safe-area-inset-top) - 80px) !important;
    background-color: #00000000 !important;
    box-shadow: none !important;
  }
`;
