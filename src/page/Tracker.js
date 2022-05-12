import React, { useEffect, useRef } from "react";
import KakaoMap from "../components/KakaoMap";
import { Grid, Button, Text, Icon, Input } from "../elements/element";
import { Header } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import { startDB, endClimbDB, deleteDB } from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import StopWatch from "../components/StopWatch";
import { useNavigate, useParams } from "react-router";
import { setPathDB, setPath } from "./../redux/modules/tracker";

const Tracker = (props) => {
  const { name, mountainId } = useParams();
  const navigate = useNavigate();
  const distance = useSelector((state) => state.tracker.distance);
  const [completedId, setCompletedId] = React.useState();
  const [myLoca, setMyLoca] = React.useState();
  const [time, setTime] = React.useState({
    s: 0,
    m: 0,
    h: 0,
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
  const polylinePath = useSelector((state) => state.tracker.polylinePath.polylinePath);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (navigator.geolocation) {
      // console.log("이게1");
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLoca({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
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
            if (time.isStart && completedId) {
              dispatch(setPathDB(completedId, myLoca));
              dispatch(setPath(myLoca));
            }
          },
          (err) => {
            alert("에러: ", err);
          }
        );
      }
    }, 1000);
    return () => clearTimeout(path.current);
  }, [myLoca, time.isStart]);

  const startCal = async () => {
    acquireWakeLock();
    await dispatch(startDB(mountainId, setCompletedId));
    // dispatch(setPathDB(completedId, myLoca));
    setTime({ ...time, isStart: true });
  };

  const reStart = () => {
    acquireWakeLock();
    // dispatch(setPathDB(completedId, myLoca));
    setTime({ ...time, isStart: true });
  };

  const pause = () => {
    console.log(completedId);
    setTime({ ...time, isStart: false });
  };

  const stop = (distance, endTime) => {
    releaseWakeLock();
    if (time.h !== 0 || time.m >= 3) {
      dispatch(
        endClimbDB(completedId, {
          totalDistance: distance,
          totalTime: `${time.h}시간 ${time.m}분 ${time.s}초`,
        })
      );
      navigate(`/endtracking/${name}`, {
        state: { distance: distance, time: endTime },
      });
      setTime({ ...time, s: 0, m: 0, h: 0, distance: 0, isStart: false });
    } else if (time.h === 0 && time.m < 3) {
      if (window.confirm("10분 미만의 등산은 기록되지 않습니다") === true) {
        dispatch(deleteDB(completedId));
        setTime({ ...time, s: 0, m: 0, h: 0, distance: 0, isStart: false });
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <>
      <Mobile>
        <Grid width="100vw" margin="0 auto">
          <Header />
          <Grid height="100vh">
            <KakaoMap
              width="100%"
              height="70%"
              level="3"
              margin="0"
              myLoca={myLoca}
              zoomable={false}
              polylinePath={polylinePath}
            />
            <Grid width="99.5%" bg="#fff" height="30%" padding="16px 0 0 0">
              <Text align="center" size="2rem" bold="600" margin="0 0 19px 0">
                {name}
              </Text>
              <Grid
                width="60.67%"
                height="19px"
                isFlex
                margin="20px auto 0 auto"
              >
                <Text width="40%" align="center" color="#C4C4C4">
                  이동한 거리
                </Text>
                <Text width="30.27%" align="center" color="#C4C4C4">
                  소요 시간
                </Text>
              </Grid>
              <Grid
                width="40.52%"
                height="30px"
                isFlex
                margin="5px auto 0 auto"
              >
                <Text>
                  <span style={{ fontSize: "2.5rem" }}>
                    {distance?.distanceK ? distance.distanceK : `0.00`}
                  </span>
                  km
                </Text>
                <Grid width="14.27%" textAlign lineHeight="25px">
                  <StopWatch time={time} setTime={setTime} size="2.5rem" />
                </Grid>
              </Grid>

              <Grid width="82.76%" height="48px" margin="20px auto">
                {time.isStart ? (
                  <>
                    <Button
                      border="none"
                      bgColor="#6F6F6F"
                      color="#fff"
                      maxWidth="48.53%"
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
                      maxWidth="48.53%"
                      height="48px"
                      radius="12px"
                      _onClick={stop}
                    >
                      등산 완료
                    </Button>
                  </>
                ) : time.s === 0 ? (
                  <Button
                    bgColor="black"
                    color="#fff"
                    width="100%"
                    height="48px"
                    radius="12px"
                    _onClick={startCal}
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

      {/* 데스크탑 */}
      <Desktop>
        <Grid border="1px solid black" width="414px" margin="0 auto">
          <Header />
          <Grid height="1080px">
            <KakaoMap
              width="100%"
              height="70%"
              level="3"
              margin="0"
              myLoca={myLoca}
              zoomable={false}
              polylinePath={polylinePath}
            />
            <Grid width="412px" bg="#fff" height="30%" padding="16px 0 0 0">
              <Text align="center" size="2rem" bold="600" margin="0 0 19px 0">
                {name}
              </Text>
              <Grid
                width="250px"
                height="19px"
                isFlex
                margin="20px auto 0 auto"
              >
                <Text width="100px" align="center" color="#C4C4C4">
                  이동한 거리
                </Text>
                <Text width="100px" align="center" color="#C4C4C4">
                  소요 시간
                </Text>
              </Grid>
              <Grid width="260px" height="30px" isFlex margin="5px auto 0 auto">
                <Text margin="0 0 0 30px">
                  <span style={{ fontSize: "2.5rem" }}>
                    {distance?.distanceK ? distance.distanceK : `0.00`}
                  </span>
                  km
                </Text>
                <Grid width="100px" textAlign lineHeight="25px">
                  <StopWatch time={time} setTime={setTime} size="2.5rem" />
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
                      _onClick={() =>
                        stop(distance?.distanceK, {
                          s: time.s,
                          m: time.m,
                          h: time.h,
                        })
                      }
                    >
                      등산 완료
                    </Button>
                  </>
                ) : time.s === 0 ? (
                  <Button
                    bgColor="black"
                    color="#fff"
                    width="100%"
                    height="48px"
                    radius="12px"
                    _onClick={startCal}
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
      </Desktop>
    </>
  );
};

export default Tracker;
