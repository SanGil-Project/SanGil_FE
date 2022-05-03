import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { Grid, Text, Icon, Image } from '../elements/element';
import { Map, MapMarker, Polyline, ZoomControl, useMap, CustomOverlayMap } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({ content }) => {
  // const map = useMap()
  const [isVisible, setIsVisible] = useState(false)
  return (
    <MapMarker
      position={{...content.latlng}} // 마커를 표시할 위치
      // onClick={(marker) => map.panTo(marker.getPosition())} // 해당 좌표로 지동 이동시키기
      onClick={() => setIsVisible(!isVisible)} 
      // MouseOver event 추가시 
      // onMouseOver={() => setIsVisible(true)}
      // onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && 
      <CustomOverlayMap position={{...content.latlng}} yAnchor={1.22} zIndex={1}>
        <MarkerInfo>
          <Image src={content.img} type="rectangle"/>
          <Grid padding="5px 10px 10px">
            <Text margin="5px 0" bold="600" size="16px">{content.title}</Text>
            <Text margin="0" size="13px">{content.addr}</Text>
          </Grid>
            
            {/* <div className="close" onClick={()=> setIsVisible(!isVisible)}>X</div> */}
          
        </MarkerInfo>
      </CustomOverlayMap>}
    </MapMarker>
  );
};

const MarkerInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  // height: auto;
  // overflow: hidden;
  border: none;
  outline: none;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1);
`;

export default EventMarkerContainer;