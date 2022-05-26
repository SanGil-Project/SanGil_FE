import React from "react";
import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from "../shared/SocialOAuth";
import { Grid, Text, Image } from "../elements/element";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Desktop, Mobile } from "../shared/responsive";

const Login = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid bg="#fff" width="414px" height="100%" margin="0 auto">
        <Grid
          fontSize="3.4rem"
          fontWeight="600"
          margin="170px 0 0 20px"
          height="160px"
        >
          <Image
            width="34px"
            height="34px"
            src={require("../assets/images/Mountain.png")}
          />
          <br />
          산길과 함께
          <br />
          등산의 신이 되어봐요!
        </Grid>
        <Grid width="372px" height="184px" margin="110px auto 0 auto">
          <A href={KAKAO_AUTH_URL}>
            <Grid
              height="56px"
              margin="0 0 8px 0"
              radius="4px"
              bg="#FFDC00"
              hover
            >
              <Grid margin="0 0 0 18px" width="250px" isFlex>
                <Kakao
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="24" height="22" fill="url(#pattern0)" />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        href="#image0_883_6578"
                        transform="translate(0 -0.000927644) scale(0.0204082 0.0222635)"
                      />
                    </pattern>
                    <image
                      id="image0_883_6578"
                      width="49"
                      height="45"
                      href="data:image/png;base64,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"
                    />
                  </defs>
                </Kakao>
                <Text bold="600" size="1.6rem" color="#47292B">
                  카카오 아이디로 로그인
                </Text>
              </Grid>
            </Grid>
          </A>
          <A href={NAVER_AUTH_URL}>
            <Grid
              height="56px"
              margin="0 0 8px 0"
              radius="4px"
              bg="#1EC800"
              hover
            >
              <Grid margin="0 0 0 18px" width="250px" isFlex>
                <Image
                  width="27px"
                  height="24px"
                  src={require("../assets/images/naverLogo.png")}
                />
                <Text bold="600" size="1.6rem" color="#fff">
                  네이버 아이디로 로그인
                </Text>
              </Grid>
            </Grid>
          </A>
          <A href={GOOGLE_AUTH_URL}>
            <Grid height="56px" margin="0" radius="4px" bg="black">
              <Grid margin="0 0 0 13px" width="250px" isFlex hover>
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
                <Text bold="600" size="1.6rem" color="#fff">
                  구글 아이디로 로그인
                </Text>
              </Grid>
            </Grid>
          </A>
        </Grid>
      </Grid>
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

const Kakao = styled.svg`
  width: 24px;
  height: 22px;
`;

<svg
  width="27"
  height="24"
  viewBox="0 0 27 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xlink="http://www.w3.org/1999/xlink"
></svg>;

export default Login;
