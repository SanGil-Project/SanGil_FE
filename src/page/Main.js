import React from "react";
import Grid from "../elements/Grid";
import Icon from "../elements/Icon";
import Text from "../elements/Text";
import { HorizontalScroll, Card, Header } from "../components/component";
import { Desktop } from "../shared/responsive";

const Main = () => {
  const num = [2, 3, 4, 5];

  return (
    <>
      {/* <Desktop> */}
      <Grid border="1px solid black" width="414px" margin="0 auto">
        <Header />
        <Grid padding="7px" overflowY="scroll" height="844px">
          <Grid height="453px" margin="0 auto 60px auto">
            <Text
              width="350px"
              height="24px"
              margin="30px 0 0 7px"
              bold="600"
              size="2rem"
              lineHeight="24px"
            >
              지금 산길러 들이 오르고있는 산 TOP 5
            </Text>
            <Card
              border="2px solid #B3B3B3"
              width="386px"
              height="120px"
              margin="34px auto 0 auto"
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
              <Icon type="like" width="18px" margin="0 0 -113px 355px" />
            </Card>
            <Grid height="30px">
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
                >
                  충청남도 서산시
                </Text>
                <Text
                  margin="10px 0 0 0"
                  width="240px"
                  bold="200"
                  size="1.4rem"
                >
                  산이름졸라길다아아아아아아앙?
                </Text>
              </div>
            </Grid>

            <HorizontalScroll>
              {num.map((cur, idx) => (
                <div key={idx}>
                  <Card width="194px" height="120px" margin="34px 7px 8px 7px">
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
              👀 주변 산길
            </Text>
            <HorizontalScroll>
              {num.map((cur, idx) => (
                <div key={idx}>
                  <Card width="194px" height="120px" margin="10px 7px 8px 7px">
                    <Icon
                      type="like"
                      width="18px"
                      height="18px"
                      margin="0 0 -103px 163px"
                    />
                  </Card>
                  <Text
                    margin="8px 0 0 7px"
                    bold='600'
                    size="1.4rem"
                  >
                    어디어디 산의 어디 코스
                  </Text>

                  <Grid
                    height="20px"
                    isFlex
                    width="194px"
                    margin="8px 7px 0 7px"
                  >
                    <Text bold="300" size="1.2rem">매우 좋음 5.0</Text>
                    <Text bold="400" size="1.2px">100.800km</Text>
                  </Grid>
                </div>
              ))}
            </HorizontalScroll>
          </Grid>

          <Grid height="220px">
            <Grid margin="0 0 24px 0" height="25px" isFlex>
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
              >
                <span>더보기</span>
                <Icon type="arrow" width="5px" height="8px" />
              </Grid>
            </Grid>
            <HorizontalScroll>
              {num.map((cur, idx) => (
                <div key={idx} style={{ margin: "10px 0 10px 0" }}>
                  <Card
                    width="150px"
                    height="150px"
                    margin="0 7px 0 7px"
                  ></Card>
                </div>
              ))}
            </HorizontalScroll>
          </Grid>
        </Grid>
      </Grid>
      {/* </Desktop> */}
    </>
  );
};

export default Main;
