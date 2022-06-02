import axios from "axios";

const instance = axios.create({
  // baseURL: "http://15.164.102.106:8080", // 로컬 
  baseURL: "http://3.34.122.99:8080", // 의현님 
  // baseURL: "https://jinnn.shop", // 배포용 
  // baseURL: "https://산길.com",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

const sock = axios.create({
  baseURL: "https://jinnn.shop",
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
    instance.get(`/main/nearby/1?lat=${lat}&lng=${lng}`),
  mainFeed: () => instance.get(`/main/feeds`),
  mountains: () => instance.get(`/main/mountains`),
  mainParty: () => instance.get(`/main/parties`),
  mainBookmark: (mountainId) =>
    instance.post(`/mountain/bookmark/${mountainId}`),

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
    instance.get("/user/loginCheck"), // api 수정된것
    // instance.get("api/user/loginCheck"),
  nameCheck: (nickname) =>
    instance.post("/mypage/nameCheck", {
      nickname: nickname,
    }),
  changeName: (nickname) =>
    instance.put("/mypage/profilename", {
      nickname: nickname,
    }),
  changeImg: (formData) =>
    instance.put("/mypage/profileUrl", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  myTracking: () => instance.get("/mypage/tracking"),
  myTitle: () => instance.get("/mypage/userTitle"),
  myFeed: () => instance.get("/mypage/myfeeds"),
  myFeedList: (pageNum) => instance.get(`/myfeeds/${pageNum}`),

  myMount: (mountainId) => instance.get(`/mypage/tracking/${mountainId}`),
  myBookmark: (pageNum, lat, lng) =>
    instance.get(`/mypage/bookmark/${pageNum}?lat=${lat}&lng=${lng}`),
  changeTitle: (userTitle) =>
    instance.put("/mypage/userTitle", {
      userTitle: userTitle,
    }),


  //feed.js
  getFeedDB: (pageNum) => instance.get(`/feeds/${pageNum}`),
  deleteFeed: (feedId) => instance.delete(`/feeds/delete/${feedId}`),
  feedLike: (feedId) => instance.post(`/feeds/good/${feedId}`),

  //feedDetail.js
  getFeedDetail: (feedId, pageNum) =>
    instance.get(`/feeds/detail/${feedId}/${pageNum}`),
  deleteDetail: (feedId) =>
    instance.delete(`/feeds/delete/${feedId}`, { feedId }),
  addFeedCmt: (feedId, feedComment) =>
    instance.post(`/feeds/comment/${feedId}`, { feedComment }),
  updateFeedCmt: (feedCommentId, feedComment) =>
    instance.put(`/feeds/comment/${feedCommentId}`, { feedComment }),
  deleteFeedCmt: (feedCommentId) =>
    instance.delete(`/feeds/comment/${feedCommentId}`),
  detailLike: (feedId) =>
    instance.post(`/api/feeds/good/${feedId}`, { feedId }),

  //tracker.js
  start: (mountainId, setCompletedId) =>
    instance.post(`/tracking/${mountainId}`, { send: 1 }),
  searchName: (keyword, pageNum) =>
    instance.get(`/mountain/search?keyword=${keyword}&pageNum=${pageNum}`),
  setPath: (completedId, loca) =>
    instance.post(`/tracking/mountain/${completedId}`, {
      lat: loca.lat,
      lng: loca.lng,
    }),
  endClimb: (completedId, data) =>
    instance.put(`/tracking/${completedId}`, {
      totalDistance: data.totalDistance,
      totalTime: data.totalTime,
    }),
  deleteDB: (completedId) => instance.delete(`/tracking/${completedId}`),
  getMytrack: (completedId) =>
    instance.get(`/tracking/detail/${completedId}`),

  // mountain.js
  searchMount: (keyword, pageNum) =>
    instance.get(`/mountain/search/${keyword}/${pageNum}`),
  getTopList: () => instance.get("/mountain/search/before"),
  getDetail: (mountainId, pageNum) =>
    instance.get(`/mountain/${mountainId}`),
  addComment: (mountainId, commentData) =>
    instance.post(`/mountain/comment/${mountainId}`, commentData),
  deleteComment: (mountainCommentId) =>
    instance.delete(`/mountain/comment/${mountainCommentId}`),
  updateComment: (commentData) =>
    instance.put(`/mountain/comment/${commentData.mountainCommentId}`, {
      mountainComment: commentData.mountainComment,
    }),
  like: (mountainId) =>
    instance.post(`/mountain/bookmark/${mountainId}`),

  // party.js
  searchParty: (keyword, pageNum) =>
    instance.get(`/parties/search?keyword=${keyword}&pageNum=${pageNum}`),
  getMyParty: () => instance.get("/plan"),
  // getPartyList: (pageNum) => instance.get(`/parties/${pageNum}`), // api 수정
  getPartyList: (pageNum) => instance.get(`api/parties/${pageNum}`),
  // getOneParty: (partyId) => instance.get(`/party/${partyId}`), // ali 수정
  getOneParty: (partyId) => instance.get(`api/party/${partyId}`), 
  addParty: (party) =>
    instance.post("/party/write", {
      title: party.title,
      mountain: party.mountain,
      mountainAddress: party.MountainAddress,
      partyDate: party.partyDate,
      partyTime: party.partyTime,
      maxPeople: party.maxPeople,
      partyContent: party.partyContent,
    }),
  editParty: (partyId, party) =>
    instance.put(`/party/${partyId}`, {
      partyDate: party.partyDate,
      partyTime: party.partyTime,
      maxPeople: party.maxPeople,
      partyContent: party.partyContent,
    }),
  attendParty: (partyId) => instance.post(`/party/attend/${partyId}`),
  delParty: (partyId) => instance.delete(`/party/${partyId}`),

  // chat.js
  addChatRoom: (title, partyId) =>
    instance.post(`/chat/rooms?name=${title}&partyId=${partyId}`), // api 주소 연결 필요
  enterChatRoom: (chatRoomId) => instance.get(`/chat/rooms/${chatRoomId}`),
  // getChatList: (chatRoomId) => instance.get(`/chat/rooms/${chatRoomId}`), // api 주소 연결 필요, 소켓통신에서 바로 채팅 전체리스트 받으면 필요없는 api
};
