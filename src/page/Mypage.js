import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { deleteFeedDB, feedLikeDB } from "../redux/modules/feed";
import { actionCreators as userActions } from "../redux/modules/user";

import {
  PlanList,
  Menubar,
  FullMap,
  HorizontalScroll,
  Card,
  Header,
  MypageModal,
  AlertModal,
  Bookmark,
  MyFeedList,
} from "../components/component";
import { Grid, Text, Icon, Image, Button } from "../elements/element";

const Mypage = (props) => {
  const smallSize = window.outerWidth < 500 ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userInfo = useSelector((state) => state.user.userInfo);
  // const myTrackList = useSelector((state) => state?.user?.tracker);
  const myTrackList = useSelector((state) => state.user?.trackList);
  const selectMarker = useSelector((state) => state.handle.selectMarker?.id);
  const completedList = useSelector((state) => state.user?.myMountain);
  const myFeedList = useSelector((state) => state?.user?.feedList?.feedList);
  const myBookmarkList = useSelector((state) => state.user.mountList);
  const menuColor = [false, false, false, false, true]; // 메뉴바 색
  const img =
    userInfo?.userImageUrl !== "없음"
      ? userInfo?.userImageUrl
      : "https://user-images.githubusercontent.com/91959791/168119302-948f0dcf-8165-47af-8b6b-2f90f74aca06.png";

  const [likeCnt, setLikeCnt] = React.useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // const [selected, setSelected] = React.useState({ idx: 0, state: false });

  React.useEffect(() => {
    if (userInfo && token) {
      dispatch(userActions.myTrackingDB());
      dispatch(userActions.myFeedDB());
    }
  }, [userInfo]);

  React.useEffect(() => {
    if (selectMarker) {
      dispatch(userActions.myMountainDB(selectMarker));
    }
  }, [selectMarker]);

  const moveMytrack = (completedId) => {
    navigate(`/mytrack/${completedId}`);
  };

  const moveFeedDetail = (feedId) => {
    navigate(`/feedDetail/${feedId}`);
    // 피드상세페이지 만들어지면 연결
  };

  const moveMountDetail = (mountainId) => {
    navigate(`/searchdetail/${mountainId}`);
  };
  const like = (feedId, goodStatus, goodCnt) => {
    setLikeCnt(goodCnt);
    dispatch(feedLikeDB(feedId));
    setLikeCnt((pre) => (goodStatus ? pre - 1 : pre + 1));
    // setLikeCnt((prev) => (el.goodStatus ? (prev -= 1) : (prev += 1)));
  };

  const logOut = (check) => {
    if (check) {
      dispatch(userActions.logOutDB());
      navigate("/", { replace: true });
    }
  };

  return (
    <React.Fragment>
      <MypageContainer>
        <Header />
        {modalOpen && (
          <AlertModal
            type="choice"
            onClose={setModalOpen}
            modalState={modalOpen}
            checkFunction={logOut}
            contents="로그아웃 하실건가요? 😭"
          />
        )}
        <MypageWrap>
          <Grid bg="#F5FCF4" padding="96px 25px 23px" height="auto">
            <Grid flexRow>
              <Mainprofile>
                <Image
                  type="circle"
                  width="80px"
                  height="80px"
                  margin="0 10px 0 0"
                  src={img}
                />
                <Editbtn>
                  <Icon
                    type="profileEdit"
                    width="21px"
                    height="21px"
                    margin="0 auto"
                    _onClick={() => {
                      navigate("/mypageEdit");
                    }}
                  />
                </Editbtn>
              </Mainprofile>
              <Grid>
                <Text margin="0" size="14px" bold="400">
                  {userInfo?.userTitle}
                </Text>
                <Grid isFlex margin="10px 0 0">
                  <Text margin="0" size="20px" bold="600" color="#43CA3B">
                    {userInfo?.nickname}
                  </Text>
                  <Button
                    padding="6px 8px"
                    width="auto"
                    height="auto"
                    border="1px solid #43CA3B"
                    radius="4px"
                    _onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    <Text
                      size="12px"
                      bold="500"
                      color="#43CA3B"
                      align
                      margin="0"
                    >
                      로그아웃
                    </Text>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            padding="27px 14px 0"
            maxHeight="312px"
            height="auto"
            overflowY="scroll"
          >
            <PlanList userInfo={userInfo} />
          </Grid>
          <Grid padding="34px 14px 25px" height="auto">
            <Grid flexRow justify="left" margin="0 0 24px">
              <Image
                width="24px"
                height="24px"
                src={require("../assets/images/Flag.png")}
                margin="0 5px 0 0"
              />
              <Text bold="600" size="20px" margin="0" align="left">
                정복한 산길
              </Text>
            </Grid>
            <HorizontalScroll>
              {completedList?.map((cur, idx) => {
                const time = cur.totalTime.split(":");
                return (
                  <Grid
                    bg="white"
                    key={idx}
                    width="160px"
                    height="auto"
                    padding="12px"
                    radius="12px"
                    margin="0 10px 20px 0"
                    _onClick={() => {
                      moveMytrack(cur.completedId);
                    }}
                    hover
                  >
                    <Grid height="auto" isFlex>
                      <Text margin="0" bold="600" size="14px">
                        {cur.mountain}
                      </Text>
                      <Grid
                        width="auto"
                        border="1px solid #43CA3B"
                        radius="4px"
                        padding="1px 4px"
                      >
                        <Text margin="0" size="6px" bold="400" color="#43CA3B">
                          {cur.createAt.split("T")[0]}
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid flexRow alignItems="flex-start" margin="12px 0 0">
                      <Grid
                        flexColumn
                        height="auto"
                        alignItems="flex-start"
                        margin="0 18px 0 0"
                      >
                        <Text
                          margin="0 0 4px"
                          size="12px"
                          bold="500"
                          color="#C4C4C4"
                        >
                          총 거리
                        </Text>
                        <Grid flexRow alignItems="baseline">
                          <Text
                            margin="0"
                            size="14px"
                            bold="600"
                            color="#43CA3B"
                          >
                            {cur.totalDistance}
                          </Text>
                          <Text margin="0" size="8px" bold="500">
                            km
                          </Text>
                        </Grid>
                      </Grid>
                      <Grid flexColumn height="auto" alignItems="flex-start">
                        <Text
                          margin="0 0 4px"
                          size="12px"
                          bold="500"
                          color="#C4C4C4"
                        >
                          소요 시간
                        </Text>
                        <Grid flexRow alignItems="baseline">
                          <Text
                            margin="0"
                            size="14px"
                            bold="600"
                            color="#43CA3B"
                            nowrap
                          >
                            {time[0]}
                          </Text>
                          <Text margin="0" size="8px" bold="500">
                            시간
                          </Text>
                          <Text
                            margin="0"
                            size="14px"
                            bold="600"
                            color="#43CA3B"
                            nowrap
                          >
                            {time[1]}
                          </Text>
                          <Text margin="0" size="8px" bold="500">
                            분
                          </Text>
                          <Text
                            margin="0"
                            size="14px"
                            bold="600"
                            color="#43CA3B"
                            nowrap
                          >
                            {time[2]}
                          </Text>
                          <Text margin="0" size="8px" bold="500">
                            초
                          </Text>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </HorizontalScroll>
            <FullMap zoomable={false} data={myTrackList} size="665px" />{" "}
          </Grid>
          <Grid padding="35px 14px 25px" height="auto">
            <Grid isFlex margin="0 0 24px">
              <Grid flexRow justify="left">
                <Image
                  width="24px"
                  height="24px"
                  src={require("../assets/images/Feed.png")}
                  margin="0 5px 0 0"
                />
                <Text bold="600" size="20px" margin="0" align="left">
                  나의 피드 모아보기
                </Text>
              </Grid>
              <Grid
                margin="0 18px 0 0"
                width="auto"
                textAlign
                hover
                isFlex
                _onClick={() => {
                  navigate("/myfeed");
                }}
              >
                <Text margin="0 11px" size="12px" bold="300" color="#000">
                  더보기
                </Text>
                <Icon type="arrow" width="5px" height="8px" />
              </Grid>
            </Grid>
            <HorizontalScroll>
              {myFeedList?.map((cur, idx) => {
                return <MyFeedList key={idx} data={cur} />;
              })}
            </HorizontalScroll>
          </Grid>

          <Grid
            padding="27px 14px 50px"
            maxHeight="400px"
            height="auto"
            overflowY="scroll"
          >
            <Bookmark userInfo={userInfo} />
          </Grid>
        </MypageWrap>
        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <TrackBtn smallSize>
              <Button
                width="60px"
                height="60px"
                bgColor="#43CA3B"
                border="none"
                color="#fff"
                radius="100%"
                shadow="0px 3px 4px rgba(0, 0, 0, 0.15)"
                _onClick={() => navigate("/tracker")}
              >
                <Icon type="climber" width="20px" height="32px" />
              </Button>
            </TrackBtn>
            <Menubar menuColor={menuColor} />
          </Grid>
        </MenubarContainer>
      </MypageContainer>
    </React.Fragment>
  );
};

const MypageContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: auto;
  background-color: #f1f1f1;
  overflow: scroll;
`;

const MypageWrap = styled.div`
  // position: relative;
  top: 64px;
  height: 100%;
  padding: 0 0 50px;
  // overflow-y: auto;
`;

const Mainprofile = styled.div`
  position: relative;
`;
const Editbtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;
const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const TrackBtn = styled.div`
  position: fixed;
  right: 
  ${(props) => (props.smallSize ? `calc(0vw + 14px);` : `calc(50% - 236px);`)}
  bottom: 113px;
`;

export default Mypage;
