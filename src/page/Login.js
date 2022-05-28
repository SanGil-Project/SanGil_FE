import React from "react";
import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from "../shared/SocialOAuth";
import { Grid, Text, Image } from "../elements/element";
import styled from "styled-components";

const Login = (props) => {
  return (
    <>
      <Container>
        <Grid width="58px" height="38px" margin="0 auto 40px auto">
          <Image
            width="100%"
            height="100%"
            src={require("../assets/images/Login_Logo.png")}
          />
        </Grid>
        <Grid margin="0 auto" height="100px" width="89.85%">
          <Text margin="0" size="3.4rem" bold="400">
            산길과 함께
          </Text>
          <Text margin="0" size="3.4rem" bold="700">
            등산의 신이 되어봐요!
          </Text>
        </Grid>
        <Grid width="85.02%" height="178px" margin="50px auto 0 auto">
          <Image
            width="100%"
            height="100%"
            src={require("../assets/images/Login_back.png")}
            objectFit="contain"
          />
        </Grid>
        <Grid width="89.85%" height="184px" margin="50px auto 0 auto">
          <A href={KAKAO_AUTH_URL}>
            <Grid
              height="56px"
              margin="0 0 15px 0"
              radius="8px"
              bg="#FFDC00"
              hover
            >
              <Grid margin="0 auto" width="220px" flex="flex">
                <Image
                  width="27px"
                  height="24px"
                  src={require("../assets/images/KakaoLogo.png")}
                />
                <Text
                  margin="0 0 0 10px"
                  bold="600"
                  size="1.6rem"
                  color="#47292B"
                >
                  카카오 아이디로 로그인
                </Text>
              </Grid>
            </Grid>
          </A>
          <A href={NAVER_AUTH_URL}>
            <Grid
              height="56px"
              margin="0 0 15px 0"
              radius="8px"
              bg="#1EC800"
              hover
            >
              <Grid margin="0 auto" width="220px" flex="flex">
                <Image
                  width="27px"
                  height="24px"
                  src={require("../assets/images/naverLogo.png")}
                />
                <Text margin="0 0 0 10px" bold="600" size="1.6rem" color="#fff">
                  네이버 아이디로 로그인
                </Text>
              </Grid>
            </Grid>
          </A>
          <A href={GOOGLE_AUTH_URL}>
            <Grid height="56px" margin="0" radius="8px" bg="black">
              <Grid margin="0 auto" width="220px" flex="flex" hover>
                <Google viewBox="0 0 40 40" fill="none">
                  <path
                    d="M32.5 20.3001C32.5 19.4223 32.423 18.5889 32.291 17.7778H19.8638V22.7889H26.9792C26.6603 24.4334 25.7255 25.8223 24.3398 26.7667V30.1001H28.5849C31.0703 27.7778 32.5 24.3556 32.5 20.3001Z"
                    fill="#458AFF"
                  />
                  <path
                    d="M19.8634 33.3333C23.4266 33.3333 26.4069 32.1333 28.5845 30.1L24.3394 26.7667C23.1517 27.5667 21.645 28.0555 19.8634 28.0555C16.4211 28.0555 13.5068 25.7111 12.462 22.5444H8.08496V25.9778C10.2515 30.3333 14.7055 33.3333 19.8634 33.3333Z"
                    fill="#34A853"
                  />
                  <path
                    d="M12.4622 22.5444C12.1873 21.7444 12.0443 20.8889 12.0443 20C12.0443 19.1111 12.1983 18.2556 12.4622 17.4556V14.0222H8.08519C7.18339 15.8222 6.6665 17.8444 6.6665 20C6.6665 22.1556 7.18339 24.1778 8.08519 25.9778L12.4622 22.5444Z"
                    fill="#FCBC05"
                  />
                  <path
                    d="M19.8634 11.9445C21.8099 11.9445 23.5476 12.6223 24.9223 13.9445L28.6834 10.1445C26.4069 7.98897 23.4266 6.66675 19.8634 6.66675C14.7055 6.66675 10.2515 9.66675 8.08496 14.0223L12.462 17.4556C13.5068 14.289 16.4211 11.9445 19.8634 11.9445Z"
                    fill="#EA4335"
                  />
                </Google>
                <Text margin="0 0 0 10px" bold="600" size="1.6rem" color="#fff">
                  구글 아이디로 로그인
                </Text>
              </Grid>
            </Grid>
          </A>
        </Grid>
      </Container>
    </>
  );
};

const Google = styled.svg`
  width: 40px;
  height: 40px;
`;

const A = styled.a`
  text-decoration-line: none;
`;

const Container = styled.div`
  padding: 50px 0 0 0;
  border: 1px solid #fff;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  background: linear-gradient(#fff 0%, #fff9c6 100%);
`;

export default Login;
