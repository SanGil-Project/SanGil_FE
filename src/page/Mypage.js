import React, { useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import Modal from "react-modal";

import { Desktop, Mobile } from "../shared/responsive";
import {
  PlanList,
  Menubar,
  FullMap,
  HorizontalScroll,
  Card,
  Header,
  MypageModal,
} from "../components/component";
import { Grid, Text, Icon, Image } from "../elements/element";

const Mypage = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const myTrackList = useSelector((state) => state?.user?.tracker);
  const myFeedList = useSelector((state) => state?.user?.feedList);
  const myBookmarkList = useSelector((state) => state?.user?.mountList);
  const menuColor = [false, false, false, false, true]; // 메뉴바 색

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(userActions.myBookmarkDB(position.coords.latitude, position.coords.longitude));
      });
    }
    dispatch(userActions.myTrackingDB());
    dispatch(userActions.myFeedDB(1));
  }, []);

  return (
    <React.Fragment>
      <Mobile>
        <MypageContainer>
          <Header />
          <MypageWrap>
            <Grid bg="#F5FCF4" padding="96px 25px 23px" height="auto">
              <MypageModal />
            </Grid>
            <Grid
              padding="27px 14px 0"
              maxHeight="312px"
              overflowY="scroll"
            >
              <PlanList userInfo={userInfo} />
            </Grid>
            <Grid padding="34px 14px 25px" height="auto">
              <Text bold="600" size="20px" margin="0 0 24px" align="left">
                🚩 정복한 산길
              </Text>
              <FullMap zoomable={false} data={myTrackList} />{" "}
              {/* 지도에 마커 찍어야하는 정보 객체 전달 : 여기서 보낼지, FullMap에서 보낼지.. */}
            </Grid>
            <Grid padding="35px 14px 25px" height="auto">
              <Text bold="600" size="20px" margin="0 0 24px" align="left">
                🚩 나의 피드 모아보기
              </Text>
                <HorizontalScroll>
                  {myFeedList?.feedList?.map((cur, idx) => {
                    const good = cur.goodStatus ? false : "0.2"
                    return (
                    <Grid key={idx} width="auto" margin="0 10px 0 0">
                      <Card width="150px" height="150px" margin="0" shadow="0px 1px 4px rgba(0, 0, 0, 0.1)">
                        <Image
                          width="150px"
                          height="150px"
                          borderRadius="10px"
                          border="none"
                          src={cur.feedImageUrl}
                        />
                      </Card>
                      <Grid margin="4px" flexRow justify="left">
                        <Icon fillOpacity={good} type="mypageFeedLike" width="13px" height="12px" margin="0 auto"/>
                        <Text margin="0 4px" size="12px" bold="500" color="#43CA3B">{cur.goodCnt}</Text>
                      </Grid>
                    </Grid>
                    );}
                  )}
                </HorizontalScroll>
            </Grid>
            <Grid padding="35px 14px 70px" height="auto">
              <Grid
                // border="1px solid green"
                margin="0 auto 60px auto"
                height="238px"
              >
                <Text
                  width="350px"
                  height="24px"
                  margin="0 7px 24px 0"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  ❤️ 정복해야할 산길
                </Text>
                <HorizontalScroll>
                  {myBookmarkList?.map((cur, idx) => (
                    <div key={idx}>
                      <Card
                        width="194px"
                        height="120px"
                        margin="10px 7px 8px 7px"
                      >
                        <Icon
                          type="like"
                          width="18px"
                          height="18px"
                          margin="0 0 -103px 163px"
                        />
                      </Card>
                      <Text margin="8px 0 0 7px" bold="600" size="1.4rem">
                        {cur.mountainName}
                      </Text>

                      <Grid
                        height="20px"
                        isFlex
                        width="194px"
                        margin="8px 7px 0 7px"
                      >
                        <Text bold="300" size="1.2rem">
                          {cur.starAvr}
                        </Text>
                        <Text bold="400" size="1.2px">
                          {cur.distance}
                        </Text>
                      </Grid>
                    </div>
                  ))}
                </HorizontalScroll>
              </Grid>
            </Grid>
          </MypageWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </MypageContainer>
      </Mobile>
      <Desktop>
        <MypageContainer>
          <Header />
          <MypageWrap>
            <Grid bg="#979797" padding="96px 14px 35px" height="auto">
              <MypageModal />
            </Grid>
            <Grid
              bg="#D2D2D2"
              padding="27px 14px 28px"
              height="312px"
              overflowY="scroll"
            >
              <PlanList userInfo={userInfo} />
            </Grid>
            <Grid padding="36px 14px 25px" height="auto">
              <Text bold="600" size="20px" margin="0 0 24px" align="left">
                🚩 정복한 산길
              </Text>
              <FullMap zoomable={false} data={myTrackList} />{" "}
              {/* 지도에 마커 찍어야하는 정보 객체 전달 : 여기서 보낼지, FullMap에서 보낼지.. */}
            </Grid>
            <Grid padding="35px 14px 70px" height="auto">
              <Grid
                // border="1px solid green"
                margin="0 auto 60px auto"
                height="238px"
              >
                <Text
                  width="350px"
                  height="24px"
                  margin="0 7px 24px 7px"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  ❤️ 정복해야할 산길
                </Text>
                <HorizontalScroll>
                  {myBookmarkList?.map((cur, idx) => (
                    <div key={idx}>
                      <Card
                        width="194px"
                        height="120px"
                        margin="10px 7px 8px 7px"
                      >
                        <Icon
                          type="like"
                          width="18px"
                          height="18px"
                          margin="0 0 -103px 163px"
                        />
                      </Card>
                      <Text margin="8px 0 0 7px" bold="600" size="1.4rem">
                        {cur.mountainName}({cur.mountainAddress})
                      </Text>

                      <Grid
                        height="20px"
                        isFlex
                        width="194px"
                        margin="8px 7px 0 7px"
                      >
                        <Text bold="300" size="1.2rem">
                          평균 ⭐ {cur.starAvr}
                        </Text>
                        <Text bold="400" size="1.2px">
                          {cur.distance}
                        </Text>
                      </Grid>
                    </div>
                  ))}
                </HorizontalScroll>
              </Grid>
            </Grid>
          </MypageWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </MypageContainer>
      </Desktop>
    </React.Fragment>
  );
};

const MypageContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  // min-width: 414px;
  max-width: 500px;
  margin: auto;
  background-color: #F1F1F1;
`;

const MypageWrap = styled.div`
  // position: relative;
  top: 64px;
  height: 100%;
  // overflow-y: auto;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export default Mypage;
