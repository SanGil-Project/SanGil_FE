import axios from "axios";

const token = sessionStorage.getItem("token");

const instance = axios.create({
  // baseURL: "http://3.35.52.88",
  baseURL: "http://3.35.49.228",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: token,
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
  nameCheck: (username) => 
    instance.post("/api/mypages/usernameCheck", {
      username : username,
    }),
  changeName: (username) =>
    instance.put("/api/mypages/profilename", {
      username : username,
    }),
  changeTitle: (userTitle) =>
    instance.put("/api/mypages/userTitle", {
      userTitle : userTitle,
    }),
  // - social login
  kakaoLogin: (code) => instance.get(`/user/kakao/callback?code=${code}`),
  naverLogin: (code, state) =>
    instance.get(`/user/naver/callback?code=${code}&state=${state}`),
  googleLogin: (code) => instance.get(`/user/google/callback?code=${code}`),


  myTracking: () => instance.get("/api/mypages/tracking"),
  myTitle: () => instance.get("/api/mypages/userTitle"),
  changeTitle: () => instance.put("/api/mypages/userTitle", {
  }),

  // 
  searchMount: (keyword, pageNum) => instance.get(`/api/mountain/search/${keyword}/${pageNum}`),


  // party.js
  getPartyList: (pageNum) => instance.get(`/api/parties/${pageNum}`),
  getOneParty: (partyId) => instance.get(`/api/party/${partyId}`),
  addParty: (party) => instance.post("/api/party/write", {
    title : party.title,
    mountain : party.mountain,
    address : party.address,
    partyDate : party.partyDate,
    partyTime: party.partyTime,
    maxPeople : party.maxPeople,
    partyContent : party.content,
  }),
  editParty: (partyId, party) => instance.put(`/api/party/${partyId}`, {
    partyId : partyId,
    partyDate : party.partyDate,
    partyTime: party.partyTime,
    maxPeople : party.maxPeople,
    partyContent : party.content,
  }),
  attendParty: (token, partyId) => instance.post(`/api/party/attend/${partyId}`, {
    headers: { Authorization: token, }}),
  delParty: (partyId) => instance.delete(`/api/party/join/${partyId}`),
};
