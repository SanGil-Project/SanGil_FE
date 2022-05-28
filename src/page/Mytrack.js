import React from "react";
import styled from "styled-components";
import KakaoMap from "../components/KakaoMap";
import { Grid, Text } from "../elements/element";
import { Header } from "../components/component";
import { actionCreators as trackActions } from "../redux/modules/tracker";
import { actionCreators as handleActions } from "../redux/modules/handle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Mytrack = (props) => {
  const menuColor = [false, false, false, false, true]; // 메뉴바 색
  const { completedId } = useParams();
  const dispatch = useDispatch();
  const myTrack = useSelector((state) => state?.tracker?.myTrack);

  React.useEffect(() => {
    if (completedId) {
      dispatch(handleActions.isPagename(""));
      dispatch(trackActions.getCompletedDB(completedId));
    }
  }, []);

  const polylinePath = useSelector(
    (state) => state.tracker?.polylinePath?.polylinePath[0]
  );

  const time = myTrack?.totalTime.split(":");

  return (
    <React.Fragment>
      <MytrackContainer>
        <Header />
        <MytrackWrap>
          <Grid bg="#fff" padding="64px 0 0" height="auto">
            <Grid height="calc(100vh - 64px);">
              <KakaoMap
                width="100%"
                height="100%"
                level="3"
                margin="0"
                zoomable={false}
                draggable={false}
                myLoca={myTrack?.trackingList[0]}
                polylinePath={myTrack?.trackingList}
              />
            </Grid>
            <Footer>
              <Grid height="auto" isFlex>
                <Text margin="0" bold="500" size="18px">
                  {myTrack?.mountain}
                </Text>
                <Grid
                  width="auto"
                  border="1px solid #43CA3B"
                  radius="4px"
                  padding="6px 7px"
                >
                  <Text margin="0" size="12px" bold="500" color="#43CA3B">
                    {myTrack?.createAt.split("T")[0]}
                  </Text>
                </Grid>
              </Grid>
              <Grid flexRow alignItems="flex-start" margin="12px 0 0">
                <Grid
                  flexColumn
                  height="auto"
                  width="25%"
                  alignItems="flex-start"
                  margin="0 18px 0 0"
                >
                  <Text margin="0" size="16px" bold="500" color="#C4C4C4">
                    총 거리
                  </Text>
                  <Grid flexRow alignItems="baseline" width="auto">
                    <Text margin="0" size="25px" bold="600" color="#43CA3B">
                      {myTrack?.totalDistance.toFixed(2)}
                    </Text>
                    <Text margin="0" size="8px" bold="500">
                      km
                    </Text>
                  </Grid>
                </Grid>
                <Grid flexColumn height="auto" alignItems="flex-start">
                  <Text margin="0 0 4px" size="16px" bold="500" color="#C4C4C4">
                    소요 시간
                  </Text>
                  <Grid flexRow alignItems="baseline" width="auto">
                    <Text
                      margin="0"
                      size="25px"
                      bold="600"
                      color="#43CA3B"
                      nowrap
                    >
                      {time && time[0]}
                    </Text>
                    <Text margin="0" size="8px" bold="500">
                      시간
                    </Text>
                    <Text
                      margin="0"
                      size="25px"
                      bold="600"
                      color="#43CA3B"
                      nowrap
                    >
                      {time && time[1]}
                    </Text>
                    <Text margin="0" size="8px" bold="500">
                      분
                    </Text>
                    <Text
                      margin="0"
                      size="25px"
                      bold="600"
                      color="#43CA3B"
                      nowrap
                    >
                      {time && time[2]}
                    </Text>
                    <Text margin="0" size="8px" bold="500">
                      초
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            </Footer>
          </Grid>
        </MytrackWrap>
      </MytrackContainer>
    </React.Fragment>
  );
};

const MytrackContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  // min-width: 414px;
  max-width: 500px;
  margin: auto;
  background-color: #f1f1f1;
`;

const MytrackWrap = styled.div`
  // position: relative;
  top: 64px;
  height: 100%;
  // overflow-y: auto;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 160px;
  width: 100%;
  max-width: 500px;
  border-top-right-radius: 28px;
  border-top-left-radius: 28px;
  padding: 27px 30px;
  z-index: 100;
  box-sizing: border-box;
`;

export default Mytrack;
