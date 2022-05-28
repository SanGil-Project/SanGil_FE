import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element";
import KakaoMap from "./KakaoMap";

const FullMap = (props) => {
  const { data, getIndex, zoomable, size, padding } = props;

  return (
    <>
      <MapContainer padding={padding}>
        <MapBox>
          <KakaoMap
            width="100%"
            height={size}
            maxWidth="772px"
            level="13"
            full
            radius
            zoomable={zoomable}
            data={data} // 지도에 마커 찍어야하는 정보 객체 전달
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
  padding-bottom: ${(props) => (props.padding ? "121%" : "141%")};
`;

const MapBox = styled.div`
  position: absolute,
  top: 0,
  left: 0,
  width: 100%,
  height: 100%,
`;
export default FullMap;
