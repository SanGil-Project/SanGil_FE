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
  // 테스트용 산 정보
  const positions = [
    {
      title: "북한산",
      addr: "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구",
      img: "https://i.esdrop.com/d/f/Z1TUf3lv5V/7seNDu2F2V.jpg",
      latlng: {
        lat: 37.65928568119137,
        lng: 126.97733384051244,
      },
    },
    {
      title: "관악산",
      addr: "서울특별시 관악구",
      img: "https://i.esdrop.com/d/f/bww1Enn4jz/6UAk4bqrIR.jpg",
      latlng: {
        lat: 37.44466683008581,
        lng: 126.96388884210135,
      },
    },
    {
      title: "지리산",
      addr: "전라북도 남원시",
      img: "https://i.esdrop.com/d/f/wiwzTggJsl/m3FC1MhwFX.jpg",
      latlng: {
        lat: 35.337592276835075,
        lng: 127.73052130599065,
      },
    },
    {
      title: "가야산",
      addr: "경상남도 합천군ㆍ거창군",
      img: "https://i.esdrop.com/d/f/bww1Enn4jz/Zku8mztZz0.jpg",
      latlng: {
        lat: 35.82281671579307,
        lng: 128.12301774151817,
      },
    },
  ];

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
    type,
    myLoca,
  } = props;

  const [markinfo, setMarkinfo] = useState(false);
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
        {type ? (
          positions.map((p, idx) => {
            return <EventMarkerContainer key={idx} content={p} />;
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
