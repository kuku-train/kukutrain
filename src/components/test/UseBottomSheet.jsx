import React, { useState } from 'react';

export default function UseBottomSheet() {
  const [isDragging, setIsDragging] = useState(false);
  const [sheetY, setSheetY] = useState(0);
  const [initialY, setInitialY] = useState(0);

  const specificHeightThreshold = 200; // Adjust this threshold as needed

  const handleMouseDown = e => {
    setIsDragging(true);
    setInitialY(e.clientY);
  };

  const handleMouseMove = e => {
    if (isDragging) {
      const deltaY = e.clientY - initialY;
      setSheetY(prevY => prevY + deltaY);
      setInitialY(e.clientY);
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
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTransitionEnd = () => {
    // You can add logic here to handle the end of the transition if needed.
  };

  return (
    <div
      className={`bottom-sheet ${isDragging ? 'dragging' : ''}`}
      style={{ transform: `translateY(${sheetY}px)` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTransitionEnd={handleTransitionEnd}
    >
      dddddddddd
    </div>
  );
}
