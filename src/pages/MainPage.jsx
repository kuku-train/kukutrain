import React, { useState } from 'react';
import styled from 'styled-components';
import BottomContainer from '../components/Container/BottomContainer';
import MapContainer from '../components/Container/MapContainer';

function MainPage() {
  const [locY, setLocY] = useState(650);
  return (
    <PageStyled>
      <MapContainer />
      <BottomContainer locY={locY} setLocY={setLocY} />
    </PageStyled>
  );
}

const PageStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default MainPage;
