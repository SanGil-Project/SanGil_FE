import React from "react";
import styled from "styled-components";
import KakaoMap from "../components/KakaoMap";
import { Grid, Text } from "../elements/element";
import { Header } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import { actionCreators as trackActions } from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Mytrack = (props) => {
  const menuColor = [false, false, false, false, true]; // 메뉴바 색
  const { completedId } = useParams();
  const dispatch = useDispatch();
  const myTrack = useSelector((state) => state?.tracker?.myTrack);
  console.log(myTrack);

  React.useEffect(() => {
    if (completedId) {
      dispatch(trackActions.getCompletedDB(completedId));
    }
  }, []);

  const polylinePath = useSelector(
    (state) => state.tracker?.polylinePath?.polylinePath[0]
  );

  console.log(polylinePath);

  return (
    <React.Fragment>
      <Mobile>
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
                  zoomable={true}
                  // myLoca={myLoca}
                  polylinePath={polylinePath}
                />
              </Grid>
              <Footer>
                <Grid height="auto" isFlex>
                  <Text margin="0" bold="500" size="18px">{myTrack?.mountian}</Text>
                  <Grid width="auto" border="1px solid #43CA3B" radius="4px" padding="6px 7px">
                    <Text margin="0" size="12px" bold="500" color="#43CA3B">{myTrack?.creatDate}</Text>
                  </Grid>
                </Grid>
                <Grid flexRow justify="left" margin="12px 0 4px" height="auto">
                  <Text margin="0 18px 0 0" size="16px" bold="500" color="#C4C4C4" width="25%">이동한 거리</Text>
                  <Text margin="0" size="16px" bold="500" color="#C4C4C4">소요 시간</Text>
                </Grid>
                <Grid flexRow justify="left" height="auto">
                  <Text margin="0 18px 0 0" size="25px" bold="600" color="#43CA3B" width="25%">{myTrack?.totalDistance}</Text>
                  <Text margin="0" size="25px" bold="600" color="#43CA3B">{myTrack?.totalTime}</Text>
                </Grid>
              </Footer>
            </Grid>
          </MytrackWrap>
        </MytrackContainer>
      </Mobile>

      <Desktop>
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
                  zoomable={true}
                  // myLoca={myLoca}
                  polylinePath={polylinePath}
                />
              </Grid>
              <Footer>
                <Grid height="auto" isFlex>
                  <Text margin="0" bold="500" size="18px">{myTrack?.mountian}</Text>
                  <Grid width="auto" border="1px solid #43CA3B" radius="4px" padding="6px 7px">
                    <Text margin="0" size="12px" bold="500" color="#43CA3B">{myTrack?.creatDate}</Text>
                  </Grid>
                </Grid>
                <Grid flexRow justify="left" margin="12px 0 4px" height="auto">
                  <Text margin="0 18px 0 0" size="16px" bold="500" color="#C4C4C4" width="25%">이동한 거리</Text>
                  <Text margin="0" size="16px" bold="500" color="#C4C4C4">소요 시간</Text>
                </Grid>
                <Grid flexRow justify="left" height="auto">
                  <Text margin="0 18px 0 0" size="25px" bold="600" color="#43CA3B" width="25%">{myTrack?.totalDistance}</Text>
                  <Text margin="0" size="25px" bold="600" color="#43CA3B">{myTrack?.totalTime}</Text>
                </Grid>
              </Footer>
            </Grid>
          </MytrackWrap>
        </MytrackContainer>
      </Desktop>
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
  background-color: #F1F1F1;
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
