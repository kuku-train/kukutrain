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
  // locY,
  // setLocY,
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
      <HeaderButton {...openButton.buttonProps} ref={openButtonRef}>
        Open sheet
      </HeaderButton>
      <CustomSheet isOpen={sheetState.isOpen} onClose={sheetState.close}>
        <OverlayProvider>
          <FocusScope contain autoFocus restoreFocus>
            <SheetComp
              sheetState={sheetState}
              // setLocY={setLocY}
              // locY={locY}
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

  const closeButtonRef = useRef(null);
  const closeButton = useButton({ onPress: sheetState.close, 'aria-label': 'Close sheet' }, closeButtonRef);

  useModal();

  // In real world usage this would be a separate React component
  const customHeader = (
    <div>
      <span {...dialog.titleProps}>Some title for sheet</span>
      <button {...closeButton.buttonProps}>🅧</button>
    </div>
  );

  return (
    <div>
      <Sheet.Container {...overlay.overlayProps} {...dialog.dialogProps} ref={containerRef}>
        <Sheet.Header>
          <BottomHeader
            // setLocY={setLocY}
            // locY={locY}
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
            // locY={locY}
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

const HeaderButton = styled.button`
  position: absolute;
  top: ${getHeightPixel(796)};
  width: 100%;
  height: ${getHeightPixel(130)};
  background-color: #25f079;
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
