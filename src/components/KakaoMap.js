import React, { useEffect, useState, useRef } from "react";
import Grid from "../elements/Grid";
import { Map, MapMarker, Polyline, ZoomControl } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pathActions } from "../redux/modules/geolocation";

const { kakao } = window;

export const KakaoMap = (props) => {
  const { width, height, margin, level, zoomable, children } = props;
  const [map, setMap] = useState();
  const [location, setLocation] = useState({
    lat: 37.5666805,
    lng: 126.9784147,
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
    <Grid width={width} height={height} margin={margin}>
      <Map
        center={location}
        level={level}
        style={{ width: "100%", height: "100%" }}
        zoomable={zoomable}
        onCreate={setMap}
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
        <MapMarker position={location}>
          <div style={{ color: "#000" }}>{children}</div>
        </MapMarker>
      </Map>
    </Grid>
  );
};

KakaoMap.defaultProps = {
  level: 3,
  children: "이게 나라고?",
  zoomable: true,
};

export default KakaoMap;
