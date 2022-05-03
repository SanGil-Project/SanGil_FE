import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element"
import KakaoMap from "./KakaoMap";

const MyMap = (props) => {
  // const {width, height, margin, maxWidth} = props;

  return (
    <>
      <MapContainer>
        <Text bold="600" size="20px" margin="0 0 24px" align="left">🚩 정복한 산길</Text>
        <MapBox>
          <KakaoMap 
            width="100%"
            height="1000px"
            maxWidth="772px"
            level="12"
            type
          />
        </MapBox>
      </MapContainer>
    </>
  );
};

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 150%;
  
  // border-radius: 10px;
  // box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1); 
  // padding: 14px 15px;
  // margin-top: 10px; 
`;

const MapBox = styled.div`
  position: absolute,
  top: 0,
  left: 0,
  width: 100%,
  height: 100%,
  // border-radius: 10px;
`;
export default MyMap;