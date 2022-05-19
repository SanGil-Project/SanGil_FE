import React from "react";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import { Grid, Icon, Text, Button, Image } from "../elements/element";
import {
  HorizontalScroll,
  Card,
  Header,
  Menubar,
} from "../components/component";
import {
  partyDB,
  mountainsDB,
  feedDB,
  aroundDB,
  bookmarkDB,
} from "../redux/modules/main";
import { Desktop, Mobile } from "../shared/responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Main = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const userInfo = useSelector((state) => state.user.userInfo);
  const menuColor = [false, false, true, false, false]; // 메뉴바 색

  const feedList = useSelector((state) => state.main.feedList?.feedList);
  const around = useSelector((state) => state.main.around?.nearbyMountainDtos);
  const party = useSelector((state) => state.main.parties?.parties);
  console.log(party);
  const mountain = useSelector((state) => state.main?.mountains);

  const goDetail = (mountainId) => {
    navigate(`/searchdetail/${mountainId}`);
  };

  React.useEffect(() => {
    if (userInfo && token) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          dispatch(
            aroundDB(position.coords.latitude, position.coords.longitude)
          );
        });
      }
      dispatch(mountainsDB());
      dispatch(feedDB());
      dispatch(partyDB());
    }
  }, [userInfo]);

  const bookmark = (mountainId, type) => {
    dispatch(bookmarkDB(mountainId, type));
  };

  return (
    <>
      {/* <Mobile>
        <MainContainer>
          <Header />
          <Grid padding="7px" overflowY="scroll">
            <Grid height="453px" margin="86px 0 25px 0">
              <Text
                width="91.78%"
                height="24px"
                margin="0 0 0 7px"
                bold="600"
                size="2rem"
                lineHeight="24px"
              >
                🌲 좋아요 순 10
              </Text>
              <Card
                border="2px solid #B3B3B3"
                maxWidth="386px"
                height="120px"
                margin="34px auto 0 auto"
                bgImg="https://i.esdrop.com/d/f/bww1Enn4jz/5RrOZgFwvp.jpg"
                bgSize="cover"
                // _onClick={() => navigate(`/searchdetail/관악산`)}
              >
                <Icon width="34px" height="29px" type="rank" />
                <Text
                  width="9px"
                  height="17px"
                  size="1.4rem"
                  bold="300"
                  margin="-32px 14px"
                  color="#fff"
                >
                  1
                </Text>
                <Icon type="like" width="18px" margin="0 0 -30% 93%" />
              </Card>
              <Grid maxWidth="386px" margin="0 auto" height="30px">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Text
                    maxWidth="170px"
                    margin="10px 8px 0 7px"
                    bold="600"
                    size="1.4rem"
                    height="17px"
                    lineHeight="17px"
                  >
                    강원도 홍천군 두촌면
                  </Text>
                  <Text
                    margin="10px 0 0 0"
                    maxWidth="240px"
                    bold="200"
                    size="1.4rem"
                    height="17px"
                    lineHeight="17px"
                  >
                    가리산
                  </Text>
                </div>
              </Grid>

              <HorizontalScroll>
                {mountain?.map((el, idx) => (
                  <div key={idx}>
                    <Card
                      width="194px"
                      height="120px"
                      margin="34px 7px 8px 7px"
                      bgImg={el.mountainImgUrl}
                      bgSize="cover"
                      // _onClick={() => navigate(`/searchdetail/관악산`)}
                    >
                      <Icon width="34px" height="29px" type="rank" />
                      <Text
                        width="9px"
                        height="17px"
                        size="1.4rem"
                        bold="300"
                        margin="-32px 14px"
                        color="#fff"
                      >
                        {el.mountainId}
                      </Text>
                      <Icon
                        type="like"
                        width="18px"
                        height="18px"
                        margin="0 0 -117px 163px"
                      />
                    </Card>
                    <Text
                      maxWidth="130px"
                      margin="10px 8px 0 7px"
                      bold="600"
                      size="1.4rem"
                    >
                      {el.mountainAddress}
                    </Text>
                    <Text margin="10px 0 0 7px" bold="200" size="1.4rem">
                      {el.mountainName}
                    </Text>
                  </div>
                ))}
              </HorizontalScroll>
            </Grid>
            <Grid
              // border="1px solid green"
              margin="0 auto 50px auto"
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
                👀 주변 산길
              </Text>
              <HorizontalScroll>
                {mainState.around?.nearbyMountainDtos.map((el, idx) => (
                  <div key={idx}>
                    <Card
                      width="194px"
                      height="120px"
                      margin="10px 7px 8px 7px"
                      bgImg={el.mountainImgUrl}
                      bgSize="cover"
                    >
                      <Icon
                        type="like"
                        width="18px"
                        height="18px"
                        margin="0 0 -103px 163px"
                      />
                    </Card>
                    <Text margin="8px 0 0 7px" bold="600" size="1.4rem">
                      {el.mountainName}
                    </Text>

                    <Grid
                      height="20px"
                      isFlex
                      width="194px"
                      margin="8px 7px 0 7px"
                    >
                      <Text bold="300" size="1.2rem">
                        평가 없음 {el.starAvr}
                      </Text>
                      <Text bold="400" size="1.2rem">
                        {el.distance}km
                      </Text>
                    </Grid>
                  </div>
                ))}
              </HorizontalScroll>
            </Grid>
            <Grid height="220px">
              <Grid
                maxWidth="99.23%"
                margin="0 7px 24px 7px"
                height="25px"
                isFlex
              >
                <Text
                  width="350px"
                  height="24px"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  📷 실시간 정복한 산길 인증샷
                </Text>
                <Grid
                  margin="0 18px 0 0"
                  fontSize="12px"
                  fontWeight="300"
                  width="48px"
                  textAlign
                  lineHeight="24px"
                  hover
                  isFlex
                  _onClick={() => {
                    navigate("/feed");
                  }}
                >
                  <span>더보기</span>
                  <Icon type="arrow" width="5px" height="8px" />
                </Grid>
              </Grid>
              <HorizontalScroll>
                {mainState.feedList?.feedList.map((el, idx) => (
                  <div key={idx} style={{ margin: "10px 0 10px 0" }}>
                    <Card width="150px" height="150px" margin="0 7px 0 7px">
                      <Image
                        width="150px"
                        height="150px"
                        borderRadius="10px"
                        border="none"
                        src={el.feedImgUrl}
                      />
                    </Card>
                  </div>
                ))}
              </HorizontalScroll>
            </Grid>
            <Grid height="238px" margin="36px 0 20px 0">
              <Grid
                maxWidth="99.23%"
                margin="0 7px 34px 7px"
                height="25px"
                isFlex
              >
                <Text
                  width="350px"
                  height="24px"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  📣 산길러 모여라~
                </Text>
                <Grid
                  margin="0 18px 0 0"
                  fontSize="12px"
                  fontWeight="300"
                  width="48px"
                  textAlign
                  lineHeight="24px"
                  hover
                  isFlex
                  _onClick={() => {
                    navigate("/party");
                  }}
                >
                  <span>더보기</span>
                  <Icon type="arrow" width="5px" height="8px" />
                </Grid>
              </Grid>
              {mainState.parties?.parties.map((el, idx) => {
                return (
                  <Card
                    key={idx}
                    border="1px solid green"
                    width="386px"
                    height="85px"
                    margin="0 auto 14px auto"
                    padding="10px"
                    _onClick={() => {
                      goParty(el);
                    }}
                  >
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyMountain" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {el.title}
                      </Text>
                    </Grid>
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyDate" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {el.partyDate}
                      </Text>
                    </Grid>
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyPeople" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {el.curPeople}/{el.maxPeople}
                      </Text>
                    </Grid>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <TrackBtn>
                <Button
                  border="none"
                  width="50px"
                  height="50px"
                  bgColor="#5CB16E"
                  radius="100%"
                  // margin="-167vw 0 0 85vw" // 스마트폰,태블릿마다 위치가 다름, 고칠 것
                  _onClick={() => navigate("/searchmountain")}
                >
                  <Icon type="climber" width="20px" height="32px" />
                </Button>
              </TrackBtn>
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </MainContainer>
      </Mobile> */}

      {/* 데스크탑 */}
      <Desktop>
        <MainContainer>
          <Header />
          <Grid padding="7px" overflowY="scroll">
            <Grid height="453px" margin="90px auto 75px auto">
              <Text
                width="380px"
                height="24px"
                margin="0 0 0 7px"
                bold="600"
                size="2rem"
                lineHeight="24px"
              >
                🌲 좋아요 순 10
              </Text>
              <Card
                border="2px solid #B3B3B3"
                width="386px"
                height="200px"
                margin="34px auto 0 auto"
                bgImg={mountain && mountain[0]?.mountainImgUrl}
                bgSize="cover"
              >
                <Icon
                  margin="0 0 0 24px"
                  width="34px"
                  height="29px"
                  type="rank"
                />
                <Text
                  width="9px"
                  height="17px"
                  size="1.6rem"
                  bold="700"
                  margin="-32px 37px"
                  color="#fff"
                >
                  1
                </Text>
                <Icon
                  type="like"
                  width="18px"
                  margin="0 0 -190px 355px"
                  fill={
                    mountain && mountain[0]?.bookmark ? "#43ca3b" : "#c4c4c4"
                  }
                  _onClick={() => {
                    bookmark(mountain[0]?.mountainId, "mountain");
                  }}
                />
              </Card>
              <Grid
                height="30px"
                maxWidth="386px"
                margin="0 auto"
                hover
                flex="flex"
                _onClick={() => {
                  goDetail(mountain[0].mountainId);
                }}
              >
                <Text maxWidth="260px" bold="600" size="1.4rem">
                  {mountain && mountain[0]?.mountainAddress}
                </Text>
                <Text width="90px" bold="200" size="1.4rem" margin="0 10px">
                  {mountain && mountain[0]?.mountain}
                </Text>
              </Grid>

              <HorizontalScroll>
                {mountain &&
                  mountain
                    .filter((el, idx) => idx !== 0)
                    .map((el, idx) => (
                      <div key={idx}>
                        <Card
                          width="194px"
                          height="120px"
                          margin="34px 7px 8px 7px"
                          bgImg={el.mountainImgUrl}
                          bgSize="cover"
                        >
                          <Icon
                            margin="0 0 0 20px"
                            width="34px"
                            height="29px"
                            type="rank"
                          />
                          <Text
                            width="9px"
                            height="17px"
                            size="1.6rem"
                            bold="700"
                            margin="-32px 0 0 33px"
                            color="#fff"
                            align="center"
                          >
                            {idx + 2}
                          </Text>
                          <Icon
                            type="like"
                            width="18px"
                            height="18px"
                            margin="0 0 -87px 163px"
                            fill={el.bookmark ? "#43ca3b" : "#c4c4c4"}
                            _onClick={() => {
                              bookmark(el.mountainId, "mountain");
                            }}
                          />
                        </Card>
                        <Grid
                          height="40px"
                          hover
                          _onClick={() => {
                            goDetail(el.mountainId);
                          }}
                          margin="0 0 0 7px"
                        >
                          <Text
                            maxWidth="160px"
                            margin="0"
                            bold="600"
                            size="1.4rem"
                            ellipsis="1"
                          >
                            {el.mountainAddress}
                          </Text>
                          <Text margin="0" bold="200" size="1.4rem">
                            {el.mountain}
                          </Text>
                        </Grid>
                      </div>
                    ))}
              </HorizontalScroll>
            </Grid>

            <Grid
              // border="1px solid green"
              margin="0 auto 50px auto"
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
                👀 주변 산길
              </Text>
              <HorizontalScroll>
                {around?.map((el, idx) => (
                  <div key={idx}>
                    <Card
                      width="194px"
                      height="120px"
                      margin="10px 7px 8px 7px"
                      bgImg={el.mountainImgUrl}
                      bgSize="cover"
                    >
                      <Icon
                        type="like"
                        width="18px"
                        height="18px"
                        margin="0 0 -103px 163px"
                        fill={el.bookmark ? "#43ca3b" : "#c4c4c4"}
                        _onClick={() => {
                          bookmark(el.mountainId, "around");
                        }}
                      />
                    </Card>
                    <Grid
                      hover
                      width="195px"
                      height="40px"
                      margin="0 0 0 7px"
                      _onClick={() => {
                        goDetail(el.mountainId);
                      }}
                    >
                      <Text margin="0" bold="600" size="1.4rem">
                        {el.mountainName}
                      </Text>

                      <Grid height="20px" isFlex width="194px" margin="0">
                        <Text bold="300" size="1.2rem">
                          <BsStarFill color="#43CA3B" /> {el.starAvr}
                        </Text>
                        <Text bold="400" size="1.2rem" color="#43CA3B">
                          {el.distance}km
                        </Text>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </HorizontalScroll>
            </Grid>

            <Grid height="220px">
              <Grid maxWidth="472px" margin="0 0 24px 7px" height="25px" isFlex>
                <Text
                  width="350px"
                  height="24px"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  📷 실시간 정복한 산길 인증샷
                </Text>
                <Grid
                  margin="0 18px 0 0"
                  fontSize="12px"
                  fontWeight="300"
                  width="48px"
                  textAlign
                  lineHeight="24px"
                  hover
                  isFlex
                  _onClick={() => {
                    navigate("/feed");
                  }}
                >
                  <span>더보기</span>
                  <Icon type="arrow" width="5px" height="8px" />
                </Grid>
              </Grid>
              <HorizontalScroll>
                {feedList?.map((el, idx) => (
                  <div key={idx} style={{ margin: "10px 0 10px 0" }}>
                    <Card width="150px" height="150px" margin="0 7px 0 7px">
                      <Image
                        width="150px"
                        height="150px"
                        borderRadius="10px"
                        border="none"
                        src={el.feedImgUrl}
                      />
                    </Card>
                  </div>
                ))}
              </HorizontalScroll>
            </Grid>
            <Grid width="94.4%" height="238px" margin="40px auto 20px auto">
              <Grid maxWidth="100%" margin="0 0 34px 0" height="25px" isFlex>
                <Text
                  width="350px"
                  height="24px"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  📣 산길러 모여라~
                </Text>
                <Grid
                  margin="0 18px 0 0"
                  fontSize="12px"
                  fontWeight="300"
                  width="48px"
                  textAlign
                  lineHeight="24px"
                  hover
                  isFlex
                  _onClick={() => {
                    navigate("/party");
                  }}
                >
                  <span>더보기</span>
                  <Icon type="arrow" width="5px" height="8px" />
                </Grid>
              </Grid>
              {party?.map((el, idx) => {
                return (
                  <Card
                    key={idx}
                    border="1px solid green"
                    maxWidth="93.23%"
                    height="86px"
                    margin="0 auto 14px auto"
                  >
                    <Grid
                      border="1px solid #43CA3B"
                      width="42px"
                      height="16px"
                      lineHeight="12px"
                      radius="14px"
                      color="#43CA3B"
                      fontSize="1.2rem"
                      textAlign
                      margin="7px 0 0 10px"
                    >
                      new
                    </Grid>
                    <Grid
                      maxWidth="95%"
                      height="16px"
                      margin="5px auto 0 auto"
                      isFlex
                    >
                      <Text bold="600" size="1.6rem">
                        {el.title}
                      </Text>
                      <Text size="1.2rem" bold="500">
                        {el.curPeople}/{el.maxPeople}명
                      </Text>
                    </Grid>
                    <Grid
                      maxWidth="95%"
                      height="16px"
                      margin="10px auto 0 auto"
                      isFlex
                    >
                      <Text bold="500" size="1.2rem">
                        {el.partyDate}
                      </Text>
                      <Text
                        size="1.2rem"
                        bold="500"
                        color="#C4C4C4"
                        hover
                        _onClick={() => navigate(`/partydetail/${el.partyId}`)}
                      >
                        자세한 내용 보기
                      </Text>
                    </Grid>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <TrackBtn>
                <Button
                  width="50px"
                  height="50px"
                  bgColor="#5CB16E"
                  border="none"
                  color="#fff"
                  radius="100%"
                  // position="fixed"
                  // margin="-80px 0 0 350px"
                  _onClick={() => navigate("/tracker")}
                >
                  <Icon type="climber" width="20px" height="32px" />
                </Button>
              </TrackBtn>
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </MainContainer>
      </Desktop>
    </>
  );
};

const MainContainer = styled.div`
  // position: relative;
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 0 0 100px 0;
  // min-width: 414px;
  max-width: 500px;
  margin: auto;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #9ee59c;
`;

const TrackBtn = styled.div`
  position: absolute;
  right: calc(50% - 220px);
  bottom: 110px;
`;
export default Main;
