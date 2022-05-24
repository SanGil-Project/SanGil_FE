import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";
import axios from "axios";

const LOGIN = "LOGIN";
const LOG_OUT = "LOG_OUT";
const ISLOGIN = "ISLOGIN";
const MY_TRACK = "MY_TRACK";
const MY_MOUNTAIN = "MY_MOUNTAIN";
const MY_TITLE = "MY_TITLE";
const MY_FEED = "MY_FEED";
const MY_BOOKMARK = "MY_BOOKMARK";
const NAMECHECK = "NAMECHECK";
const CHANGE_INFO = "CHANGE_INFO";

const logIn = createAction(LOGIN, (userInfo) => ({ userInfo }));
const logOut = createAction(LOG_OUT, () => ({}));
const isLogin = createAction(ISLOGIN, (token) => ({ token }));
const myTracking = createAction(MY_TRACK, (trackList) => ({ trackList }));
const myMountain = createAction(MY_MOUNTAIN, (mountainList) => ({ mountainList }));
const myFeed = createAction(MY_FEED, (feedList) => ({ feedList }));
const myTitle = createAction(MY_TITLE, (titleList) => ({ titleList }));
const myBookmark = createAction(MY_BOOKMARK, (mountList) => ({ mountList }));
const nameCheck = createAction(NAMECHECK, (check) => ({ check }));
const changeInfo = createAction(CHANGE_INFO, (userInfo) => ({ userInfo }));

const initialState = {};

// 카카오 로그인
const kakaoLoginDB = (code) => {
  return function (dispatch, getState) {
    console.log("모듈에서 확인 ::", code);
    api
      .kakaoLogin(code)
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        dispatch(isLogInDB(ACCESS_TOKEN));
      })
      .catch((err) => {
        console.log("카카오로그인 에러", err);
        console.log("카카오로그인 에러", err.response);
        alert("api는 가는 거겠죠?");
        // window.alert("로그인에 실패하였습니다.");
      });
  };
};

// 네이버 로그인
const naverLoginDB = (code, state) => {
  return function (dispatch, getState) {
    api
      .naverLogin(code, state)
      .then((res) => {
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        dispatch(isLogInDB(ACCESS_TOKEN));
      })
      .catch((err) => {
        console.log("네이버로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
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
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        dispatch(isLogInDB(ACCESS_TOKEN));
      })
      .catch((err) => {
        console.log("구글로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
      });
  };
};

export const isLogInDB = (token) => {
  return function (dispatch, getState) {
    api
      .isLogin(token)
      .then((res) => {
        dispatch(isLogin(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const nameCheckDB = (nickname) => {
  return function (dispatch, getState) {
    console.log(nickname);

    api
      .nameCheck(nickname)
      .then((res) => {
        console.log("(nameCheck) 성공 후 데이터 ::", res);
        dispatch(nameCheck(res.data));
      })
      .catch((err) => {
        console.log("(nameCheck) 실패 ::", err);
      });
  };
};
const changeImgDB = (file, image) => {
  return function (dispatch, getState) {
    const userdata = getState().user.userInfo;
    const formData = new FormData();
    formData.append("file", file);

    api
      .changeImg(formData)
      .then((res) => {
        console.log("(changeImg) 성공 후 데이터 ::", res);
        const _user = {
          userId: userdata.userId,
          userImageUrl: image,
          nickname: userdata.nickname,
          userTitle: userdata.userTitle,
        };
        dispatch(changeInfo(_user));
      })
      .catch((err) => {
        console.log("(changeImg) 실패 ::", err);
      });
  };
};

const changeNameDB = (nickname) => {
  return async function (dispatch, getState) {
    const userdata = getState().user.userInfo;
    api
      .changeName(nickname)
      .then((res) => {
        console.log("(changeName) 성공 후 데이터 ::", res);
        const _user = {
          userId: userdata.userId,
          userImageUrl: userdata.userImageUrl,
          nickname: nickname,
          userTitle: userdata.userTitle,
        };
        dispatch(changeInfo(_user));
      })
      .catch((err) => {
        console.log("(changeName) 실패 ::", err);
      });
  };
};

const changeTitleDB = (userTitle) => {
  return async function (dispatch, getState) {
    const userdata = getState().user.userInfo;

    api
      .changeTitle(userTitle)
      .then((res) => {
        console.log("(changeTitle) 성공 후 데이터 ::", res);
        const _user = {
          userId: userdata.userId,
          userImageUrl: userdata.userImageUrl,
          nickname: userdata.nickname,
          userTitle: userTitle,
        };
        dispatch(changeInfo(_user));
      })
      .catch((err) => {
        console.log("(changeTitle) 실패 ::", err);
      });
  };
};

const myTrackingDB = () => {
  return async function (dispatch, getState) {


    // const fakeDB = {
    //   completedList : [
    //   {
    //     completedId : 1,
    //     mountainId : 1,
    //     mountain : "속리산",
    //     lat : 36.56329698,
    //     lng : 127.9172195,
    //     totalDistance: 10.3,
    //     totalTime: "4시간 20분 13초",
    //   },
    //   {
    //     completedId : 3,
    //     mountainId : 2,
    //     mountain : "화악산",
    //     lat : 37.8881266,
    //     lng : 127.5492755,
    //     totalDistance: 20.3,
    //     totalTime: "6시간 20분 13초",
    //   },
    // ]}

    // dispatch(myTracking(fakeDB));
    // return;
    api
      .myTracking()
      .then((res) => {
        console.log("(myTracking) 성공 후 데이터 ::", res);
        dispatch(myTracking(res.data));
      })
      .catch((err) => {
        console.log("(myTracking) 실패 ::", err);
      });
  };
};

const myMountainDB = (mountainId) => {
  return function (dispatch, getState) {

    // const fakeDB = {
    //   completedList : [
    //   {
    //     completedId : 1,
    //     mountain : "속리산",
    //     totalDistance: 10.3,
    //     totalTime: "4시간 20분 13초",
    //     creatDate: "2022-05-22",
    //   },
    //   {
    //     completedId : 3,
    //     mountain : "화악산",
    //     totalDistance: 20.3,
    //     totalTime: "6시간 20분 13초",
    //     creatDate: "2022-05-22",
    //   },
    // ]}

    // dispatch(myMountain(fakeDB));
    // return;

    api
      .myMount(mountainId)
      .then((res) => {
        console.log("(myMount) 성공 후 데이터 ::", res);
        dispatch(myMountain(res.data));
      })
      .catch((err) => {
        console.log("(myMount) 실패 ::", err);
      });
  };
};

const myFeedDB = (pageNum = null) => {
  return async function (dispatch, getState) {

    if (pageNum) {
      api
        .myFeedList(pageNum)
        .then((res) => {
          console.log("(myFeedList) 성공 후 데이터 ::", res);
          dispatch(myFeed(res.data));
        })
        .catch((err) => {
          console.log("(myFeedList) 실패 ::", err);
        });
      return;
    }
    api
      .myFeed()
      .then((res) => {
        console.log("(myFeed) 성공 후 데이터 ::", res);
        dispatch(myFeed(res.data));
      })
      .catch((err) => {
        console.log("(myFeed) 실패 ::", err);
      });
  };
};

const myBookmarkDB = (pageNum, lat, lng) => {
  return function (dispatch, getState) {


    console.log(pageNum, lat, lng);

    api
      .myBookmark(pageNum, lat, lng)
      .then((res) => {
        console.log("(myBookmark) 성공 후 데이터 ::", res);
        dispatch(myBookmark(res.data));
      })
      .catch((err) => {
        console.log("(myBookmark) 실패 ::", err);
      });
  };
};

const myTitleDB = () => {
  return function (dispatch, getState) {
    api
      .myTitle()
      .then((res) => {
        console.log("(myTitle) 성공 후 데이터 ::", res);
        dispatch(myTitle(res.data));
      })
      .catch((err) => {
        console.log("(myTitle) 실패 ::", err);
      });
  };
};

const logOutDB = () => {
  return function (dispatch, getState) {
    sessionStorage.clear();
    dispatch(logOut());
  };
};

export default handleActions(
  {
    [ISLOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.token;
      }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      draft.userInfo = null;
    }),
    [MY_TRACK]: (state, action) =>
      produce(state, (draft) => {
        draft.trackList = action.payload.trackList;
      }),
    [MY_TITLE]: (state, action) =>
      produce(state, (draft) => {
        draft.titleList = action.payload.titleList;
      }),
    [MY_FEED]: (state, action) => produce(state, (draft) => {
      if (action.payload.feedList.currentPage) {
        if (action.payload.feedList.currentPage === 0) {
          draft.feedList = action.payload.feedList;
        } else {
          draft.feedList.feedList.push(...action.payload.feedList.feedList);
          draft.feedList.currentPage = action.payload.feedList.currentPage;
        }
      } else {
        draft.feedList = action.payload.feedList;
      }

    }),
    [MY_BOOKMARK]: (state, action) => produce(state, (draft) => {
      if (action.payload.mountList.currentPage === 0) {
        draft.bookmarkList = action.payload.mountList;
      } else {
        draft.bookmarkList.bookMarkResponseDtos.push(...action.payload.mountList.bookMarkResponseDtos);
        draft.bookmarkList.currentPage = action.payload.mountList.currentPage;
      }
    }),
    [MY_MOUNTAIN]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload)
        draft.myMountain = action.payload.mountainList;
      }),
    [CHANGE_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),
    [NAMECHECK]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.nameCheck = action.payload.check;
      }),
  },
  initialState
);

export const actionCreators = {
  kakaoLoginDB,
  naverLoginDB,
  googleLoginDB,
  myTracking,
  myTitle,
  myBookmark,
  nameCheck,
  changeInfo,
  myTrackingDB,
  myTitleDB,
  nameCheckDB,
  changeNameDB,
  changeTitleDB,
  myBookmarkDB,
  changeImgDB,
  myFeedDB,
  myMountainDB,
  logOutDB,
};
