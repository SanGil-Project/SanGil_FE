import React from "react";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL, NAVER_AUTH_URL } from "../shared/SocialOAuth";


import Grid from "./../elements/Grid";
import Input from "../elements/Input";
import Button from "./../elements/Button";
import Image from "./../elements/Image";

const Login = (props) => {
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("아이디와 비밀번호를 모두 입력해주세요!");
      return;
    }

    // if (!idCheck(id)) {
    //   window.alert('아이디 형식이 맞지 않습니다!');
    //   return;
    // }
    alert(id, pwd);
    console.log("로그인!");
    // dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <Grid>
      {/* <Desktop> */}
      <Grid bg="orange" height="100%" isFlex padding="0 50px">
        <Grid isFlex margin="0 25px 0 0" height="100%">
          <Image
            src="https://user-images.githubusercontent.com/91959791/165069079-375ac8d6-db36-40a0-b81a-a6ee1e6bdff6.jpeg"
            width="100%"
          />
        </Grid>
        <Grid
          bg="white"
          border="1px solid black"
          margin="0 auto"
          maxWidth="500px"
          height="100%"
        >
          <Grid padding="16px 0 0">
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요."
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Grid>
          <Grid padding="16px 0 25px">
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </Grid>
          <Button
            border="none"
            bgColor="#212121"
            color="#fff"
            _onClick={() => {
              console.log("로그인!");
              login();
            }}
          >
            log_in
          </Button>
          <Button
            border="none"
            bgColor="#212121"
            color="#fff"
            _onClick={() => {
              console.log("회원가입페이지로~!");
              // login();
            }}
          >
            move_to_sign_up
          </Button>
          <a href={KAKAO_AUTH_URL}>
            <span>카카오로그인</span>
          </a>
          <a href={GOOGLE_AUTH_URL}>
            <span>구글로그인</span>
          </a>
          <a href={NAVER_AUTH_URL}>
            <span>네이버로그인</span>
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
