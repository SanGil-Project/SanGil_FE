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
    data,
  } = props;

  const [location, setLocation] = useState({
    lat: 36.5,
    lng: 127.8,
  });
  // const path = useRef();
  // const polylinePath = useSelector((state) => state.polyline.polylinePath);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       (err) => {
  //         console.log("에러남: ", err);
  //       }
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   path.current = setTimeout(() => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setLocation({
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           });
  //           dispatch(pathActions.setPath(location));
  //         },
  //         (err) => {
  //           console.log("에러남: ", err);
  //         }
  //       );
  //     }
  //   }, 5000);
  //   return () => clearTimeout(path.current);
  // }, [location]);

  return (
    <Grid width={width} height={height} margin={margin} maxWidth={maxWidth}>
      <Map
        center={location}
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
          <ZoomControl position={kakao.maps.ControlPosition.TOPLEFT} />
        ) : (
          ""
        )}
        {/* <Polyline
          path={[[...polylinePath]]}
          strokeWeight={5} // 선의 두께
          strokeColor={"#ff0000"} // 선의 색깔
          strokeOpacity={0.7} // 선의 불투명도 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일
        /> */}
        {full ? (
          data.map((d, idx) => {
            return <EventMarkerContainer key={idx} content={d} />;
          })
        ) : myLoca ? (
          <MapMarker position={location} />
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
