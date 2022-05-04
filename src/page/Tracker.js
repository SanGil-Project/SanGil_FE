import React, { useEffect, useRef } from "react";
import KakaoMap from "../components/KakaoMap";
import { Grid } from "../elements/element";
import { Header } from "../components/component";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pathActions } from "../redux/modules/geolocation";

const Tracker = () => {
  const [myLoca, setMyLoca] = React.useState();

  const path = useRef();
  const polylinePath = useSelector((state) => state.polyline.polylinePath);
  const dispatch = useDispatch();

  useEffect(() => {
    path.current = setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMyLoca({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            dispatch(pathActions.setPath(myLoca));
          },
          (err) => {
            console.log("에러남: ", err);
          }
        );
      }
    }, 5000);
    return () => clearTimeout(path.current);
  }, [myLoca]);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLoca({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <Grid border="1px solid black" width="414px" margin="0 auto">
      <Header />
      <Grid padding="7px" height="844px">
        <KakaoMap
          width="386px"
          height="579px"
          level="3"
          margin="0 auto"
          myLoca={myLoca}
          zoomable={false}
          polylinePath={polylinePath}
        />
      </Grid>
    </Grid>
  );
};

export default Tracker;
