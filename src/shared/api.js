import axios from "axios";

const instance = axios.create({
  // URL: "https://ehjeong.shop",
  baseURL: "http://13.125.232.76:8080", // 로컬 - 상준님
  // baseURL: "http://15.164.102.106:8080", // 로컬 - 재진님
  // baseURL: "https://burgerrr.shop", // yesleee.shop - 상준님
  // baseURL: "https://jinnn.shop", // yesleee.shop - 재진님
  // baseURL: "https://13.125.166.173", // yesleee.shop - 재진님
  // baseURL: "https://산길.com",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

const sock = axios.create({
  baseURL: "http://13.124.204.197",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = sessionStorage.getItem("token");
  }
  return config;
});

sock.interceptors.request.use(function (config) {
  config.headers.Authorization = sessionStorage.getItem("token");
  return config;
});

export const api = {
  //main.js
  around: (lat, lng) =>
    instance.get(`/api/main/nearby/1?lat=${lat}&lng=${lng}`),
  mainFeed: () => instance.get(`/api/main/feeds/1`),
  mountains: () => instance.get(`/api/main/mountains`),
  mainParty: () => instance.get(`/api/main/parties`),
  mainBookmark: (mountainId, type) =>
    instance.post(`/api/mountain/bookmark/${mountainId}`, { mountainId }),

  //tracker.js
  start: (mountainId, setCompletedId) =>
    instance.post(`/api/tracking/${mountainId}`, { send: 1 }),
  searchName: (keyword, pageNum) =>
    instance.get(`/api/mountain/search?keyword=${keyword}&pageNum=${pageNum}`),
  setPath: (completedId, loca) =>
    instance.post(`/api/tracking/mountain/${completedId}`, {
      lat: loca.lat,
      lng: loca.lng,
    }),
  endClimb: (completedId, data) => (
    `/api/tracking/${completedId}`,
    {
      totalDistance: data.totalDistance,
      totalTime: data.totalTime,
    }
  ),
  deleteDB: (completedId) => instance.get(`/api/tracking/${completedId}`),
  getMytrack: (completedid) =>
    instance.get(`/api/tracking/detail/${completedid}`),

  //feed.js
  getFeedDB: (pageNum) => instance.get(`/api/main/feeds/${pageNum}`),

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
  updateComment: (commentData) =>
    instance.put(`/api/mountain/comment/${commentData.mountainCommentId}`, {
      mountainComment: commentData.mountainComment,
    }),
  like: (mountainId) =>
    instance.post(`/api/mountain/bookmark/${mountainId}`, { mountainId }),

  // trancker.js

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

  // chat.js
  addChatRoom: (title, partyId) =>
    instance.post(`/chat/rooms?name=${title}&partyId=${partyId}`), // api 주소 연결 필요
  enterChatRoom: (chatRoomId) => instance.get(`/chat/rooms/${chatRoomId}`),
  getChatList: (chatRoomId) => instance.get(`/chat/rooms/${chatRoomId}`), // api 주소 연결 필요, 소켓통신에서 바로 채팅 전체리스트 받으면 필요없는 api
};
