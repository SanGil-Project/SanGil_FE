import React from "react";
import { Grid, Icon, Text, Button, Image } from "../elements/element";
import {
  HorizontalScroll,
  Card,
  Header,
  Menubar,
} from "../components/component";
import { partyDB, mountainsDB, feedDB, aroundDB } from "../redux/modules/main";
import { Desktop, Mobile } from "../shared/responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Main = (props) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mainState = useSelector((state) => state.main);

  const mountain = mainState.mountains?.filter((el) => el.mountainId !== 1);
  const num = [2, 3, 4, 5];
  const menuColor = [false, false, true, false, false]; // 메뉴바 색
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(aroundDB(position.coords.latitude, position.coords.longitude));
      });
    }

    dispatch(mountainsDB());
    dispatch(feedDB());
    dispatch(partyDB());
  }, []);

  return (
    <>
      <Mobile>
        <Grid width="100vw" margin="0 auto">
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
                🌲 지금 산길러 들이 오르고있는 산 TOP 10
              </Text>
              <Card
                border="2px solid #B3B3B3"
                maxWidth="386px"
                height="120px"
                margin="34px auto 0 auto"
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
                    maxWidth="130px"
                    margin="10px 8px 0 7px"
                    bold="600"
                    size="1.4rem"
                    height="17px"
                    lineHeight="17px"
                  >
                    충청남도 서산시
                  </Text>
                  <Text
                    margin="10px 0 0 0"
                    maxWidth="240px"
                    bold="200"
                    size="1.4rem"
                    height="17px"
                    lineHeight="17px"
                  >
                    산이름졸라길다아아아아아아앙?
                  </Text>
                </div>
              </Grid>

              <HorizontalScroll>
                {num.map((cur, idx) => (
                  <div key={idx}>
                    <Card
                      width="194px"
                      height="120px"
                      margin="34px 7px 8px 7px"
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
                        {cur}
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
                      충청남도 서산시
                    </Text>
                    <Text margin="10px 0 0 7px" bold="200" size="1.4rem">
                      산이름졸라길다아아아아아아앙
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
                {num.map((cur, idx) => (
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
                      어디어디 산의 어디 코스
                    </Text>

                    <Grid
                      height="20px"
                      isFlex
                      width="194px"
                      margin="8px 7px 0 7px"
                    >
                      <Text bold="300" size="1.2rem">
                        매우 좋음 5.0
                      </Text>
                      <Text bold="400" size="1.2rem">
                        100.800km
                      </Text>
                    </Grid>
                  </div>
                ))}
              </HorizontalScroll>
            </Grid>
            <Grid height="220px">
              <Grid
                maxWidth="93.23%"
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
                  👀 실시간 정복한 산길 인증샷
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
                {mainState.feedList?.feedList.map((cur, idx) => (
                  <div key={idx} style={{ margin: "10px 0 10px 0" }}>
                    <Card width="150px" height="150px" margin="0 7px 0 7px">
                      <Image
                        width="150px"
                        height="150px"
                        borderRadius="10px"
                        border="none"
                        src={mainState.feedList?.feedList[idx].feedImgUrl}
                      />
                    </Card>
                  </div>
                ))}
              </HorizontalScroll>
            </Grid>
            <Grid height="238px" margin="36px 0 20px 0">
              <Grid
                maxWidth="93.23%"
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
                  산길러 모여라~
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
              {mainState.parties?.parties.map((cur, idx) => {
                return (
                  <Card
                    key={idx}
                    border="1px solid green"
                    width="386px"
                    height="85px"
                    margin="0 auto 14px auto"
                    padding="10px"
                  >
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyMountain" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {mainState.parties?.parties[idx].title}
                      </Text>
                    </Grid>
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyDate" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {mainState.parties?.parties[idx].partyDate}
                      </Text>
                    </Grid>
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyPeople" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {mainState.parties?.parties[idx].curPeople}/
                        {mainState.parties?.parties[idx].maxPeople}
                      </Text>
                    </Grid>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
          <Button
            border="none"
            width="50px"
            height="50px"
            bgColor="#5CB16E"
            radius="100%"
            position="absolute"
            margin="-80px 0 0 84.54%"
            _onClick={() => navigate("/searchmountain")}
          >
            <Icon type="climber" width="20px" height="32px" />
          </Button>
          <Menubar menuColor={menuColor} />
        </Grid>
      </Mobile>

      {/* 데스크탑 */}
      <Desktop>
        <Grid border="1px solid black" width="414px" margin="0 auto">
          <Header />
          <Grid padding="7px" overflowY="scroll" height="1080px">
            <Grid height="453px" margin="90px auto 25px auto">
              <Text
                width="380px"
                height="24px"
                margin="0 0 0 7px"
                bold="600"
                size="2rem"
                lineHeight="24px"
              >
                🌲 북마크 순 10
              </Text>
              <Card
                border="2px solid #B3B3B3"
                width="386px"
                height="200px"
                margin="34px auto 0 auto"
                // _onClick={() => navigate(`/searchdetail/관악산`)}
                bgImg="https://i.esdrop.com/d/f/bww1Enn4jz/5RrOZgFwvp.jpg"
                hover
                bgSize="cover"
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
                <Icon type="like" width="18px" margin="0 0 -190px 355px" />
              </Card>
              <Grid height="30px">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Text
                    maxWidth="170px"
                    margin="10px 8px 0 10px"
                    bold="600"
                    size="1.4rem"
                  >
                    강원도 홍천군 두촌면
                  </Text>
                  <Text
                    margin="10px 0 0 0"
                    width="240px"
                    bold="200"
                    size="1.4rem"
                  >
                    가리산
                  </Text>
                </div>
              </Grid>

              <HorizontalScroll>
                {mountain?.map((cur, idx) => (
                  <div key={idx}>
                    <Card
                      width="194px"
                      height="120px"
                      margin="34px 7px 8px 7px"
                      _onClick={() =>
                        navigate(`/searchdetail/${mountain[idx].mountainName}`)
                      }
                      hover
                      bgImg={mountain[idx].mountainImgUrl}
                      bgSize="cover"
                    >
                      <Icon width="34px" height="29px" type="rank" />
                      <Text
                        width="9px"
                        height="17px"
                        size="1.4rem"
                        bold="300"
                        margin="-32px 0 0 12px"
                        color="#fff"
                        align="center"
                      >
                        {mountain[idx].mountainId}
                      </Text>
                      <Icon
                        type="like"
                        width="18px"
                        height="18px"
                        margin="0 0 -87px 163px"
                      />
                    </Card>
                    <Text
                      maxWidth="160px"
                      margin="10px 8px 0 7px"
                      bold="600"
                      size="1.4rem"
                    >
                      {mountain[idx].mountainAddress}
                    </Text>
                    <Text margin="0 0 0 7px" bold="200" size="1.4rem">
                      {mountain[idx].mountainName}
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
                {mainState.around?.nearbyMountainDtos.map((cur, idx) => (
                  <div key={idx}>
                    <Card
                      width="194px"
                      height="120px"
                      margin="10px 7px 8px 7px"
                      bgImg={
                        mainState.around?.nearbyMountainDtos[idx].mountainImgUrl
                      }
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
                      {mainState.around?.nearbyMountainDtos[idx].mountainName}
                    </Text>

                    <Grid
                      height="20px"
                      isFlex
                      width="194px"
                      margin="8px 7px 0 7px"
                    >
                      <Text bold="300" size="1.2rem">
                        평가 없음{" "}
                        {mainState.around?.nearbyMountainDtos[idx].starAvr}
                      </Text>
                      <Text bold="400" size="1.2px">
                        {mainState.around?.nearbyMountainDtos[idx].distance}km
                      </Text>
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
                {mainState.feedList?.feedList.map((cur, idx) => (
                  <div key={idx} style={{ margin: "10px 0 10px 0" }}>
                    <Card width="150px" height="150px" margin="0 7px 0 7px">
                      <Image
                        width="150px"
                        height="150px"
                        borderRadius="10px"
                        border="none"
                        src={mainState.feedList?.feedList[idx].feedImgUrl}
                      />
                    </Card>
                  </div>
                ))}
              </HorizontalScroll>
            </Grid>
            <Grid width="400px" height="238px" margin="40px auto 20px auto">
              <Grid maxWidth="472px" margin="0 0 34px 7px" height="25px" isFlex>
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
              {mainState.parties?.parties.map((cur, idx) => {
                return (
                  <Card
                    key={idx}
                    border="1px solid green"
                    width="386px"
                    height="85px"
                    padding="10px"
                    margin="0 auto 14px auto"
                  >
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyMountain" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {mainState.parties?.parties[idx].title}
                      </Text>
                    </Grid>
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyDate" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {mainState.parties?.parties[idx].partyDate}
                      </Text>
                    </Grid>
                    <Grid height="20px" margin="0" flex="flex">
                      <Icon type="partyPeople" width="14px" />
                      <Text size="14px" margin="0 0 0 10px">
                        {mainState.parties?.parties[idx].curPeople}/
                        {mainState.parties?.parties[idx].maxPeople}
                      </Text>
                    </Grid>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
          <Button
            width="50px"
            height="50px"
            bgColor="#5CB16E"
            border="none"
            color="#fff"
            radius="100%"
            position="fixed"
            margin="-80px 0 0 350px"
            _onClick={() => navigate("/searchmountain")}
          >
            <Icon type="climber" width="20px" height="32px" />
          </Button>
          <Menubar menuColor={menuColor} />
        </Grid>
      </Desktop>
    </>
  );
};

export default Main;
