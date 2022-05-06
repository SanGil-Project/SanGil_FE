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
  return (
    <React.Fragment>
      <MapMarker
        style = {{display: "none"}}
        position={{lat: content.lat, lng: content.lng}} // 마커를 표시할 위치
        onClick={(marker) => {markerClick(marker)}} // 해당 좌표로 지동 이동시키기
        // onClick={() => setSeleteMarker(index)}
        // isClicked={selectedMarker === index}
        // onClick={() => setIsVisible(!isVisible)} 
        // MouseOver event 추가시 
        // onMouseOver={(marker) => map.panTo(marker.getPosition())}
        // onMouseOut={() => setIsVisible(false)}
      >
        {/* <ClickMarker 
          index={index}
          isClicked={selectedMarker === index}
          content={content}/> */}
        {isClicked && isVisible &&
        <CustomOverlayMap index={index} position={{lat: content.lat, lng: content.lng}} yAnchor={1.18} zIndex={1}>
          <MarkerInfo>
            <Image src={content.mountainImageUrl} type="rectangle"/>
            <Grid padding="5px 10px 10px">
              <Text margin="5px 0" bold="600" size="16px">{content.mountainName}</Text>
              <Text margin="0" size="13px">{content.mountainAddress}</Text>
            </Grid>
            {/* <div className="close" onClick={()=> setIsVisible(!isVisible)}>X</div> */}
            <div className="close" onClick={()=> setIsVisible(!isVisible)}>자세히</div>
            
          </MarkerInfo>
        </CustomOverlayMap>} 
      </MapMarker>

      {/* <Grid padding="15px 14px 100px" height="auto">
      {data.map((d, idx) => {
        return (
        <Grid key={idx} padding="10px 16px" margin="0 0 15px" height="auto" bg="#efefef" isFlex hover>
          <Grid isFlex width="auto">
            <Grid bg="#fff" border="none" radius="12px" padding="6px 11px" width="auto" height="auto">
              <Text margin="0" size="18px" nowrap>{d.mountainId}. {d.mountainName}</Text>
            </Grid>
            <Text size="16px" bold="400" margin="0 20px">{d.mountainAddress}</Text>
          </Grid>
          <Text size="16px" bold="400" margin="0" nowrap>평균 ⭐ {d.starAvr}</Text>
        </Grid>);
      })}
      </Grid> */}

    </React.Fragment>
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