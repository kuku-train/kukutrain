import React, { useState } from 'react';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import styled, { keyframes } from 'styled-components';
import Restaurant from '../../Assets/icon/Restaurant.svg';
import Cheer from '../../Assets/icon/Cheer.svg';
import Toilet from '../../Assets/icon/Toilet.svg';
import Restaurant_map_gray from '../../Assets/icon/Restaurant_map_gray.svg';
import { WIDTH } from '../../utils/responsive';
import { data } from '../../data/data';
import { FILTER__LIST, FILTER__TYPE__LIST } from '../../constants';
import CurrentLocationSVG from './CurrentLocationSVG.svg'; // 현위치 SVG 파일 경로를 수정하세요

const CENTER = { lat: 37.5843918209331, lng: 127.02957798348103 };
const SIZE = 27;

export default function MapContainer({ selected, setSelected, alcoholIdx, foodIdx, noiseIdx, selectedIdx }) {
  const { datas } = data;
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null); // 현위치 마커 상태 추가
  const [Map, setMap] = useState(null); // map 상태 추가
  let filteredData = null;
  if (selectedIdx === 0) filteredData = datas.filter(data => data.type === 'toilet');
  if (selectedIdx === 1) {
    const filterIdx = {
      alcohol: alcoholIdx,
      food: foodIdx,
      noise: noiseIdx,
    };

    filteredData =
      alcoholIdx.length === 0 && foodIdx.length === 0 && noiseIdx.length === 0
        ? datas.filter(data => data.type === 'restaurant')
        : datas.filter(data => {
            if (data.type !== 'restaurant') return false;
            let flag = false;

            for (const type of FILTER__TYPE__LIST) {
              const list = filterIdx[type]; // Idx
              if (list.length === 0) continue;

              if (!data[type]) return false;

              const filterList = list.map(idx => FILTER__LIST[type].list[idx]);
              if (type === 'noise') {
                if (filterList.includes(data[type])) flag = true;
              } else {
                for (const filter of data[type]) {
                  if (filterList.includes(filter)) flag = true;
                }
              }
            }

            return flag;
          });
  }
  if (selectedIdx === 2) filteredData = datas.filter(data => data.type === 'cheer');

  const selectedData = selected === -1 ? null : datas.find(data => data.id === selected);
  const centerPos = selectedData ? selectedData.position : CENTER;

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation && Map) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // 기존 마커가 있다면 삭제합니다.
          if (currentLocationMarker) {
            currentLocationMarker.setMap(null);
          }

          // 새로운 마커를 생성하여 추가합니다.
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
            image: new window.kakao.maps.MarkerImage(
              CurrentLocationSVG, // SVG 파일 경로
              new window.kakao.maps.Size(40, 40),
              {
                offset: new window.kakao.maps.Point(20, 20),
              }
            ),
          });

          marker.setMap(Map);
          setCurrentLocationMarker(marker);

          // 지도 중심을 현위치로 이동합니다.
          Map.setCenter(new window.kakao.maps.LatLng(lat, lng));
        },
        error => {
          console.error('Error getting current location:', error);
        }
      );
    }
  };

  return (
    <div>
      <StyledMap center={centerPos} isPanto={true}>
        {filteredData.map(data => {
          const { id, position, type } = data;

          if (type === 'restaurant') {
            if (selected === -1 || selected === id) {
              return (
                <MapMarker
                  onClick={() => setSelected(id)}
                  key={id}
                  position={position}
                  image={{ src: Restaurant, size: { width: SIZE, height: SIZE } }}
                  onCreate={maker => {
                    maker.setZIndex(100);
                  }}
                />
              );
            } else {
              return (
                <MapMarker
                  onClick={() => setSelected(id)}
                  key={id}
                  position={position}
                  image={{ src: Restaurant_map_gray, size: { width: SIZE, height: SIZE } }}
                  onCreate={maker => {
                    maker.setZIndex(1);
                  }}
                />
              );
            }
          } else if (type === 'cheer') {
            return (
              <MapMarker key={id} position={position} image={{ src: Cheer, size: { width: SIZE, height: SIZE } }} />
            );
          } else {
            return (
              <MapMarker key={id} position={position} image={{ src: Toilet, size: { width: SIZE, height: SIZE } }} />
            );
          }
        })}
      </StyledMap>
      <CurrentLocationButton onClick={handleCurrentLocationClick}>
        <img src={CurrentLocationSVG} alt="현위치" />
      </CurrentLocationButton>
    </div>
  );
}

const scaleUp = keyframes`
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

const StyledMap = styled(Map)`
  position: absolute;
  left: 0;
  top: 0;
  width: ${WIDTH + 'px'};
  height: 100%;
  z-index: 0;

  img[title] {
    animation: ${scaleUp} 0.4s ease-in both;
  }
`;

const CurrentLocationButton = styled.button`
  position: absolute;
  z-index: 1000;
  bottom: 100px;
  left: 20px;
  background: #fff;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;
