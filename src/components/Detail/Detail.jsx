import React from 'react';
import styled from 'styled-components';
import { getHeightPixel, getWidthPixel, HEIGHT } from '../../utils/responsive';
import { ReactComponent as Marker } from '../../Assets/icon/Marker.svg';
import { ReactComponent as Call } from '../../Assets/icon/Call.svg';
import { ReactComponent as Clock } from '../../Assets/icon/Clock.svg';
import { data } from '../../data/data';

const ICON_SIZE = getWidthPixel(20);
const COLOR = ['#424242', '#9a9a9a', '#696969', '#727272'];

function FoodComponent({ image = '이미지 없음', name }) {
  return (
    <div className="item">
      <img className="item-img" src={image} alt="" />
      <div className="item-name">{name}</div>
    </div>
  );
}

export default function Detail({ locY, restaurant_id }) {
  const market = data['datas'].find(data => data.id === restaurant_id);
  const { addr, phone, time, img_main } = market;

  return (
    <StyledDetailContainer locY={locY}>
      <div className="bl-container main">
        <img src={img_main} className="img item" />
      </div>

      <div className="content-box">
        <div className="bl-container sub">
          <div className="bl-item">
            <Marker className="marker item-con" width={ICON_SIZE} height={ICON_SIZE} />
            <StyledFont className="addr item-text" color={COLOR[2]}>
              {addr}
            </StyledFont>
          </div>
          <div className="contact bl-item">
            <Call className="call item-icon" width={ICON_SIZE} height={ICON_SIZE} />
            <StyledFont className="number item-text" color={COLOR[2]}>
              {phone || '미제공'}
            </StyledFont>
          </div>
          <div className="time bl-item">
            <Clock className="clock item-icon" width={ICON_SIZE} height={ICON_SIZE} />
            <StyledFont className="tm item-text" color={COLOR[2]}>
              {time ? time.split('~').join(' ~ ') : '미제공'}
            </StyledFont>
          </div>
        </div>
      </div>

      <div className="split"></div>

      <StyledGrid className="bl-container" locY={locY}>
        {market['snack'] &&
          market['snack'].map((snack, idx) => <FoodComponent key={idx} image={snack.image} name={snack.name} />)}
      </StyledGrid>
    </StyledDetailContainer>
  );
}

const StyledDetailContainer = styled.div`
  width: 100%;
  margin-top: -${getHeightPixel(15)};
  height: ${({ locY }) => getHeightPixel(HEIGHT - locY)};
  overflow-y: auto;

  .split {
    border: ${getHeightPixel(10)} solid #dedede;
  }

  .split-first {
    margin-top: ${getHeightPixel(12)};
  }

  .inner-split {
    border: ${getHeightPixel(1)} solid #efefef;
  }

  .content-box {
    margin-top: ${getHeightPixel(12)};
    margin-bottom: ${getHeightPixel(12)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .bl-container {
    margin: 0 auto;
    width: ${getWidthPixel(368)};
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .item {
      margin-top: 0.75em;
    }

    .img {
      width: 100%;
      height: ${getHeightPixel(200)};
      border: 1px solid #e3e3e3;
      border-radius: 15px;
      margin-top: ${getHeightPixel(20)};
    }

    .name {
      font-size: ${getWidthPixel(18)};
      font-weight: 800;
    }

    .type {
      font-size: ${getWidthPixel(14)};
      font-weight: 500;
      color: #bc323b;
    }
  }

  .sub {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .bl-item {
      display: flex;
      align-items: center;
      height: ${getHeightPixel(40)};
    }

    .item-text {
      margin-left: ${getWidthPixel(18)};
      font-size: ${getWidthPixel(12)};
    }
  }
`;

const StyledFont = styled.div`
  color: ${({ color }) => color};
  text-align: center;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  max-height: ${({ locY }) => getHeightPixel(HEIGHT - (locY + 275))};
  justify-items: center;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: content-box;
    width: ${getWidthPixel(104)};
    height: ${getHeightPixel(130)};
    margin-top: 1em;

    border: 1px solid #e3e3e3;
  }

  .item-img {
    width: ${getWidthPixel(104)};
    height: ${getWidthPixel(100)};

    object-fit: cover;

    border-bottom: 1px solid #e3e3e3;
  }

  .item-name {
    height: ${getHeightPixel(30)};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.5rem;
  }
`;
