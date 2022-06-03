import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { actionCreators as handleActions } from "../../redux/modules/handle";

import { Grid, Text, Icon, Image } from "../../elements/element";
import {
  Map,
  MapMarker,
  Polyline,
  ZoomControl,
  useMap,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

const EventMarkerContainer = ({ index, content, onClick, isClicked, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
  const [isOver, setIsOver] = useState(false);
  // const [selectedMarker, setSeleteMarker] = useState()
  const markerClick = () => {
    onClick();
    setIsVisible(!isVisible);
    // map.panTo(marker.getPosition());
  };

  const select = (completedId, idx) => {
    dispatch(handleActions.selectMarkerDB(completedId, idx));
    navigate(`/mytrack/${completedId}`);
  };

  let time = [];
  if (content?.totalTime) {
    time = content?.totalTime.split(":");
  }
  // 마커 이미지 hover, click 상황에따라 변경
  let markerImg = isOver
    ? "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png"
    : "https://user-images.githubusercontent.com/91959791/169664175-5428595a-2e8e-4c76-b738-596aba4f070a.png";

  let markerW = isOver ? 32 : 28;
  let markerH = isOver ? 46 : 40;
  let offsetX = isOver ? 16 : 14;
  let offsetY = isOver ? 46 : 40;

  if (isClicked) {
    markerImg =
      "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png";
    markerW = 32;
    markerH = 46;
    offsetX = 16;
    offsetY = 46;
  }

  if (content.totalTime) {
    return (
      <React.Fragment>
        <MapMarker
          position={{ lat: content.lat, lng: content.lng }} // 마커를 표시할 위치
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
              },
            },
          }}
        >
          {/* {isVisible && */}
          {isClicked && isVisible && (
            <CustomOverlayMap
              index={index}
              position={{ lat: content.lat, lng: content.lng }}
              yAnchor={1.5}
              zIndex={1}
            >
              <MymarkerInfo>
                {/* <Grid padding="9px 13px" _onClick={()=>{select(content.completedId, index)}} hover> */}
                <Grid
                  bg="white"
                  width="auto"
                  height="auto"
                  padding="12px"
                  radius="12px"
                  _onClick={() => {
                    select(content.completedId, index);
                  }}
                  hover
                >
                  <Grid height="auto" isFlex>
                    <Text margin="0" bold="600" size="14px">
                      {content.mountain}
                    </Text>
                    <Grid
                      width="auto"
                      border="1px solid #43CA3B"
                      radius="4px"
                      padding="1px 4px"
                    >
                      <Text margin="0" size="6px" bold="400" color="#43CA3B">
                        {content.createdAt.split("T")[0]}
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid flexRow alignItems="flex-start" margin="12px 0 0">
                    <Grid
                      flexColumn
                      height="auto"
                      width="auto"
                      alignItems="flex-start"
                      margin="0 18px 0 0"
                    >
                      <Text
                        margin="0 0 4px"
                        size="12px"
                        bold="500"
                        color="#C4C4C4"
                      >
                        총 거리
                      </Text>
                      <Grid flexRow alignItems="baseline" width="auto">
                        <Text margin="0" size="14px" bold="600" color="#43CA3B">
                          {content.totalDistance.toFixed(2)}
                        </Text>
                        <Text margin="0" size="8px" bold="500">
                          km
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid flexColumn height="auto" alignItems="flex-start">
                      <Text
                        margin="0 0 4px"
                        size="12px"
                        bold="500"
                        color="#C4C4C4"
                      >
                        소요 시간
                      </Text>
                      <Grid flexRow alignItems="baseline" width="auto">
                        <Text
                          margin="0"
                          size="14px"
                          bold="600"
                          color="#43CA3B"
                          nowrap
                        >
                          {time[0]}
                        </Text>
                        <Text margin="0" size="8px" bold="500">
                          시간
                        </Text>
                        <Text
                          margin="0"
                          size="14px"
                          bold="600"
                          color="#43CA3B"
                          nowrap
                        >
                          {time[1]}
                        </Text>
                        <Text margin="0" size="8px" bold="500">
                          분
                        </Text>
                        <Text
                          margin="0"
                          size="14px"
                          bold="600"
                          color="#43CA3B"
                          nowrap
                        >
                          {time[2]}
                        </Text>
                        <Text margin="0" size="8px" bold="500">
                          초
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MymarkerInfo>
            </CustomOverlayMap>
          )}
        </MapMarker>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <MapMarker
        style={{ display: "none" }}
        position={{ lat: content.lat, lng: content.lng }} // 마커를 표시할 위치
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
            },
          },
        }}
      >
        {isClicked && isVisible && (
          // {isVisible && (
          // {isClicked && isVisible &&
          <CustomOverlayMap
            index={index}
            position={{ lat: content.lat, lng: content.lng }}
            yAnchor={1.2}
            zIndex={1}
          >
            <MarkerInfo>
              <Image src={content.mountainImgUrl} type="rectangle" />
              <Grid padding="5px 10px 10px">
                <Text margin="5px 0" bold="600" size="16px">
                  {content.mountain}
                </Text>
                <Text margin="0" size="13px">
                  {content.mountainAddress}
                </Text>
              </Grid>
              {/* <div className="close" onClick={()=> setIsVisible(!isVisible)}>X</div> */}
              {/* <div className="close" onClick={()=> setIsVisible(!isVisible)}>자세히</div> */}
            </MarkerInfo>
          </CustomOverlayMap>
        )}
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
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
`;

export default EventMarkerContainer;
