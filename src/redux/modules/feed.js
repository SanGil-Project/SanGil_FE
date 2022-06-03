import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { api } from "../../shared/api";

const ADD_FEED = "ADD_FEED";
const MORE_FEED = "MORE_FEED";
const DELETE_FEED = "DELETE_FEED";
const GET_FEED = "GET_FEED";
const LIKE = "LIKE";

const addFeed = createAction(ADD_FEED, (data) => ({ data }));
const moreFeed = createAction(MORE_FEED, (feedList) => ({ feedList }));
const deleteFeed = createAction(DELETE_FEED, (feedId) => ({ feedId }));
const getFeed = createAction(GET_FEED, (feedList) => ({ feedList }));
const likeFeed = createAction(LIKE, (data) => ({
  data,
}));

const initialState = { feedList: { feedList: [] } };

export const addFeedDB = (feed) => {
  const frm = new FormData();
  frm.append("file", feed.multipartfile, feed.multipartfile.name);
  frm.append("feedContent", feed.feedContent);
  return function (dispatch, getState) {
    axios
      // .post("http://15.164.102.106:8080/api/feeds/write", frm, {
      .post("http://3.34.122.99:8080/feeds/write", frm, {
      // .post("https://jinnn.shop/api/feeds/write", frm, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(addFeed(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getFeedDB = (pageNum) => {
  return function (dispatch, getState) {
    api
      .getFeedDB(pageNum)
      .then((res) => {
        if (res.data.currentPage === 0) {
          dispatch(getFeed(res.data));
        } else {
          dispatch(moreFeed(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteFeedDB = (feedId) => {
  return function (dispatch, getState) {
    api
      .deleteFeed(feedId)
      .then((res) => {
        dispatch(deleteFeed(feedId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const feedLikeDB = (feedId) => {
  return function (dispatch, getState) {
    api
      .feedLike(feedId)
      .then((res) => {
        dispatch(
          likeFeed({
            goodStatus: res.data.goodStatus,
            goodCnt: res.data.goodCnt,
            feedId,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_FEED]: (state, action) =>
      produce(state, (draft) => {
        const _feedList = action.payload.feedList;
        console.log(_feedList);
        draft.feedList = _feedList;
      }),
    [ADD_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.data);
        draft.feedList.feedList.unshift(action.payload.data);
      }),
    [MORE_FEED]: (state, action) =>
      produce(state, (draft) => {
        const _feedList = action.payload.feedList;
        draft.feedList = {
          ..._feedList,
          feedList: draft.feedList.feedList.concat(_feedList.feedList),
        };
      }),
    [DELETE_FEED]: (state, action) =>
      produce(state, (draft) => {
        const afterFeed = draft.feedList.feedList.filter(
          (el, idx) => el.feedId !== action.payload.feedId
        );
        draft.feedList = { ...draft.feedList, feedList: afterFeed };
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = state.feedList.feedList.findIndex(
          (el) => el.feedId === action.payload.data.feedId
        );
        draft.feedList.feedList[idx].goodStatus =
          action.payload.data.goodStatus;
        draft.feedList.feedList[idx].goodCnt = action.payload.data.goodCnt;
      }),
  },
  initialState
);
