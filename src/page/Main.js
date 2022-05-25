import React from "react";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import { Grid, Icon, Text, Button, Image } from "../elements/element";
import {
  HorizontalScroll,
  Card,
  Header,
  Menubar,
  Banner,
} from "../components/component";
import {
  partyDB,
  mountainsDB,
  feedDB,
  aroundDB,
  bookmarkDB,
} from "../redux/modules/main";
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
      <MainContainer>
        <Header />
        <Grid padding="74px 7px 0 7px" overflowY="scroll">
          <Grid width="93.23%" height="120px" margin="20px auto">
            <Banner />
          </Grid>
          <Grid height="453px" margin="10px auto 75px auto">
            <Grid margin="0 7px" height="24px" flex="flex">
              <Image
                width="24px"
                height="24px"
                src={require("../assets/images/Mountain.png")}
              />
              <Text
                width="380px"
                height="24px"
                margin="0 0 0 7px"
                bold="600"
                size="2rem"
                lineHeight="24px"
              >
                좋아요 순 10
              </Text>
            </Grid>

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
                fill={mountain && mountain[0]?.bookmark ? "#43ca3b" : "#c4c4c4"}
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
                          width="16px"
                          height="17px"
                          size="1.6rem"
                          bold="700"
                          margin="-32px 0 0 28px"
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
            <Grid margin="0 7px" height="24px" flex="flex">
              <Image
                width="24px"
                height="24px"
                src={require("../assets/images/Eyes.png")}
              />
              <Text
                margin="0 0 0 10px"
                width="350px"
                height="24px"
                bold="600"
                size="2rem"
                lineHeight="24px"
              >
                주변 산길
              </Text>
            </Grid>
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
                        <BsStarFill color="#43CA3B" />{" "}
                        {el.starAvr ? el.starAvr : 0.0}
                      </Text>
                      <Text bold="400" size="1.2rem" color="#43CA3B">
                        {parseFloat(el.distance).toFixed(2)}km
                      </Text>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </HorizontalScroll>
          </Grid>

          <Grid height="220px">
            <Grid maxWidth="472px" margin="0 0 24px 7px" height="25px" isFlex>
              <Image
                width="24px"
                height="24px"
                src={require("../assets/images/Camera.png")}
              />
              <Text
                width="350px"
                height="24px"
                bold="600"
                size="2rem"
                lineHeight="24px"
              >
                실시간 정복한 산길 인증샷
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
              <Grid flex="flex">
                <Image
                  width="24px"
                  height="24px"
                  src={require("../assets/images/Megaphone.png")}
                />
                <Text
                  margin="0 0 0 10px"
                  maxWidth="94.4%"
                  height="24px"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  산길러 모여라~
                </Text>
              </Grid>

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
                    <Text
                      bold="600"
                      size="1.6rem"
                      ellipsis="1"
                      maxWidth="368px"
                    >
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
                width="60px"
                height="60px"
                bgColor="#43CA3B"
                border="none"
                color="#fff"
                radius="100%"
                shadow="0px 3px 4px rgba(0, 0, 0, 0.15)"
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
    </>
  );
};

const MainContainer = styled.div`
  // position: relative;
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 0 0 100px 0;
  min-width: 414px;
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
  margin: 0 auto;
`;

const TrackBtn = styled.div`
  position: fixed;
  right: calc(50% - 236px);
  bottom: 113px;
`;
export default Main;
