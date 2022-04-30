import React from "react";
import Grid from "../elements/Grid";
import Icon from "../elements/Icon";
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
          <Grid
            height="453px"
            margin="0 auto 60px auto"
          >
            <p
              style={{
                width: "350px",
                height: "24px",
                margin: "30px 0 0 7px",
                fontWeight: "600",
                fontSize: "2rem",
                lineHeight: "24px",
              }}
            >
              지금 산길러 들이 오르고있는 산 TOP 5
            </p>
            <Card
              border="2px solid #B3B3B3"
              width="386px"
              height="120px"
              margin="34px auto 0 auto"
            >
              <Icon width="34px" height="29px" type="rank" />
              <p
                style={{
                  width: "9px",
                  height: "17px",
                  fontSize: "1.4rem",
                  fontWeight: "300",
                  margin: "-32px 14px",
                  color: "#fff",
                }}
              >
                1
              </p>
              <Icon type="like" width="18px" margin="0 0 -113px 355px" />
            </Card>
            <Grid height="30px">
              <div
                style={{
                  display: "flex",
                }}
              >
                <p
                  style={{
                    maxWidth: "130px",
                    margin: "10px 8px 0 7px",
                    fontWeight: "600",
                    fontSize: "1.4rem",
                  }}
                >
                  충청남도 서산시
                </p>
                <p
                  style={{
                    margin: "10px 0 0 0",
                    width: "240px",
                    fontWeight: "200",
                    fontSize: "1.4rem",
                  }}
                >
                  산이름졸라길다아아아아아아앙?
                </p>
              </div>
            </Grid>

            <HorizontalScroll>
              {num.map((cur, idx) => (
                <div key={idx}>
                  <Card width="194px" height="120px" margin="34px 7px 8px 7px">
                    <Icon width="34px" height="29px" type="rank" />
                    <p
                      style={{
                        width: "9px",
                        height: "17px",
                        fontSize: "1.4rem",
                        fontWeight: "300",
                        margin: "-32px 14px",
                        color: "#fff",
                      }}
                    >
                      {cur}
                    </p>
                    <Icon
                      type="like"
                      width="18px"
                      height="18px"
                      margin="0 0 -117px 163px"
                    />
                  </Card>
                  <p
                    style={{
                      maxWidth: "130px",
                      margin: "10px 8px 0 7px",
                      fontWeight: "600",
                      fontSize: "1.4rem",
                    }}
                  >
                    충청남도 서산시
                  </p>
                  <p
                    style={{
                      margin: "10px 0 0 7px",
                      fontWeight: "200",
                      fontSize: "1.4rem",
                    }}
                  >
                    산이름졸라길다아아아아아아앙
                  </p>
                </div>
              ))}
            </HorizontalScroll>
          </Grid>

          <Grid
            // border="1px solid green"
            margin="0 auto 60px auto"
            height="238px"
          >
            <p
              style={{
                width: "350px",
                height: "24px",
                margin: "0 7px 24px 7px",
                fontWeight: "600",
                fontSize: "2rem",
                lineHeight: "24px",
              }}
            >
              👀 주변 산길
            </p>
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
                  <p
                    style={{
                      margin: "8px 0 0 7px",
                      fontWeight: "600",
                      fontSize: "1.4rem",
                    }}
                  >
                    어디어디 산의 어디 코스
                  </p>

                  <Grid
                    height="20px"
                    isFlex
                    width="194px"
                    margin="8px 7px 0 7px"
                  >
                    <span style={{ fontWeight: "300" }}>매우 좋음 5.0</span>
                    <span style={{ fontWeight: "400" }}>100.800km</span>
                  </Grid>
                </div>
              ))}
            </HorizontalScroll>
          </Grid>

          <Grid height="220px">
            <Grid margin="0 0 24px 0" height="25px" isFlex>
              <p
                style={{
                  width: "350px",
                  height: "24px",
                  fontWeight: "600",
                  fontSize: "2rem",
                  lineHeight: "24px",
                }}
              >
                👀 실시간 정복한 산길 인증샷
              </p>
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
