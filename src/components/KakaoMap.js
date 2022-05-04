import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

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
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pathActions } from "../redux/modules/geolocation";

const { kakao } = window;

export const KakaoMap = (props) => {

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
  } = props;

  console.log(data);

  const [location, setLocation] = useState({
    lat: 36.5,
    lng: 127.8,
  });

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
            strokeColor={"#ff0000"} // 선의 색깔
            strokeOpacity={0.7} // 선의 불투명도 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={"solid"} // 선의 스타일
          />
        ) : null}
        {full ? (
          data.map((p, idx) => {
            return <EventMarkerContainer key={idx} content={p} />;
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
