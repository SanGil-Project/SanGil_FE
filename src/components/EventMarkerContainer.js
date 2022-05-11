import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { Grid, Text, Icon, Image } from '../elements/element';
import { Map, MapMarker, Polyline, ZoomControl, useMap, CustomOverlayMap } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({ index, content, onClick, isClicked, data }) => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false)
  // const [selectedMarker, setSeleteMarker] = useState()
  const markerClick = (marker) => {
    onClick();
    setIsVisible(!isVisible);
    // map.panTo(marker.getPosition());
  }

  if (content.totalTime) {
    return (
      <React.Fragment>
        <MapMarker
          position={{lat: content.lat, lng: content.lng}} // 마커를 표시할 위치
          onClick={(marker) => {markerClick(marker)}} // 해당 좌표로 지동 이동시키기
        >
          {isClicked && isVisible &&
          <CustomOverlayMap index={index} position={{lat: content.lat, lng: content.lng}} yAnchor={1.45} zIndex={1}>
            <MymarkerInfo>
              <Grid padding="9px 13px" _onClick={()=>{window.alert(`아이디값 :: ${content.completedId}`)}} hover>
                <Text margin="5px 0" bold="600" size="14px">{content.mountainId}</Text>
                <Grid flexRow justify="left" margin="8px 0 4px">
                  <Text margin="0 18px 0 0" size="12px" bold="500" color="#C4C4C4">총 거리</Text>
                  <Text margin="0" size="12px" bold="500" color="#C4C4C4">소요 시간</Text>
                </Grid>
                <Grid flexRow justify="left">
                  <Text margin="0 18px 0 0" size="12px" bold="500">{content.totalDistance}</Text>
                  <Text margin="0" size="12px" bold="500">{content.totalTime}</Text>
                </Grid>
              </Grid>
            </MymarkerInfo>
          </CustomOverlayMap>} 
        </MapMarker>
  
      </React.Fragment>
      );
  }
  return (
    <React.Fragment>
      <MapMarker
        style = {{display: "none"}}
        position={{lat: content.lat, lng: content.lng}} // 마커를 표시할 위치
        onClick={(marker) => {markerClick(marker)}} // 해당 좌표로 지동 이동시키기
        // onClick={(marker) => map.panTo(marker.getPosition())} // 해당 좌표로 지동 이동시키기
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        { isVisible &&
        // {isClicked && isVisible &&
        <CustomOverlayMap index={index} position={{lat: content.lat, lng: content.lng}} yAnchor={1.18} zIndex={1}>
          <MarkerInfo>
            <Image src={content.mountainImgUrl} type="rectangle"/>
            <Grid padding="5px 10px 10px">
              <Text margin="5px 0" bold="600" size="16px">{content.mountain}</Text>
              <Text margin="0" size="13px">{content.mountainAddress}</Text>
            </Grid>
            {/* <div className="close" onClick={()=> setIsVisible(!isVisible)}>X</div> */}
            {/* <div className="close" onClick={()=> setIsVisible(!isVisible)}>자세히</div> */}
            
          </MarkerInfo>
        </CustomOverlayMap>} 
      </MapMarker>

    </React.Fragment>
  );
};

const MymarkerInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  // height: auto;
  // overflow: hidden;
  border: none;
  outline: none;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1);
`;
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