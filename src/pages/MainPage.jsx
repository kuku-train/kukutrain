import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BottomContainer from '../components/Container/BottomContainer';
import BottomContainer2 from '../components/Container/BottomContainer2';
import MapContainer from '../components/Container/MapContainer';
import { getHeightPixel, getPixelToNumber, getWidthPixel } from '../utils/responsive';
import { deviceModel } from '../utils';
import { ReactComponent as Ellipse } from '../Assets/icon/Ellipse.svg';
import { ReactComponent as Close } from '../Assets/icon/Close.svg';

function MainPage() {
  const [selected, setSelected] = useState(-1);
  const OFFSET__LOCY =
    deviceModel() === 'android'
      ? 210
      : deviceModel() === 'ios'
      ? 115
      : deviceModel() === 'ios/naver' || deviceModel() === 'ios/kakao'
      ? 305
      : 105;
  const [alcoholIdx, setAlcoholIdx] = useState([]);
  const [foodIdx, setFoodIdx] = useState([]);
  const [noiseIdx, setNoiseIdx] = useState([]);

  const SIZE = getWidthPixel(8);
  const CLOSE_SIZE = getWidthPixel(10);
  const [selectedIdx, setIdx] = useState(1);
  const [banner, setBanner] = useState(true);
  const [install, setInstall] = useState(true);

  const [isShown, setIsShown] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleClick = async () => {
    setIsShown(false);
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  const InstallPrompt = () => {
    useEffect(() => {
      const handleBeforeInstallPrompt = e => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsShown(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }, []);

    if (deviceModel() === 'ios' && !isShown) {
      return null;
    }

    return (
      <button className="downButton" onClick={handleClick}>
        다운받기
      </button>
    );
  };

  return (
    <PageStyled>
      {banner && (
        <>
          <BannerStyled>
            <a className="content" href="https://forms.gle/1CixQBs2PhZ9pytP6" target="_blank" rel="noreferrer">
              <div className="text">GDSC KU 2기 모집중</div>
            </a>
            <div className="close" onClick={() => setBanner(false)}>
              <Close width={CLOSE_SIZE} height={CLOSE_SIZE} />
            </div>
          </BannerStyled>
        </>
      )}

      {install && (
        <>
          <InstallStyled>
            <InstallBoxStyled>
              <div className="textBox">
                <div className="text">
                  <div className="red">홈 화면</div>
                  <div className="grey">에 다운받고</div>
                </div>
                <div className="text">
                  <div className="grey">더&nbsp;</div>
                  <div className="red">빠르게</div>
                </div>
                <div className="text">
                  <div className="red">확인</div>
                  <div className="grey">하자!</div>
                </div>
              </div>
              <div className="bottomBox">
                <div className="close" onClick={() => setInstall(false)}>
                  <Close width={CLOSE_SIZE} height={CLOSE_SIZE} />
                </div>

                <InstallPrompt />
              </div>
            </InstallBoxStyled>
          </InstallStyled>
        </>
      )}

      <MapContainer
        selected={selected}
        setSelected={setSelected}
        alcoholIdx={alcoholIdx}
        foodIdx={foodIdx}
        noiseIdx={noiseIdx}
        selectedIdx={selectedIdx}
      />

      <BottomContainer2
        selected={selected}
        setSelected={setSelected}
        alcoholIdx={alcoholIdx}
        setAlcoholIdx={setAlcoholIdx}
        foodIdx={foodIdx}
        setFoodIdx={setFoodIdx}
        noiseIdx={noiseIdx}
        setNoiseIdx={setNoiseIdx}
        selectedIdx={selectedIdx}
        setIdx={setIdx}
      />
    </PageStyled>
  );
}

const BannerStyled = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${getHeightPixel(50)};
  left: ${getWidthPixel(30)};
  width: ${getWidthPixel(368)};
  height: ${getHeightPixel(54)};
  border-radius: ${getHeightPixel(27)};
  background-color: #fcfcfc;
  border: 2px solid #bc323b;
  z-index: 101;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    margin: 0 ${getWidthPixel(10)};
    text-align: center;
    font-weight: 600;
    font-size: ${getWidthPixel(16)};
    color: #bc323b;
  }

  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: ${getWidthPixel(35)};
  }
`;

const InstallStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #0000006a;
  z-index: 102;
`;

const InstallBoxStyled = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: ${getWidthPixel(368)};
  height: ${getHeightPixel(324)};
  border-radius: ${getHeightPixel(27)};
  background-color: #fcfcfc;
  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.25);
  z-index: 102;

  .textBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${getHeightPixel(8)} 0;
    font-family: 'Jalnan';
    font-size: ${getWidthPixel(34)};
  }

  .red {
    color: #bc323b;
  }

  .grey {
    color: #898989;
  }

  .bottomBox {
    width: 100%;
    height: ${getHeightPixel(120)};
    border-radius: 0px 0px ${getHeightPixel(27)} ${getHeightPixel(27)};
    background-color: #bc323b;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .downButton {
    width: ${getWidthPixel(128)};
    height: ${getHeightPixel(44)};
    border: none;
    border-radius: ${getHeightPixel(22)};
    background-color: #ffffff;
    margin-right: ${getWidthPixel(30)};
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: ${getWidthPixel(14)};
    color: #bc323b;
  }

  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #ffffff;
    position: absolute;
    top: ${getHeightPixel(20)};
    right: ${getWidthPixel(20)};
  }
`;

const PageStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default MainPage;
