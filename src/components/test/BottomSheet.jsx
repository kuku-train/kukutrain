import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BOTTOM_SHEET_HEIGHT } from './constants';
import { WIDTH } from '../../utils/responsive';
import BottomSheetHeader from './BottomSheetHeader';
import BodyContainer from '../Container/BodyContainer';

export default function BottomSheet() {
  const [isDragging, setIsDragging] = useState(false);
  const [sheetY, setSheetY] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const specificHeightThreshold = 200; // Adjust this threshold as needed

  useEffect(() => {
    const handleTransitionEnd = () => {
      setTransitioning(false);
    };

    const sheetElement = document.querySelector('.bottom-sheet');

    if (sheetElement) {
      sheetElement.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (sheetElement) {
        sheetElement.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, []);

  const handleMouseDown = e => {
    setIsDragging(true);
    setInitialY(e.clientY);
  };

  const handleMouseMove = e => {
    if (isDragging) {
      const deltaY = e.clientY - initialY;
      setSheetY(prevY => prevY + deltaY);
      setInitialY(e.clientY);
      setTransitioning(true); // Add transitioning state during dragging
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = e => {
    setIsDragging(true);
    setInitialY(e.touches[0].clientY);
  };

  const handleTouchMove = e => {
    if (isDragging) {
      const deltaY = e.touches[0].clientY - initialY;
      setSheetY(prevY => prevY + deltaY);
      setInitialY(e.touches[0].clientY);
      setTransitioning(true); // Add transitioning state during dragging
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`bottom-sheet ${isDragging ? 'dragging' : ''} ${transitioning ? 'transitioning' : ''}`}
      style={{ transform: `translateY(${sheetY}px)` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <BottomSheetHeader />
      ss
    </div>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  width: ${WIDTH}px;
  bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${BOTTOM_SHEET_HEIGHT}px;
  transition: transform 150ms ease-out;
`;
