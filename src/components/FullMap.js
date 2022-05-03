import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element"
import KakaoMap from "./KakaoMap";

const FullMap = (props) => {
  // const {width, height, margin, maxWidth} = props;
  // 테스트용 산 정보
  const positions = [
    {
      title: "북한산",
      addr: "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구",
      img: "https://i.esdrop.com/d/f/Z1TUf3lv5V/7seNDu2F2V.jpg",
      latlng: {
        lat: 37.65928568119137,
        lng: 126.97733384051244,
      },
    },
    {
      title: "관악산",
      addr: "서울특별시 관악구",
      img: "https://i.esdrop.com/d/f/bww1Enn4jz/6UAk4bqrIR.jpg",
      latlng: {
        lat: 37.44466683008581,
        lng: 126.96388884210135,
      },
    },
    {
      title: "지리산",
      addr: "전라북도 남원시",
      img: "https://i.esdrop.com/d/f/wiwzTggJsl/m3FC1MhwFX.jpg",
      latlng: {
        lat: 35.337592276835075,
        lng: 127.73052130599065,
      },
    },
    {
      title: "가야산",
      addr: "경상남도 합천군ㆍ거창군",
      img: "https://i.esdrop.com/d/f/bww1Enn4jz/Zku8mztZz0.jpg",
      latlng: {
        lat: 35.82281671579307,
        lng: 128.12301774151817,
      },
    },
  ];

  return (
    <>
      <MapContainer>
        <MapBox>
          <KakaoMap 
            width="100%"
            height="1000px"
            maxWidth="772px"
            level="12"
            full
            radius
            data={positions} // 지도에 마커 찍어야하는 정보 객체 전달
            
          />
        </MapBox>
      </MapContainer>
    </>
  );
};

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 150%;  
`;

const MapBox = styled.div`
  position: absolute,
  top: 0,
  left: 0,
  width: 100%,
  height: 100%,
`;
export default FullMap;