import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { actionCreators as handleActions } from "../redux/modules/handle";

import { Grid, Text, Icon, Image } from '../elements/element';
import { Map, MapMarker, Polyline, ZoomControl, useMap, CustomOverlayMap } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({ index, content, onClick, isClicked, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false)
  const [isOver, setIsOver] = useState(false)
  // const [selectedMarker, setSeleteMarker] = useState()
  const markerClick = () => {
    console.log("누름")
    onClick();
    setIsVisible(!isVisible);
    // map.panTo(marker.getPosition());
  }

  const select = (completedId, idx) => {
    console.log(idx);
    dispatch(handleActions.selectMarkerDB(completedId, idx));
    navigate(`/mytrack/${completedId}`);
  }
  // 마커 이미지 hover, click 상황에따라 변경
  let markerImg = isOver ?  
    "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png" :
    "https://user-images.githubusercontent.com/91959791/169664175-5428595a-2e8e-4c76-b738-596aba4f070a.png";

  let markerW = isOver ? 32 : 18;
  let markerH = isOver ? 46 : 26;
  let offsetX = isOver ? 16 : 9;
  let offsetY = isOver ? 46 : 26;

  if (isClicked) {
    markerImg = "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png";
    markerW = 32;
    markerH = 46;
    offsetX = 16;
    offsetY = 46;
  }

  
  if (content.totalTime) {
    return (
      <React.Fragment>
        <MapMarker
          position={{lat: content.lat, lng: content.lng}} // 마커를 표시할 위치
          // onClick={(marker) => {markerClick(marker)}} 
          onClick={markerClick} 
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
          image={{
            src: markerImg,
            size: {
              width: markerW,
              height: markerH,
            },
            options: {
              offset: {
                x: offsetX,
                y: offsetY,
              }
            }
          }}
        >
          {/* {isVisible && */}
          {isClicked && isVisible &&
          <CustomOverlayMap index={index} position={{lat: content.lat, lng: content.lng}} yAnchor={1.56} zIndex={1}>
            <MymarkerInfo>
              <Grid padding="9px 13px" _onClick={()=>{select(content.completedId, index)}} hover>
                <Text margin="5px 0" bold="600" size="14px">{content.mountain}</Text>
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