import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { api } from "../../shared/api";

const SIGNUP = "SIGNUP";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ISLOGIN = "ISLOGIN";
const MY_TRACK = "MY_TRACK"
const MY_TITLE = "MY_TITLE"

const logIn = createAction(LOGIN, (userInfo) => ({ userInfo }));
const logOut = createAction(LOGOUT, (userInfo) => ({ userInfo }));
const isLogin = createAction(ISLOGIN, (token) => ({ token }));
const myTracking = createAction(MY_TRACK, (trackList) => ({ trackList }));
const myTitle = createAction(MY_TITLE, (titleList) => ({ titleList }));

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

const myTrackingDB = (token) => {
  return function (dispatch, getState) {

    const completedList = [
      {
        completedId: 1,
        mountainId: "관악산",
        totalDistance: "2.5km",
        totalTime: "2시간 20분 20초",
        lat: 37.44446410184117,
        lng: 126.96388893953335,
      },
      {
        completedId: 2,
        mountainId: "대둔산",
        totalDistance: "1.5km",
        totalTime: "1시간 45분 45초",
        lat: 36.1245832757118,
        lng: 127.32048346523955,
      },
      {
        completedId: 3,
        mountainId: "도봉산",
        totalDistance: "4.5km",
        totalTime: "4시간 13분 45초",
        lat: 37.69877448301772,
        lng: 127.01551754244439,
      },
      {
        completedId: 4,
        mountainId: "무등산",
        totalDistance: "4km",
        totalTime: "3시간 13분 45초",
        lat: 35.12435880520678,
        lng: 127.0091717110001,
      },
      {
        completedId: 5,
        mountainId: "북한산",
        totalDistance: "3.4km",
        totalTime: "3시간 05분 20초",
        lat: 37.65865511792133,
        lng: 126.97798851202528,
      },
      {
        completedId: 6,
        mountainId: "한라산",
        totalDistance: "15km",
        totalTime: "10시간 13분 45초",
        lat: 33.36123811263156,
        lng: 126.52944767809313,
      },
    ];

    dispatch(myTracking(completedList));
    return;

    api
      .myTracking(token)
      .then((res) => {
        console.log("(myTracking) 성공 후 데이터 ::", res);
        dispatch(myTracking(res.data));
      })
      .catch((err) => {
        console.log("(myTracking) 실패 ::", err);
      });
  };
};


const myTitleDB = (token) => {
  return function (dispatch, getState) {
    const userTitleList = [
      { userTitle: "등린이", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: true}, 
      { userTitle: "홍길동", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "방구석 홍길", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: true},
      { userTitle: "리틀홍길", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: true},
      { userTitle: "내장래희망 홍길형님", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false}, 
      { userTitle: "UM.....홍길?", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "아직 여기라고?", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: true},
      { userTitle: "백만불짜리다리", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "산타고 전국일주", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "내가탄 산 높이 히말라야", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false}, 
      { userTitle: "구름위를걷는자", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "대기권 돌파~", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "아싸중에인싸", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: true}, 
      { userTitle: "인싸....?", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "인싸중에인싸", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "산길인맥왕", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
      { userTitle: "이구역의연예인", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false}, 
      { userTitle: "예비 찰칵러", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: true},
      { userTitle: "셰르파", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: true},
      { userTitle: "내가~~!! 등!!신!!!", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false},
    ];

    dispatch(myTitle(userTitleList));
    return;

    api
      .myTitle(token)
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
  },
  initialState
);

export const actionCreators = {
  kakaoLoginDB,
  naverLoginDB,
  googleLoginDB,
  myTracking,
  myTitle,
  myTrackingDB,
  myTitleDB,
};
