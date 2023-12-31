import React, { useState, useEffect } from 'react';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import styled, { keyframes } from 'styled-components';
import Restaurant from '../../Assets/icon/Restaurant.svg';
import Cheer from '../../Assets/icon/Cheer.svg';
import Toilet from '../../Assets/icon/Toilet.svg';
import Restaurant_map_gray from '../../Assets/icon/Restaurant_map_gray.svg';
import { WIDTH, getHeightPixel, getWidthPixel } from '../../utils/responsive';
import { data } from '../../data/data';
import { FILTER__LIST, FILTER__TYPE__LIST } from '../../constants';
import CurrentLocationSVG from './CurrentLocationSVG.svg';
const CENTER = { lat: 37.5843918209331, lng: 127.02957798348103 };
const SIZE = 27;

export default function MapContainer({ selected, setSelected, alcoholIdx, foodIdx, noiseIdx, selectedIdx }) {
  const { datas } = data;
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
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  const getCurrentPosition = callback => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);
          callback(locPosition);
        },
        error => {
          console.error('Error getting current location:', error);
        }
      );
    }
  };

  useEffect(() => {
    getCurrentPosition(locPosition => {
      displayMarker(locPosition);
      setMap(mapInstance => {
        if (mapInstance) {
          mapInstance.setCenter(locPosition);
        }
        return mapInstance;
      });

      let marker = userMarker;

      if (!marker) {
        marker = new window.kakao.maps.Marker({ map: map, position: locPosition, image: markerImage });
        setUserMarker(marker);
      } else {
        marker.setPosition(locPosition);
      }

      const watchId = navigator.geolocation.watchPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const newPos = new window.kakao.maps.LatLng(lat, lon);

          setUserMarker(prevMarker => {
            prevMarker.setPosition(newPos);
            return prevMarker;
          });
        },
        error => {
          console.error('Error getting current location:', error);
        },
        { timeout: 2000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    });
  }, []);
  const enableLocationLink = 'chrome://settings/content/location'; // Chrome location settings URL
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            getCurrentPosition(locPosition => {
              displayMarker(locPosition);
              setMap(mapInstance => {
                if (mapInstance) {
                  mapInstance.setCenter(locPosition);
                }
                return mapInstance;
              });
              let marker = userMarker;
              if (!marker) {
                marker = new window.kakao.maps.Marker({ map: map, position: locPosition, image: markerImage });
                setUserMarker(marker);
              } else {
                marker.setPosition(locPosition);
              }
            });
          } else if (permissionStatus.state === 'denied') {
            alert('현위치를 사용하려면 위치 권한을 허용해주세요.');
            const confirmSetting = window.confirm('위치 권한을 설정하려면 "확인"을 클릭하세요.');
            if (confirmSetting) {
              window.location.href = enableLocationLink;
            }
          }
        })
        .catch(error => {
          console.error('Error checking location permission:', error);
        });
    }
  };

  const displayMarker = locPosition => {
    if (userMarker) {
      userMarker.setMap(null);
    }

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
      image: markerImage,
    });

    setUserMarker(marker);

    if (Map) {
      map.setCenter(locPosition);
    }
  };
  let imageSrc = 'https://www.korea.ac.kr/mbshome/mbs/university/images/img/img_1_4_3_1_02.png';
  let imageSize = new kakao.maps.Size(60, 70);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  return (
    <div>
      <StyledMap center={centerPos} isPanto={true} ref={setMap}>
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
        <img src={CurrentLocationSVG} alt="현위치" style={{ width: '70%', height: '70%' }} />
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
  bottom: ${getHeightPixel(180)};
  left: ${getWidthPixel(30)};
  background: #fff;
  border: none;
  border-radius: 50%;
  padding: 0;
  width: ${getWidthPixel(50)};
  height: ${getWidthPixel(50)};
  cursor: pointer;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
