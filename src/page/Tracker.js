import React, { useEffect, useRef, useState, useCallback } from "react";
import KakaoMap from "../components/KakaoMap";
import { Grid, Button, Text, Icon, Input } from "../elements/element";
import { Header } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import {
  startDB,
  endClimbDB,
  deleteDB,
  setPathDB,
  setPath,
} from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import StopWatch from "../components/StopWatch";
import { useNavigate, useParams } from "react-router";
import _ from "lodash";

const Tracker = (props) => {
  const { name, mountainId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _distance = useSelector((state) => state.tracker.distance);
  const polylinePath = useSelector(
    (state) => state.tracker?.polylinePath.polylinePath
  );
  const [myLoca, setMyLoca] = useState({ lat: "", lng: "" });
  const [completedId, setCompletedId] = useState();
  const [distance, setDistance] = useState({ distanceM: 0.0, distanceK: 0.0 });
  const [time, setTime] = useState({
    stopwatch: { s: 0, m: 0, h: 0 },
    isStart: false,
  });

  let wakeLock;
  const acquireWakeLock = async () => {
    if ("wakeLock" in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const releaseWakeLock = async () => {
    try {
      wakeLock?.release();
      console.log("Wake lock has been released.");
    } catch (err) {
      console.log(err);
    }
  };

  const path = useRef();

  useEffect(() => {
    path.current = setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setMyLoca({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          if (time.isStart === true && completedId) {
            dispatch(setPathDB(completedId, myLoca));
            dispatch(setPath(myLoca));
            if (_distance?.distanceM) {
              setDistance((prev) => ({
                distanceM: (prev.distanceM += parseFloat(_distance?.distanceM)),
                distanceK: (prev.distanceK += parseFloat(_distance?.distanceK)),
              }));
            }
          }
        });
      }
    }, 1000);
    return () => clearTimeout(path.current);
  }, []);

  const start = () => {
    acquireWakeLock();
    dispatch(startDB(mountainId, setCompletedId));
    setTime({ ...time, isStart: true });
  };

  const pause = () => {
    releaseWakeLock();
    setTime({ ...time, isStart: false });
  };

  const reStart = () => {
    acquireWakeLock();
    setTime({ ...time, isStart: true });
  };

  const endClimb = () => {
    if (
      time.stopwatch.s + time.stopwatch.m * 60 + time.stopwatch.h * 3600 <
      600
    ) {
      if (window.confirm("10분 미만의 등산은 기록되지 않습니다.") === true) {
        dispatch(deleteDB(completedId));
        setTime({
          stopwatch: { s: 0, m: 0, h: 0 },
          isStart: false,
        });
        setDistance({ distanceM: 0.0, distanceK: 0.0 });
        setCompletedId();
        releaseWakeLock();
        // navigate("/", { replace: true });
      }
    } else {
      if (window.confirm("겨우 이거하고 등산 완료?") === true) {
        dispatch(
          endClimbDB(completedId, {
            totalDistance: distance.distanceK,
            totalTime: `${time.stopwatch.h}시간 ${time.stopwatch.m}분 ${time.stopwatch.s}초`,
          })
        );
        setTime({
          stopwatch: { s: 0, m: 0, h: 0 },
          isStart: false,
        });
        setDistance({ distanceM: 0.0, distanceK: 0.0 });
        setCompletedId();
        releaseWakeLock();
        navigate(`/endtracking/${name}`, {
          state: { time: time.stopwatch, distance: distance.distanceK },
        });
      }
    }
  };

  return (
    <>
      <Grid width="500px" margin="0 auto">
        <Header />
        <Grid height="64px" />
        <Grid height="1016px">
          <KakaoMap
            width="100%"
            height="70%"
            level="3"
            margin="0"
            zoomable={false}
            myLoca={myLoca}
            polylinePath={polylinePath}
          />
          <Grid width="412px" bg="#fff" height="30%" padding="16px 0 0 0">
            <Text align="center" size="2rem" bold="600" margin="0 0 19px 0">
              {name}
            </Text>
            <Grid width="250px" height="19px" isFlex margin="20px auto 0 auto">
              <Text width="100px" align="center" color="#C4C4C4">
                이동한 거리
              </Text>
              <Text width="100px" align="center" color="#C4C4C4">
                소요 시간
              </Text>
            </Grid>
            <Grid width="260px" height="30px" isFlex margin="5px auto 0 auto">
              <Text margin="0 0 0 30px">
                <span style={{ fontSize: "2.5rem" }}>{distance.distanceK}</span>
                km
              </Text>
              <Grid width="100px" textAlign lineHeight="25px">
                <StopWatch size="2.5rem" time={time} setTime={setTime} />
              </Grid>
            </Grid>

            <Grid width="342px" height="48px" margin="20px auto">
              {time.isStart ? (
                <>
                  <Button
                    border="none"
                    bgColor="#6F6F6F"
                    color="#fff"
                    width="166px"
                    height="48px"
                    radius="12px"
                    margin="0 5px"
                    _onClick={pause}
                  >
                    잠시 쉬기
                  </Button>
                  <Button
                    bgColor="black"
                    color="#fff"
                    width="166px"
                    height="48px"
                    radius="12px"
                    _onClick={endClimb}
                  >
                    등산 완료
                  </Button>
                </>
              ) : !completedId ? (
                <Button
                  bgColor="black"
                  color="#fff"
                  width="100%"
                  height="48px"
                  radius="12px"
                  _onClick={start}
                >
                  등산 시작
                </Button>
              ) : (
                <Button
                  bgColor="black"
                  color="#fff"
                  width="100%"
                  height="48px"
                  radius="12px"
                  _onClick={reStart}
                >
                  다시 출발
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Tracker;
