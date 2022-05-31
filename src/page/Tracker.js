import React, { useEffect, useRef, useState, useCallback } from "react";
import KakaoMap from "../components/map/KakaoMap";
import { Grid, Button, Text } from "../elements/element";
import { Header, SearchTracking, EndTracking } from "../components/component";
import {
  startDB,
  endClimbDB,
  deleteDB,
  setPathDB,
  setPath,
  deletePath,
} from "../redux/modules/tracker";
import { actionCreators as handleActions } from "../redux/modules/handle";
import { useDispatch, useSelector } from "react-redux";
import StopWatch from "../components/StopWatch";
import { useNavigate } from "react-router";

const Tracker = (props) => {
  const [name, setName] = useState();
  const [mountainId, setMountainId] = useState();
  const [endOpen, setEndOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(true);
  const [completedId, setCompletedId] = useState();
  const path = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _distance = useSelector((state) => state.tracker.distance);
  const mountainImg = useSelector((state) => state.tracker.mountainImg);
  const polylinePath = useSelector(
    (state) => state.tracker?.polylinePath.polylinePath
  );

  const [myLoca, setMyLoca] = useState({ lat: "", lng: "" });
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
    if ("wakeLock" in navigator) {
      try {
        wakeLock?.release();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    dispatch(handleActions.isPagename(``));
    if (navigator.geolocation && time.isStart === false) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLoca({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          alert("현재 위치를 표시할 수 없어요.");
          navigate("/main", { replace: true });
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    // 왜 setTimeout을 썼는지 고민할 것
    path.current = setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMyLoca({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            if (time.isStart === true) {
              dispatch(setPathDB(completedId, myLoca));
              dispatch(setPath(myLoca));
              if (_distance?.distanceM) {
                setDistance((prev) => ({
                  distanceM: prev.distanceM + Number(_distance?.distanceM),
                  distanceK: prev.distanceK + Number(_distance?.distanceK),
                }));
              }
            }
          },
          (err) => {
            alert("현재 위치를 표시할 수 없어요");
            navigate("/main", { replace: true });
          },
          { enableHighAccuracy: true }
        );
      }
    }, 1000);
    return () => clearTimeout(path.current);
  }, [myLoca]);

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
          ...time,
          isStart: false,
        });
        dispatch(deletePath());
        setCompletedId();
        releaseWakeLock();
        navigate("/main", { replace: true });
      }
    } else {
      if (window.confirm("등산을 종료하시겠습니까?") === true) {
        dispatch(
          endClimbDB(completedId, {
            totalDistance: distance.distanceK,
            totalTime: `${time.stopwatch.h}:${time.stopwatch.m}:${time.stopwatch.s}`,
          })
        );
        setEndOpen(true);
        setTime({
          ...time,
          isStart: false,
        });
        dispatch(deletePath());
        setCompletedId();
        releaseWakeLock();
      }
    }
  };

  return (
    <>
      <Header />
      <Grid height="100vh" bg="#fff" padding="64px 0 0 0">
        <KakaoMap
          width="100%"
          height="70%"
          level="3"
          margin="0"
          zoomable={false}
          myLoca={myLoca}
          polylinePath={polylinePath}
        />
        <Grid
          width="92.8%"
          bg="#fff"
          height="20%"
          padding="16px 0 0 0"
          margin="0 auto"
        >
          <Grid
            minWidth="280px"
            width="70.71%"
            height="60px"
            isFlex
            margin="20px auto 0 auto"
          >
            <Grid width="100px">
              <Text color="#C4C4C4" margin="0">
                이동한 거리
              </Text>
              <Text margin="7px 0 0 0">
                <span style={{ fontSize: "2.5rem", color: "#43ca3b" }}>
                  {Number(distance.distanceK).toFixed(2)}
                </span>
                km
              </Text>
            </Grid>
            <Grid width="180px">
              <Text margin="0" color="#C4C4C4">
                소요 시간
              </Text>
              <Grid width="220px" height="25px" margin="7px 0 0 0">
                <StopWatch
                  size="2.5rem"
                  time={time}
                  setTime={setTime}
                  color="#43ca3b"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid width="75.7%" height="48px" margin="50px auto 0 auto">
            {time.isStart ? (
              <>
                <Button
                  border="none"
                  bgColor="#6F6F6F"
                  color="#fff"
                  width="47.3%"
                  height="48px"
                  radius="12px"
                  margin="0 5px"
                  _onClick={pause}
                >
                  잠시 쉬기
                </Button>
                <Button
                  border="none"
                  bgColor="#43CA3B"
                  color="#fff"
                  width="47.3%"
                  height="48px"
                  radius="12px"
                  _onClick={endClimb}
                >
                  등산 완료
                </Button>
              </>
            ) : !completedId ? (
              <Button
                border="none"
                bgColor="#43CA3B"
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
                border="none"
                bgColor="#6F6F6F"
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
      {searchOpen ? (
        <SearchTracking
          name={name}
          setName={setName}
          setMountainId={setMountainId}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
      ) : null}
      {endOpen ? (
        <EndTracking
          name={name}
          endOpen={true}
          setEndOpen={setEndOpen}
          time={time.stopwatch}
          setTime={setTime}
          setDistance={setDistance}
          distance={Number(distance.distanceK).toFixed(2)}
          mountainId={mountainId}
          mountainImg={mountainImg}
        />
      ) : null}
    </>
  );
};

export default Tracker;
