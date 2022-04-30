import axios from "axios";

// const token = sessionStorage.getItem("token");

const instance = axios.create({
  // baseURL: "http://3.35.52.88",
  baseURL: "http://15.164.96.141",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

// instance.interceptors.request.use(function (config) {
//   const accessToken = sessionStorage.getItem("token");
//   config.headers.common["Authorization"] = `${accessToken}`; // header에 토큰값을 넣는다 => header에 토큰값이 있어 앞으로 request를 자유자재로 할 수 있다.
//   return config;
// });

export const api = {
  // user.js
  signUp: (userInfo) =>
    instance.post("/user/signup", userInfo, {
      headers: {
        "content-type": "applicaton/json;charset=UTF-8",
        accept: "application/json",
      },
    }),
  isLogin: (token) =>
    instance.get("/api/user/loginCheck", {
      headers: {
        "content-type": "applicaton/json;charset=UTF-8",
        accept: "application/json",
        Authorization: token,
      },
    }),
  // - social login
  kakaoLogin: (code) => instance.get(`/user/kakao/callback?code=${code}`),
  naverLogin: (code, state) =>
    instance.get(`/user/naver/callback?code=${code}&state=${state}`),
  googleLogin: (code) => instance.get(`/user/google/callback?code=${code}`),
};
