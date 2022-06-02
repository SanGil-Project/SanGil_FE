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
const CHANGE_BOOKMARK = "CHANGE_BOOKMARK";

const logIn = createAction(LOGIN, (userInfo) => ({ userInfo }));
const logOut = createAction(LOG_OUT, () => ({}));
const isLogin = createAction(ISLOGIN, (token) => ({ token }));
const myTracking = createAction(MY_TRACK, (trackList) => ({ trackList }));
const myMountain = createAction(MY_MOUNTAIN, (mountainList) => ({
  mountainList,
}));
const myFeed = createAction(MY_FEED, (feedList) => ({ feedList }));
const myTitle = createAction(MY_TITLE, (titleList) => ({ titleList }));
const myBookmark = createAction(MY_BOOKMARK, (mountList) => ({ mountList }));
const nameCheck = createAction(NAMECHECK, (check) => ({ check }));
const changeInfo = createAction(CHANGE_INFO, (userInfo) => ({ userInfo }));
const changeBookmark = createAction(CHANGE_BOOKMARK, (bookmark) => ({
  bookmark,
}));

const initialState = {
  titleHint: [
    {
      userTitle: "등린이",
      titleHint: "이걸 아직도 안 받았다고? 이건 오류신고 해야하는데?",
    },
    { userTitle: "방구석 홍길", titleHint: "등산한번 같이 나갈까요?" },
    { userTitle: "리틀홍길", titleHint: "저와의 만남은 3번부터죠!" },
    {
      userTitle: "내장래희망 홍길형님",
      titleHint: "홍길님이 될려면 10번은 올라야할걸요?",
    },
    { userTitle: "UM.....홍길?", titleHint: "UM.....홍길?" },
    {
      userTitle: "아직 여기라고?",
      titleHint: "읏샤읏샤 시작이 반이라고 했어요!",
    },
    {
      userTitle: "백만불짜리다리",
      titleHint: "100km정도 걸으면 다리가 탄탄해지겠죠?",
    },
    {
      userTitle: "산타고 전국일주",
      titleHint: "1000km 까지 걸으면 전국일주까지 가능해요!",
    },
    {
      userTitle: "내가탄 산 높이 히말라야",
      titleHint: "우리가 같이 10km까지 올라갈수 있다는걸 보여 주자구요!",
    },
    {
      userTitle: "구름위를걷는자",
      titleHint: "산길이랑 같이 30km 구름위를 올라가볼까요?",
    },
    {
      userTitle: "대기권 돌파~",
      titleHint: "대기권까지뚫자~! 1000km 가즈아~!",
    },
    { userTitle: "아싸중에인싸", titleHint: "등산모임한번 해보실까용?" },
    {
      userTitle: "인싸....?",
      titleHint: "10번까지하면 인싸가 될수있을것같아요!",
    },
    {
      userTitle: "인싸중에인싸",
      titleHint: "인싸의 인싸 50번정돈 가야하지않을까요?",
    },
    { userTitle: "산길인맥왕", titleHint: "산길인맥왕" },
    { userTitle: "이구역의연습생", titleHint: "이구역의연습생" },
    { userTitle: "이구역의연예인", titleHint: "이구역의연예인" },
    { userTitle: "예비 찰칵러", titleHint: "예비 찰칵러" },
    { userTitle: "셰르파", titleHint: "셰르파" },
    { userTitle: "내가~~!! 등!!신!!!", titleHint: "등신" },
  ],
};

// 카카오 로그인
const kakaoLoginDB = (code) => {
  return function (dispatch, getState) {
    api
      .kakaoLogin(code)
      .then((res) => {
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        dispatch(isLogInDB(ACCESS_TOKEN));
      })
      .catch((err) => {
        console.log(err);
        window.alert("로그인에 실패하였습니다.");
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
        window.alert("로그인에 실패하였습니다.");
      });
  };
};

// 구글 로그인
const googleLoginDB = (code) => {
  return function (dispatch, getState) {
    api
      .googleLogin(code)
      .then((res) => {
        const ACCESS_TOKEN = res.headers.authorization;
        sessionStorage.setItem("token", ACCESS_TOKEN); //세션에 저장
        dispatch(isLogInDB(ACCESS_TOKEN));
      })
      .catch((err) => {
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
        sessionStorage.setItem("nickname", res.data.nickname); //세션에 저장
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const nameCheckDB = (nickname) => {
  return function (dispatch, getState) {
    api
      .nameCheck(nickname)
      .then((res) => {
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
        const _user = {
          userId: userdata.userId,
          userImgUrl: image,
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
        const _user = {
          changeUser: {
            userId: userdata.userId,
            userImgUrl: userdata.userImgUrl,
            nickname: nickname,
            userTitle: userdata.userTitle,
          },
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
        console.log(res)
        const _user = {
          changeUser: {
            userId: userdata.userId,
            userImgUrl: userdata.userImgUrl,
            nickname: userdata.nickname,
            userTitle: userTitle,
          },
          changeTitle: {
            beforeTitlUrl: res.data.beforeTitleImgUrl,
            afterTitleUrl: res.data.userTitleImgUrl,
            beforeTitle: userdata.userTitle,
            afterTitle: userTitle,
          },
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
    api
      .myTracking()
      .then((res) => {
        dispatch(myTracking(res.data));
      })
      .catch((err) => {
        console.log("(myTracking) 실패 ::", err);
      });
  };
};

const myMountainDB = (mountainId) => {
  return function (dispatch, getState) {
    api
      .myMount(mountainId)
      .then((res) => {
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
        const list = { feedList: [...res.data] };
        dispatch(myFeed(list));
      })
      .catch((err) => {
        console.log("(myFeed) 실패 ::", err);
      });
  };
};

const myBookmarkDB = (pageNum, lat, lng) => {
  return function (dispatch, getState) {
    api
      .myBookmark(pageNum, lat, lng)
      .then((res) => {
        dispatch(myBookmark(res.data));
      })
      .catch((err) => {
        console.log("(myBookmark) 실패 ::", err);
      });
  };
};

const chagebookmarkDB = (mountainId) => {
  return function (dispatch, getState) {
    api
      .mainBookmark(mountainId)
      .then((res) => {
        dispatch(changeBookmark({ state: res.data, mountainId: mountainId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const myTitleDB = () => {
  return function (dispatch, getState) {
    api
      .myTitle()
      .then((res) => {
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
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
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
    [MY_FEED]: (state, action) =>
      produce(state, (draft) => {
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
    [MY_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.mountList.currentPage === 0) {
          draft.bookmarkList = action.payload.mountList;
        } else {
          draft.bookmarkList.bookMarkResponseDtos.push(
            ...action.payload.mountList.bookMarkResponseDtos
          );
          draft.bookmarkList.currentPage = action.payload.mountList.currentPage;
        }
      }),
    [CHANGE_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.bookmarkList.bookMarkResponseDtos =
          draft.bookmarkList.bookMarkResponseDtos.filter(
            (d) => d.mountainId !== action.payload.bookmark.mountainId
          );
      }),
    [MY_MOUNTAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.myMountain = action.payload.mountainList;
      }),
    [CHANGE_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo.changeUser;
        if (action.payload.userInfo.changeTitle) {
          const beforeIndex = draft.titleList.userTitleList.findIndex(
            (i) =>
              i.userTitle === action.payload.userInfo.changeTitle.beforeTitle
          );
          const afterIndex = draft.titleList.userTitleList.findIndex(
            (i) =>
              i.userTitle === action.payload.userInfo.changeTitle.afterTitle
          );

          draft.titleList.userTitleList[beforeIndex].userTitleImgUrl =
            action.payload.userInfo.changeTitle.beforeTitlUrl;
          draft.titleList.userTitleList[afterIndex].userTitleImgUrl =
            action.payload.userInfo.changeTitle.afterTitleUrl;
        }
      }),
    [NAMECHECK]: (state, action) =>
      produce(state, (draft) => {
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
  chagebookmarkDB,
};
