import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

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
  AlertModal,
  Bookmark,
} from "../components/component";
import { Grid, Text, Icon, Image, Button } from "../elements/element";

const Mypage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userInfo = useSelector((state) => state.user.userInfo);
  // const myTrackList = useSelector((state) => state?.user?.tracker);
  const myTrackList = useSelector((state) => state.user.trackList?.completedList);
  const selectMarker = useSelector((state) => state.handle.selectMarker?.id);
  const completedList = useSelector((state) => state.user.myMountain?.completedList);
  const myFeedList = useSelector((state) => state.user.feedList);
  const myBookmarkList = useSelector((state) => state.user.mountList);
  const menuColor = [false, false, false, false, true]; // 메뉴바 색
  const img = (userInfo?.userImageUrl !== "없음") ? userInfo?.userImageUrl : "https://user-images.githubusercontent.com/91959791/168119302-948f0dcf-8165-47af-8b6b-2f90f74aca06.png";
  
  const [modalOpen, setModalOpen] = useState(false);
  // const [selected, setSelected] = React.useState({ idx: 0, state: false });

  React.useEffect(() => {
    if (userInfo && token) {
      console.log("유저확인 완료!! ::", userInfo);
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition((position) => {
      //     dispatch(userActions.myBookmarkDB(position.coords.latitude, position.coords.longitude));
      //   });
      // }
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
  }

  const moveFeedDetail = (feedId) => {
    navigate(`/feedDetail/${feedId}`);
    // 피드상세페이지 만들어지면 연결
  }

  const moveMountDetail = (mountainId) => {
    navigate(`/searchdetail/${mountainId}`);
  }

  const logOut = (check) => {
    if (check) {
      dispatch(userActions.logOutDB());
      navigate("/", { replace: true });
    }
  }


  const fakeDB = {
    completedList : [
    {
      completedId : 1,
      mountainId : 1,
      mountain : "속리산",
      lat : 36.56329698,
      lng : 127.9172195,
      totalDistance: 10.3,
      totalTime: "4시간 20분 13초",
      creatDate: "2022-02-04",
    },
    {
      completedId : 3,
      mountainId : 2,
      mountain : "화악산",
      lat : 37.8881266,
      lng : 127.5492755,
      totalDistance: 20.3,
      totalTime: "6시간 20분 13초",
      creatDate: "2022-02-04",
    },
  ]}

  return (
    <React.Fragment>
      <Mobile>
        <MypageContainer>
          <Header />
          { modalOpen && 
            <AlertModal 
              type="choice"
              onClose={setModalOpen} 
              modalState={modalOpen} 
              checkFunction={logOut}
              contents="로그아웃 하실건가요? 😭"/> }
          <MypageWrap>
            <Grid bg="#F5FCF4" padding="96px 25px 23px" height="auto">
              <Grid flexRow>
                <Mainprofile>
                  <Image
                    type="circle"
                    width="80px"
                    height="80px"
                    margin="0 10px 0 0"
                    src={img}/>
                  <Editbtn>
                    <Icon type="profileEdit" width="21px" height="21px" margin="0 auto" _onClick={()=> {navigate("/mypageEdit")}}/>
                  </Editbtn>
                </Mainprofile>
                <Grid>
                  <Text margin="0" size="14px" bold="400">{userInfo?.userTitle}</Text>
                  <Grid isFlex margin="10px 0 0">
                    <Text margin="0" size="20px" bold="600" color="#43CA3B">{userInfo?.nickname}</Text>
                    <Button 
                      padding= "6px 8px" width="auto" height="auto" border="1px solid #43CA3B" radius="4px"
                      _onClick={()=>{setModalOpen(true)}}>
                      <Text size="12px" bold="500" color="#43CA3B" align margin="0">로그아웃</Text>
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
              <Grid flexRow justify="left" margin="0 0 24px" >
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
                    return (
                    <Grid bg="white" key={idx}  width="auto" height="auto" padding="12px" radius="12px" margin="0 10px 20px 0" _onClick={()=>{moveMytrack(cur.completedId)}} hover>
                        <Grid height="auto" isFlex>
                          <Text margin="0" bold="600" size="14px">{cur.mountain}</Text>
                          <Grid width="auto" border="1px solid #43CA3B" radius="4px" padding="1px 4px">
                            <Text margin="0" size="6px" bold="400" color="#43CA3B">{cur.creatDate}</Text>
                          </Grid>
                        </Grid>
                        <Grid flexRow alignItems="flex-start" margin="12px 0 0">
                          <Grid flexColumn height="auto" alignItems="flex-start" margin="0 18px 0 0" >
                            <Text margin="0 0 4px" size="12px" bold="500" color="#C4C4C4">총 거리</Text>
                            <Grid flexRow alignItems="baseline">
                              <Text margin="0" size="14px" bold="600" color="#43CA3B">{cur.totalDistance}</Text>
                              <Text margin="0" size="8px" bold="500">km</Text>
                            </Grid>
                          </Grid>
                          <Grid flexColumn height="auto" alignItems="flex-start">
                            <Text margin="0 0 4px" size="12px" bold="500" color="#C4C4C4">소요 시간</Text>
                            <Grid flexRow alignItems="baseline">
                              <Text margin="0" size="14px" bold="600" color="#43CA3B" nowrap>{cur.totalTime}</Text>
                              {/* <Text margin="0" size="8px" bold="500">시간</Text> */}
                            </Grid>
                          </Grid>
                        </Grid>
                    </Grid>
                    );}
                  )}
                </HorizontalScroll>
              <FullMap zoomable={false} data={completedList} size="665px"/>{" "}
            </Grid>
            <Grid padding="35px 14px 25px" height="auto">
              <Grid isFlex margin="0 0 24px">
                
                <Grid flexRow justify="left" >
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
                  <Text margin="0 11px" size="12px" bold="300" color="#000">더보기</Text>
                  <Icon type="arrow" width="5px" height="8px" />
                </Grid>
              </Grid>
                <HorizontalScroll>
                  {myFeedList?.map((cur, idx) => {
                    const good = cur.goodStatus ? "false" : "0.2"
                    return (
                    <Grid 
                      hover
                      key={idx} 
                      width="auto" 
                      margin="0 10px 0 0" 
                      // _onClick={()=>{moveFeedDetail(cur.feedId)}}
                      >
                      <Card width="150px" height="150px" margin="0" shadow="0px 1px 4px rgba(0, 0, 0, 0.1)">
                        <Image
                          width="150px"
                          height="150px"
                          borderRadius="10px"
                          border="none"
                          src={cur.feedImgUrl}
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
              <TrackBtn>
                <Button
                  width="60px"
                  height="60px"
                  bgColor="#43CA3B"
                  border="none"
                  color="#fff"
                  radius="100%"
                  shadow="0px 3px 4px rgba(0, 0, 0, 0.15)"
                  _onClick={() => navigate("/searchmountain")}
                >
                  <Icon type="climber" width="20px" height="32px" />
                </Button>
              </TrackBtn>
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </MypageContainer>
      </Mobile>

      <Desktop>
        <MypageContainer>
          <Header />
          { modalOpen && 
            <AlertModal 
              type="choice"
              onClose={setModalOpen} 
              modalState={modalOpen} 
              checkFunction={logOut}
              contents="로그아웃 하실건가요? 😭"/> }
          <MypageWrap>
            <Grid bg="#F5FCF4" padding="96px 25px 23px" height="auto">
              <Grid flexRow>
                <Mainprofile>
                  <Image
                    type="circle"
                    width="80px"
                    height="80px"
                    margin="0 10px 0 0"
                    src={img}/>
                  <Editbtn>
                    <Icon type="profileEdit" width="21px" height="21px" margin="0 auto" _onClick={()=> {navigate("/mypageEdit")}}/>
                  </Editbtn>
                </Mainprofile>
                <Grid>
                  <Text margin="0" size="14px" bold="400">{userInfo?.userTitle}</Text>
                  <Grid isFlex margin="10px 0 0">
                    <Text margin="0" size="20px" bold="600" color="#43CA3B">{userInfo?.nickname}</Text>
                    <Button 
                      padding= "6px 8px" width="auto" height="auto" border="1px solid #43CA3B" radius="4px"
                      _onClick={()=>{setModalOpen(true)}}>
                      <Text size="12px" bold="500" color="#43CA3B" align margin="0">로그아웃</Text>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
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
                <HorizontalScroll>
                  {completedList?.map((cur, idx) => {
                    return (
                    <Grid bg="white" key={idx}  width="auto" height="auto" padding="12px" radius="12px" margin="0 10px 20px 0" _onClick={()=>{moveMytrack(cur.completedId)}} hover>
                        <Grid height="auto" isFlex>
                          <Text margin="0" bold="600" size="14px">{cur.mountain}</Text>
                          <Grid width="auto" border="1px solid #43CA3B" radius="4px" padding="1px 4px">
                            <Text margin="0" size="6px" bold="400" color="#43CA3B">{cur.creatDate}</Text>
                          </Grid>
                        </Grid>
                        <Grid flexRow alignItems="flex-start" margin="12px 0 0">
                          <Grid flexColumn height="auto" alignItems="flex-start" margin="0 18px 0 0" >
                            <Text margin="0 0 4px" size="12px" bold="500" color="#C4C4C4">총 거리</Text>
                            <Grid flexRow alignItems="baseline">
                              <Text margin="0" size="14px" bold="600" color="#43CA3B">{cur.totalDistance}</Text>
                              <Text margin="0" size="8px" bold="500">km</Text>
                            </Grid>
                          </Grid>
                          <Grid flexColumn height="auto" alignItems="flex-start">
                            <Text margin="0 0 4px" size="12px" bold="500" color="#C4C4C4">소요 시간</Text>
                            <Grid flexRow alignItems="baseline">
                              <Text margin="0" size="14px" bold="600" color="#43CA3B" nowrap>{cur.totalTime}</Text>
                              {/* <Text margin="0" size="8px" bold="500">시간</Text> */}
                            </Grid>
                          </Grid>
                        </Grid>
                    </Grid>
                    );}
                  )}
                </HorizontalScroll>
              <FullMap zoomable={false} data={completedList} size="665px"/>{" "}
            </Grid>
            <Grid padding="35px 14px 25px" height="auto">
              <Text bold="600" size="20px" margin="0 0 24px" align="left">
                🚩 나의 피드 모아보기
              </Text>
                <HorizontalScroll>
                  {myFeedList?.feedList?.map((cur, idx) => {
                    const good = cur.goodStatus ? "false" : "0.2"
                    return (
                    <Grid key={idx} width="auto" margin="0 10px 0 0" _onClick={()=>{moveFeedDetail(cur.feedId)}} hover>
                      <Card width="150px" height="150px" margin="0" shadow="0px 1px 4px rgba(0, 0, 0, 0.1)">
                        <Image
                          width="150px"
                          height="150px"
                          borderRadius="10px"
                          border="none"
                          src={cur.feedImgUrl}
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
                {/* <HorizontalScroll>
                  {myBookmarkList?.map((cur, idx) => {
                    // const distance = cur.distance.toFixed(2);
                    return (<Grid key={idx} width="auto" margin="0 10px 0 0" _onClick={()=>{moveMountDetail(cur.mountainId)}} hover>
                      <Card
                        width="194px"
                        height="120px"
                        margin="0"
                      >
                        <Image
                          width="194px"
                          height="120px"
                          borderRadius="10px"
                          border="none"
                          src={cur.mountainImageUrl}
                        />
                      </Card>
                      <Text margin="8px 0" bold="600" size="14px">
                        {cur.mountainName} ({cur.mountainAddress})
                      </Text>
                      <Grid isFlex>
                        <Grid margin="0 4px 0 0" flexRow justify="left">
                          <Icon type="mypageBookStar" width="13px" height="12px" margin="0 auto"/>
                          <Text bold="300" size="12px" margin="0 4px">{cur.starAvr}</Text>
                        </Grid>
                        <Text bold="500" size="12px" color="#43CA3B" margin="0">
                          {cur.distance}km
                        </Text>
                      </Grid>
                    </Grid>)
                  })}
                </HorizontalScroll> */}
              </Grid>
            </Grid>
          </MypageWrap>
          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <TrackBtn>
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
  right: calc(50% - 236px);
  bottom: 113px;
`;

export default Mypage;
