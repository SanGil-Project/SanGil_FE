import axios from "axios";

const token = sessionStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://3.35.49.228",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: token,
  },
});

export const api = {
  // user.js - social login
  kakaoLogin: (code) => instance.get(`/user/kakao/callback?code=${code}`),
  naverLogin: (code, state) =>
    instance.get(`/user/naver/callback?code=${code}&state=${state}`),
  googleLogin: (code) => instance.get(`/user/google/callback?code=${code}`),

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
      nickname: username,
    }),
  changeName: (username) =>
    instance.put("/api/mypages/profilename", {
      nickname: username,
    }),
  changeImg: (formData) =>
    instance.put("/api/mypages/profileUrl", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  myTracking: () => instance.get("/api/mypages/tracking"),
  myTitle: () => instance.get("/api/mypages/userTitle"),
  myBookmark: (lat, lng) =>
    instance.get(`/api/mypages/bookmark?lat=${lat}&lng=${lng}`),
  changeTitle: (userTitle) =>
    instance.put("/api/mypages/userTitle", {
      userTitle: userTitle,
    }),

  // mountain.js
  searchMount: (keyword, pageNum) =>
    instance.get(`/api/mountain/search/${keyword}/${pageNum}`),
  getTopList: () => instance.get("/api/mountain/search/before"),
  getDetail: (mountainId, pageNum) =>
    instance.get(`/api/mountain/${mountainId}/${pageNum}`),

  // party.js
  getMyParty: () => instance.get("/api/plan"),
  getPartyList: (pageNum) => instance.get(`/api/parties/${pageNum}`),
  getOneParty: (partyId) => instance.get(`/api/party/${partyId}`),
  addParty: (party) =>
    instance.post("/api/party/write", {
      title: party.title,
      mountain: party.mountain,
      address: party.address,
      partyDate: party.partyDate,
      partyTime: party.partyTime,
      maxPeople: party.maxPeople,
      partyContent: party.partyContent,
    }),
  editParty: (partyId, party) =>
    instance.put(`/api/party/${partyId}`, {
      partyId: partyId,
      partyDate: party.partyDate,
      partyTime: party.partyTime,
      maxPeople: party.maxPeople,
      partyContent: party.partyContent,
    }),
  attendParty: (partyId) => instance.post(`/api/party/attend/${partyId}`),
  delParty: (partyId) => instance.delete(`/api/party/${partyId}`),
};
