import React, { useEffect, useRef } from "react";
import KakaoMap from "../components/KakaoMap";
import { Grid, Button, Text, Icon, Input } from "../elements/element";
import { Header, SearchName, EndModal } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as pathActions } from "../redux/modules/geolocation";
import StopWatch from "../components/StopWatch";
import { useNavigate } from "react-router";

const Tracker = (props) => {
  const navigate = useNavigate();
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
            if (time.isStart) {
              dispatch(pathActions.setPath(myLoca));
            }
          },
          (err) => {
            console.log("에러: ", err);
          }
        );
      }
    }, 5000);
    return () => clearTimeout(path.current);
  }, [myLoca, time.isStart]);

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

  const startCal = () => {
    acquireWakeLock();
    setTime({ ...time, isStart: true });
  };

  const pause = () => {
    setTime({ ...time, isStart: false });
  };

  const stop = () => {
    setEndOpen(true);
    releaseWakeLock();
    setTime({ ...time, s: 0, m: 0, h: 0, isStart: false });
    // navigate("/", { replace: true });
  };
  const [getName, setGetName] = React.useState({ name: "", isOpen: true });
  const [endOpen, setEndOpen] = React.useState(false);
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
                {getName.name}
              </Text>
              <Grid
                width="82.52%"
                height="19px"
                isFlex
                margin="20px auto 0 auto"
              >
                <Grid width="42.7%" isFlex></Grid>
                <Text width="22.27%" align="center" color="#C4C4C4">
                  소요 시간
                </Text>
              </Grid>
              <Grid
                width="82.52%"
                height="30px"
                isFlex
                margin="5px auto 0 auto"
              >
                <Grid width="176px" isFlex></Grid>
                <Grid width="23.27%" textAlign lineHeight="25px">
                  <StopWatch time={time} setTime={setTime} size="2.5rem" />
                </Grid>
              </Grid>

              <Grid
                border="1px solid red"
                width="82.76%"
                height="48px"
                margin="20px auto"
              >
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
                ) : (
                  <Button
                    bgColor="black"
                    color="#fff"
                    width="100%"
                    height="48px"
                    radius="12px"
                    _onClick={startCal}
                  >
                    {time.s === 0 ? `등산 시작` : `다시 출발`}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <SearchName
            width="100vw"
            contentWidth="91%"
            contentHeight="447px"
            isOpen={getName.isOpen}
            getName={getName}
            setGetName={setGetName}
            mobile
            margin="25% auto"
          />
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
                {getName.name}
              </Text>
              <Grid
                width="340px"
                height="19px"
                isFlex
                margin="20px auto 0 auto"
              >
                <Grid width="176px" isFlex></Grid>
                <Text width="100px" align="center" color="#C4C4C4">
                  소요 시간
                </Text>
              </Grid>
              <Grid width="340px" height="30px" isFlex margin="5px auto 0 auto">
                <Grid width="176px" isFlex></Grid>
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
                      _onClick={stop}
                    >
                      등산 완료
                    </Button>
                  </>
                ) : (
                  <Button
                    bgColor="black"
                    color="#fff"
                    width="342px"
                    height="48px"
                    radius="12px"
                    _onClick={startCal}
                  >
                    {time.s === 0 ? `등산 시작` : `다시 출발`}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          {getName.isOpen ? (
            <SearchName
              width="414px"
              contentWidth="375px"
              contentHeight="447px"
              height="1080px"
              isOpen={getName.isOpen}
              getName={getName}
              setGetName={setGetName}
              margin="198.5px auto"
            ></SearchName>
          ) : null}
          {endOpen ? (
            <EndModal
              width="414px"
              contentWidth="375px"
              contentHeight="447px"
              height="1080px"
              isOpen={endOpen}
              margin="198.5px auto"
              name="관악산"
            ></EndModal>
          ) : null}
        </Grid>
      </Desktop>
    </>
  );
};

export default Tracker;
