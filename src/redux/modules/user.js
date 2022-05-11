import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ISLOGIN = "ISLOGIN";
const MY_TRACK = "MY_TRACK"
const MY_TITLE = "MY_TITLE"
const MY_BOOKMARK = "MY_BOOKMARK"
const NAMECHECK = "NAMECHECK"
const CHANGE_INFO = "CHANGE_INFO"

const logIn = createAction(LOGIN, (userInfo) => ({ userInfo }));
const logOut = createAction(LOGOUT, (userInfo) => ({ userInfo }));
const isLogin = createAction(ISLOGIN, (token) => ({ token }));
const myTracking = createAction(MY_TRACK, (trackList) => ({ trackList }));
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
        console.log(res); // 토큰이 넘어올 것임
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        dispatch(isLogInDB(ACCESS_TOKEN));
        // history.replace("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
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
        dispatch(isLogInDB(ACCESS_TOKEN));
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
        dispatch(isLogInDB(ACCESS_TOKEN));
        // history.replace("/") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log("구글로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        // history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
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

const nameCheckDB = (username) => {
  return function (dispatch, getState) {
    console.log(username);

    api
      .nameCheck(username)
      .then((res) => {
        console.log("(nameCheck) 성공 후 데이터 ::", res);
        dispatch(nameCheck(res.data));
      })
      .catch((err) => {
        console.log("(nameCheck) 실패 ::", err);
      });
  };
};

const changeNameDB = (nickname) => {
  return function (dispatch, getState) {

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
        }
        dispatch(changeInfo(_user));
      })
      .catch((err) => {
        console.log("(changeName) 실패 ::", err);
      });
  };
};

const changeTitleDB = (userTitle) => {
  return function (dispatch, getState) {

    const userdata = getState().user.userInfo;

    api
      .changeTitle(userTitle)
      .then((res) => {
        console.log("(changeTitle) 성공 후 데이터 ::", res);
        const _user = {
          userId: userdata.userId,
          userImageUrl: userdata.userImageUrl,
          username: userdata.username,
          userTitle: userTitle,
        }
        dispatch(changeInfo(_user));
      })
      .catch((err) => {
        console.log("(changeTitle) 실패 ::", err);
      });
  };
};

const myTrackingDB = () => {
  return function (dispatch, getState) {

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

const myBookmarkDB = (lat, lng) => {
  return function (dispatch, getState) {

    api
      .myBookmark(lat, lng)
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



export default handleActions(
  {
    [ISLOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.token;
      }),
    [LOGOUT]: (state, action) => produce(state, (draft) => {}),
    [MY_TRACK]: (state, action) => produce(state, (draft) => {
      draft.trackList = action.payload.trackList;
    }),
    [MY_TITLE]: (state, action) => produce(state, (draft) => {
      draft.titleList = action.payload.titleList;
    }),
    [MY_BOOKMARK]: (state, action) => produce(state, (draft) => {
      draft.mountList = action.payload.mountList;
    }),
    [CHANGE_INFO]: (state, action) => produce(state, (draft) => {
      draft.userInfo = action.payload.userInfo;
    }),
    [NAMECHECK]: (state, action) => produce(state, (draft) => {
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
};
