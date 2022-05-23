import React, { useEffect, useRef, useState, useCallback } from "react";
import KakaoMap from "../components/KakaoMap";
import { Grid, Button, Text, Icon, Input } from "../elements/element";
import { Header, SearchTracking, EndTracking } from "../components/component";
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
import { useNavigate } from "react-router";

const Tracker = (props) => {
  const [name, setName] = useState();
  const [mountainId, setMountainId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [completedId, setCompletedId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _distance = useSelector((state) => state.tracker.distance);
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
    try {
      wakeLock?.release();
      console.log("Wake lock has been released.");
    } catch (err) {
      console.log(err);
    }
  };

  const path = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLoca({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          alert("현재 위치를 표시할 수 없어요");
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
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
                  distanceM: prev.distanceM + parseFloat(_distance?.distanceM),
                  distanceK: prev.distanceK + parseFloat(_distance?.distanceK),
                }));
              }
            }
          },
          (err) => {
            alert("현재 위치를 표시할 수 없어요");
          },
          { enableHighAccuracy: true }
        );
      }
    }, 3000);
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
          stopwatch: { s: 0, m: 0, h: 0 },
          isStart: false,
        });
        setDistance({ distanceM: 0.0, distanceK: 0.0 });
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
        setIsOpen(true);
        setTime({
          ...time,
          isStart: false,
        });
        setCompletedId();
        releaseWakeLock();
      }
    }
  };

  return (
    <>
      <Mobile>
        <Grid width="100vw" margin="0 auto">
          <Grid height="100vh">
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
              width="100vw"
              bg="#fff"
              height="30%"
              padding="16px 0 0 0"
              margin="0 auto"
            >
              <Text align="center" size="2rem" bold="600" margin="0 0 19px 0">
                {name}
              </Text>
              <Grid
                width="250px"
                height="60px"
                isFlex
                margin="20px auto 0 auto"
              >
                <Grid width="100px">
                  <Text align="center" color="#C4C4C4" margin="0">
                    이동한 거리
                  </Text>
                  <Text margin="0 auto" align="center">
                    <span style={{ fontSize: "2.5rem" }}>
                      {distance.distanceK}
                    </span>
                    km
                  </Text>
                </Grid>
                <Grid width="120px">
                  <Text margin="0" align="center" color="#C4C4C4">
                    소요 시간
                  </Text>
                  <Grid
                    width="100px"
                    textAlign
                    lineHeight="25px"
                    margin="0 auto"
                  >
                    <StopWatch size="2.5rem" time={time} setTime={setTime} />
                  </Grid>
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
      </Mobile>

      <Desktop>
        <Grid width="500px" margin="0 auto" height="100vh">
          <Header />
          <Grid height="64px" />
          <Grid height="1254px" bg="#fff">
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
              width="414px"
              bg="#fff"
              height="20%"
              padding="16px 0 0 0"
              margin="0 auto"
            >
              <Grid
                width="342px"
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
                      {distance.distanceK}
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
              <Grid
                width="260px"
                height="30px"
                isFlex
                margin="5px auto 0 auto"
              ></Grid>

              <Grid width="342px" height="48px" margin="auto">
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
                      border="none"
                      bgColor="#43CA3B"
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
          <SearchTracking
            name={name}
            setName={setName}
            setMountainId={setMountainId}
          />
          {isOpen ? (
            <EndTracking
              name={name}
              isOpen={true}
              setIsOpen={setIsOpen}
              time={time.stopwatch}
              setTime={setTime}
              setDistance={setDistance}
              distance={distance.distanceK}
              mountainId={mountainId}
            />
          ) : null}
        </Grid>
      </Desktop>
    </>
  );
};

export default Tracker;
