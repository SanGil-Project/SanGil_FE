import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as handleActions } from "../redux/modules/handle";

import { Grid, Text, Icon, Image } from "../elements/element";
import EventMarkerContainer from "./EventMarkerContainer";
import {
  Map,
  MapMarker,
  Polyline,
  ZoomControl,
  useMap,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

const { kakao } = window;

export const KakaoMap = (props) => {
  const dispatch = useDispatch();

  const {
    width,
    height,
    margin,
    level,
    zoomable,
    draggable,
    children,
    maxWidth,
    radius,
    full,
    myLoca,
    polylinePath,
    data,
    getIndex,
  } = props;

  const [location, setLocation] = useState({
    lat: 36.5,
    lng: 127.8,
  });
  // const [selectMarker, setSeletMarker] = useState();

  const select = (mountainId, idx) => {
    // dispatch(handleActions.selectMarkerDB(mountainId, idx));
    setSeleteMarker(idx)
    // console.log(selectedMarker, p);
  }

  const [selectedMarker, setSeleteMarker] = useState();
  // console.log("여기서 선택된 값 :: ", selectedMarker);
  if(getIndex) {
    props.getIndex(selectedMarker); // 검색 페이지로 선택된 marker index 보내기
  }  

  return (
    <Grid width={width} height={height} margin={margin} maxWidth={maxWidth}>
      <Map
        center={myLoca ? myLoca : location}
        level={level}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius ? "12px" : "0px",
        }}
        zoomable={zoomable}
        draggable={draggable}
        isPanto={true}
      >
        {zoomable ? (
          <ZoomControl position={kakao?.maps.ControlPosition.TOPLEFT} />
        ) : (
          ""
        )}
        {polylinePath ? (
          <Polyline
            path={[[...polylinePath]]}
            strokeWeight={5} // 선의 두께
            strokeColor="#FF8310" // 선의 색깔
            strokeOpacity={0.7} // 선의 불투명도 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle="solid" // 선의 스타일
          />
        ) : null}
        {full ? (
          data?.map((p, idx) => {
            return <EventMarkerContainer
                      key={idx} 
                      index={idx} 
                      content={p}
                      data={data}
                      onClick={() => {select(p.mountainId, idx)}}
                      isClicked={selectedMarker === idx}
                    />;
          })
        ) : myLoca ? (
          <MapMarker position={myLoca ? myLoca : location} />
        ) : null}
      </Map>
    </Grid>
  );
};

KakaoMap.defaultProps = {
  level: 13,
  children: "이게 나라고?",
  zoomable: true,
  draggable: true,
};

export default KakaoMap;
