import axios from "axios";

const token = sessionStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://3.35.49.228",
  // baseURL: "https://3.36.113.119",
  // baseURL: "https://burgerrr.shop/",
  // baseURL: "https://ehjeong.shop/",
  // baseURL: "https://산길.com",
  headers: {
    Authorization: token,
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
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
  myFeed: (pageNum) => instance.get(`/api/myfeeds/${pageNum}`),
  myMount: (mountainId) => instance.get(`/api/mypages/tracking/${mountainId}`),
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
  addComment: (mountainId, commentData) =>
    instance.post(`/api/mountain/comment/${mountainId}`, commentData),
  deleteComment: (mountainCommentId) =>
    instance.delete(`/api/mountain/comment/${mountainCommentId}`),

  // trancker.js
  getMytrack: (completedid) => instance.get(`/api/tracking/detail/${completedid}`),
  
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
