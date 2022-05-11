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
      <Mobile>
        <Grid>
          <Grid width="100vw" margin="0 auto">
            <Text
              width="35px"
              height="50px"
              lineHeight="40px"
              size="50px"
              margin="20px 0 0 20px"
              hover
              _onClick={() => navigate(-1)}
            >{`<`}</Text>
            <Grid overflowY="scroll" height="1080px">
              <Grid fontSize="4rem" margin="170px 0 0 20px" height="160px">
                🌲
                <br />
                산길과 함께
                <br />
                등산을 시작해봐요!
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
                      <Image
                        width="27px"
                        height="24px"
                        src="https://s3-alpha-sig.figma.com/img/af8b/71ff/93ad2d7ccb1467fc21a56aea2940fa03?Expires=1652659200&Signature=NZliYgtgjrXMueZtJrN8icuTNVYNya~NK1vH-SrX7FEsxPFs3tRbHxwCpdGuGU3pWJ7F8tpgRv0b3OvTjtNhQOiRvRQtgTePqxBpv3y7bnXYRHul8I0auraBUt0dakjivbybEu9TwNYfqLBANRsyDo2gu~0LDxF4TbUPVLu1CJPPgy2yryuHmVLehTqlJQmOmndzoMdnr2Ng0PtL~92aphUMytWQIlBC4fHtZM2jriDbqWHZAxold2fqCAMlbYLb5l-GhtQYbc5XsON618NwOBc0O~ukPoT5lwStwzIdbqUurLwlXrLy35W5lbd27QtUPojcEkKvgRqquykmWr990A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                      />
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
                        src="https://s3-alpha-sig.figma.com/img/22d0/1e32/7a27d8087aac9ee412fb6e4f6f879dd7?Expires=1652659200&Signature=UFHFcO8C4OR-YSkwj3IB6QpEiuzy6QnzSIVSaHLt6ah57tJ2kfcjtHIKbJwaHfNBSs~aXIQRrSu1-Wj6WUfcQs~jKAeepK-DHiItxSci8u4cXJzhjiffGZnsQRd1md0CmLExmCb7yx9OYL8UkjNwipKI4lHZ0nal4DTdsZLswGanN7TivhlhNxHT86iuwaJuiozCbfURheglqGze7TO3d5frNM-HvFAWXt0UtyaxZHJTvRJmBcD~22Dfl7x40wjQ2nU6hbfQ71~6O8mj2VLPkNn5tuYlb1IuCLRAY5fv0xpeRfsXHSnZ-4RpiDLi6gsHR7aYhOtHc6UMb2N5Mi3dSw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                      />
                      <Text bold="600" size="1.6rem" color="#fff">
                        네이버 아이디로 로그인
                      </Text>
                    </Grid>
                  </Grid>
                </A>
                <A href={GOOGLE_AUTH_URL}>
                  <Grid height="56px" margin="0" radius="4px" bg="black">
                    <Grid margin="0 0 0 15px" width="250px" isFlex hover>
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
          </Grid>
        </Grid>
      </Mobile>
      <Desktop>
        <Grid>
          <Grid border="1px solid black" width="414px" margin="0 auto">
            <Text
              width="35px"
              height="50px"
              lineHeight="40px"
              size="50px"
              margin="20px 0 0 20px"
              hover
              _onClick={() => navigate(-1)}
            >{`<`}</Text>
            <Grid overflowY="scroll" height="1080px">
              <Grid fontSize="4rem" margin="170px 0 0 20px" height="160px">
                🌲
                <br />
                산길과 함께
                <br />
                등산을 시작해봐요!
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
                      <Image
                        width="27px"
                        height="24px"
                        src="https://s3-alpha-sig.figma.com/img/af8b/71ff/93ad2d7ccb1467fc21a56aea2940fa03?Expires=1652659200&Signature=NZliYgtgjrXMueZtJrN8icuTNVYNya~NK1vH-SrX7FEsxPFs3tRbHxwCpdGuGU3pWJ7F8tpgRv0b3OvTjtNhQOiRvRQtgTePqxBpv3y7bnXYRHul8I0auraBUt0dakjivbybEu9TwNYfqLBANRsyDo2gu~0LDxF4TbUPVLu1CJPPgy2yryuHmVLehTqlJQmOmndzoMdnr2Ng0PtL~92aphUMytWQIlBC4fHtZM2jriDbqWHZAxold2fqCAMlbYLb5l-GhtQYbc5XsON618NwOBc0O~ukPoT5lwStwzIdbqUurLwlXrLy35W5lbd27QtUPojcEkKvgRqquykmWr990A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                      />
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
                        src="https://s3-alpha-sig.figma.com/img/22d0/1e32/7a27d8087aac9ee412fb6e4f6f879dd7?Expires=1652659200&Signature=UFHFcO8C4OR-YSkwj3IB6QpEiuzy6QnzSIVSaHLt6ah57tJ2kfcjtHIKbJwaHfNBSs~aXIQRrSu1-Wj6WUfcQs~jKAeepK-DHiItxSci8u4cXJzhjiffGZnsQRd1md0CmLExmCb7yx9OYL8UkjNwipKI4lHZ0nal4DTdsZLswGanN7TivhlhNxHT86iuwaJuiozCbfURheglqGze7TO3d5frNM-HvFAWXt0UtyaxZHJTvRJmBcD~22Dfl7x40wjQ2nU6hbfQ71~6O8mj2VLPkNn5tuYlb1IuCLRAY5fv0xpeRfsXHSnZ-4RpiDLi6gsHR7aYhOtHc6UMb2N5Mi3dSw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                      />
                      <Text bold="600" size="1.6rem" color="#fff">
                        네이버 아이디로 로그인
                      </Text>
                    </Grid>
                  </Grid>
                </A>
                <A href={GOOGLE_AUTH_URL}>
                  <Grid height="56px" margin="0" radius="4px" bg="black">
                    <Grid margin="0 0 0 15px" width="250px" isFlex hover>
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
          </Grid>
        </Grid>
      </Desktop>
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

<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"></svg>;

export default Login;
