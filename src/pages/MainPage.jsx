import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BottomContainer from '../components/Container/BottomContainer';
import MapContainer from '../components/Container/MapContainer';
import { getHeightPixel, getPixelToNumber, getWidthPixel } from '../utils/responsive';
import { deviceModel } from '../utils';
import { HEIGHT } from '../utils/responsive';
import { ReactComponent as Close } from '../Assets/icon/Close.svg';
import IOSdown from '../Assets/logo/IOSdown.png';
import { ReactComponent as ShareIcon } from '../Assets/icon/share_ios.svg';

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
  const [locY, setLocY] = useState(HEIGHT - getPixelToNumber(getHeightPixel(OFFSET__LOCY)));
  const [alcoholIdx, setAlcoholIdx] = useState([]);
  const [foodIdx, setFoodIdx] = useState([]);
  const [noiseIdx, setNoiseIdx] = useState([]);

  const SIZE = getWidthPixel(8);
  const CLOSE_SIZE = getWidthPixel(10);
  const [selectedIdx, setIdx] = useState(1);
  const [banner, setBanner] = useState(true);
  const [install, setInstall] = useState(true);
  const [betaInformation, setBetaInformation] = useState(true);

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

    if (!(deviceModel() === 'ios' || deviceModel() === 'ios/naver' || deviceModel() === 'ios/kakao') && !isShown) {
      return null;
    }

    if (deviceModel() === 'ios' || deviceModel() === 'ios/naver' || deviceModel() === 'ios/kakao') {
      return (
        <InstallStyled>
          <InstallBoxStyledIOS>
            <div className="close" onClick={() => setInstall(false)}>
              <Close width={CLOSE_SIZE} height={CLOSE_SIZE} />
            </div>
            <div className="textBox">
              <div className="text">
                <div className="white">다운 받는 방법 👇</div>
              </div>
              <div className="img">
                <div className="img-gradation" />
                <img src={IOSdown} alt="IOSdown" width="100%" />
              </div>
              <div className="text">
                <div className="red">
                  <ShareIconStyled />
                  클릭 후
                </div>
              </div>
              <div className="text">
                <div className="red">원하는 이름으로 설정</div>
              </div>
            </div>

            <div className="bottomBox">
              <button className="downButton" onClick={() => setInstall(false)}>
                다운받기
              </button>
            </div>
          </InstallBoxStyledIOS>
        </InstallStyled>
      );
    }

    return (
      <InstallStyled>
        <InstallBoxStyled>
          <div className="close" onClick={() => setInstall(false)}>
            <Close width={CLOSE_SIZE} height={CLOSE_SIZE} />
          </div>
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
            <button className="downButton" onClick={handleClick}>
              다운받기
            </button>
          </div>
        </InstallBoxStyled>
      </InstallStyled>
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
      {install && <InstallPrompt />}
      {betaInformation && (
        <InstallStyled>
          <InstallBoxStyledIOS>
            <div className="close" onClick={() => setBetaInformation(false)}>
              <Close width={CLOSE_SIZE} height={CLOSE_SIZE} />
            </div>
            <div className="textBox">
              <div className="text">
                <div className="red">- 쿠쿠트레인 공지 -</div>
              </div>
              <div className="text">
                <div className="small">현재 고려대학교 교우회 측에서 무료 주점이 아직 공지되지 않았습니다.</div>
              </div>
              <div className="text">
                <div className="small">
                  2023년 고연전 무료 주점이 확정되는 대로 해당 정보를 입력하여 서비스할 수 있도록 하겠습니다.
                </div>
              </div>
              <div className="text">
                <div className="small">이용에 불편을 끼쳐 드려 죄송합니다.</div>
              </div>
            </div>
          </InstallBoxStyledIOS>
        </InstallStyled>
      )}
      <MapContainer
        selected={selected}
        setSelected={setSelected}
        alcoholIdx={alcoholIdx}
        foodIdx={foodIdx}
        noiseIdx={noiseIdx}
        selectedIdx={selectedIdx}
      />
      <BottomContainer
        locY={locY}
        setLocY={setLocY}
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
      {/* <BottomContainer2
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
      /> */}

      {/* <BottomSheet /> */}
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

const InstallBoxStyledIOS = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: ${getWidthPixel(368)};

  border-radius: ${getHeightPixel(27)};
  background-color: #2b2827;
  box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.25);
  z-index: 102;

  .textBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    padding: ${getHeightPixel(20)};
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${getHeightPixel(8)} 0;
    font-family: 'Jalnan';
  }

  .red {
    font-size: ${getWidthPixel(32)};
    color: #bc323b;
  }

  .white {
    font-size: ${getWidthPixel(34)};
    color: #bababa;
  }

  .small {
    font-size: ${getWidthPixel(20)};
    color: white;
    line-height: ${getHeightPixel(30)};
  }

  .img {
    width: 100%;
  }

  .img-gradation {
    width: ${getWidthPixel(340)};
    height: ${getHeightPixel(354)};
    position: absolute;
    background: linear-gradient(#2b2827, #2b282760);
  }

  .bottomBox {
    width: 100%;
    height: ${getHeightPixel(100)};
    border-radius: 0px 0px ${getHeightPixel(27)} ${getHeightPixel(27)};
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .downButton {
    width: ${getWidthPixel(128)};
    height: ${getHeightPixel(54)};
    border: none;
    border-radius: ${getHeightPixel(22)};
    background-color: #bc323b;
    margin-right: ${getWidthPixel(20)};
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: ${getWidthPixel(14)};
    color: white;
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

const ShareIconStyled = styled(ShareIcon)`
  width: ${getWidthPixel(32)};
  height: ${getWidthPixel(32)};
`;

const PageStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default MainPage;
