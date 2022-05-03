import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { api } from "../../shared/api";

const SIGNUP = "SIGNUP";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ISLOGIN = "ISLOGIN";

const logIn = createAction(LOGIN, (userInfo) => ({ userInfo }));
const logOut = createAction(LOGOUT, (userInfo) => ({ userInfo }));
const isLogin = createAction(ISLOGIN, (token) => ({ token }));

const initialState = { userInfo: {} };

export const signUpDB = (userInfo) => {
  return function (dispatch, getState) {};
};

export const logInDB = () => {
  return function (dispatch, getState) {};
};

// 카카오 로그인
const kakaoLoginDB = (code) => {
  return function (dispatch, getState) {
    console.log("모듈에서 확인 ::", code);
    api
      .kakaoLogin(code)
      .then((res) => {
        console.log(res); // 토큰이 넘어올 것임
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        dispatch(isLogInDB(ACCESS_TOKEN));
        // history.replace("/") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log("카카오로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        // history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };
};

// 네이버 로그인
const naverLoginDB = (code, state) => {
  return function (dispatch, getState) {
    console.log("모듈에서 확인 ::", code, state);
    api
      .naverLogin(code, state)
      .then((res) => {
        console.log(res); // 토큰이 넘어올 것임
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        // history.replace("/") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log("네이버로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        // history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };
};

// 구글 로그인
const googleLoginDB = (code) => {
  return function (dispatch, getState) {
    console.log("모듈에서 확인 ::", code);
    api
      .googleLogin(code)
      .then((res) => {
        console.log(res); // 토큰이 넘어올 것임
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        // history.replace("/") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log("구글로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        // history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };
};

const isLogInDB = (token) => {
  return function (dispatch, getState) {
    api
      .isLogin(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [ISLOGIN]: (state, action) => produce(state, (draft) => {}),
    [LOGOUT]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export const actionCreators = {
  kakaoLoginDB,
  naverLoginDB,
  googleLoginDB,
};
