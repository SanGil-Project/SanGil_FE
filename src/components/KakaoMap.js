import React, { useEffect, useState, useRef } from "react";
import Grid from "../elements/Grid";
import { Map, MapMarker, Polyline, ZoomControl } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pathActions } from "../redux/modules/geolocation";

const { kakao } = window;

const KakaoMap = (props) => {

  const positions = [
    {
        title: '북한산', 
        latlng: {
          lat: 37.65928568119137,
          lng: 126.97733384051244,
        },
    },
    {
        title: '관악산',  
        latlng: {
          lat: 37.44466683008581,
          lng: 126.96388884210135,
        }
    },
    {
        title: '지리산',  
        latlng: {
          lat: 35.337592276835075,
          lng: 127.73052130599065,
        }
    },
    {
        title: '가야산', 
        latlng: {
          lat: 35.82281671579307,
          lng: 128.12301774151817,
        }
    }
];
  const { width, height, margin, maxWidth, level, type } = props;
  const [map, setMap] = useState();
  const [location, setLocation] = useState({
    lat: 37.5666805,
    lng: 126.9784147,
  });
  const path = useRef();
  const polylinePath = useSelector((state) => state.polyline.polylinePath);
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.log("에러남: ", err);
        }
      );
    }
  }, []);

  useEffect(() => {
    path.current = setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            dispatch(pathActions.setPath(location));
          },
          (err) => {
            console.log("에러남: ", err);
          }
        );
      }
    }, 5000);
    return () => clearTimeout(path.current);
  }, [location]);

  return (
    <Grid width={width} height={height} maxWidth={maxWidth}>
      {type ? <Map
        center={{
          lat: 36.5,
          lng: 127.8,
        }}
        level={level}
        style={{ width: "100%", height: "100%", borderRadius: "12px" }}
        onCreate={setMap}
      >
        <ZoomControl position={kakao.maps.ControlPosition.TOPLEFT} />
        {positions.map((p, idx)=>{ 
          console.log(p);
          return (
            <MapMarker key={idx} position={{...p.latlng}}>
              <div style={{ color: "#000" }}>{p.title}</div>
            </MapMarker>);
        })}
        </Map> : 
        <Map
        center={location}
        level={level}
        style={{ width: "100%", height: "100%" }}
        onCreate={setMap}
      >
        <ZoomControl position={kakao.maps.ControlPosition.TOPLEFT} />
        <Polyline
          path={[[...polylinePath]]}
          strokeWeight={5} // 선의 두께
          strokeColor={"#ff0000"} // 선의 색깔
          strokeOpacity={0.7} // 선의 불투명도 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일
        />
        <MapMarker position={{ ...location }}>
          <div style={{ color: "#000" }}>이게 나라고?</div>
        </MapMarker>
      </Map>
      }
    </Grid>
  );
};

export default KakaoMap;