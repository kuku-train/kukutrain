import React from 'react';
import styled from 'styled-components';

export default function BottomSheetHeader() {
  return (
    <Wrapper>
      <Handle />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
  background-color: white;
`;

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;
