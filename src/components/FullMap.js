import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element";
import KakaoMap from "./KakaoMap";

const FullMap = (props) => {
  const { data, getIndex, zoomable } = props;

  // const tempIndex = (index) => {
  //   props.getIndex(index);
  //   console.log("중간 전달 index ::", index);
  // }

  return (
    <>
      <MapContainer>
        <MapBox>
          <KakaoMap
            width="100%"
            height="665px"
            maxWidth="772px"
            level="13"
            full
            radius
            zoomable={zoomable}
            data={data} // 지도에 마커 찍어야하는 정보 객체 전달
            // getIndex={getIndex}
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
