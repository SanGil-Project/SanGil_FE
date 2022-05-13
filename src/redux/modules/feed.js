import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

const ADD_FEED = "ADD_FEED";
const DELETE_FEED = "DELETE_FEED";
const GET_FEED = "GET_FEED";
const LIKE = "LIKE";

const addFeed = createAction(ADD_FEED, (data) => ({ data }));
const deleteFeed = createAction(DELETE_FEED, (feedId) => ({ feedId }));
const getFeed = createAction(GET_FEED, (feedList) => ({ feedList }));
const likeFeed = createAction(LIKE, (data) => ({
  data,
}));

const initialState = {};

export const addFeedDB = (feed) => {
  const frm = new FormData();
  frm.append("file", feed.multipartfile, feed.multipartfile.name);
  frm.append("feedContent", feed.feedContent);
  return function (dispatch, getState) {
    axios
      .post("http://3.35.49.228/api/feeds/write", frm, {
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
    axios
      .get("http://3.35.49.228/api/main/feeds/1", {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(getFeed(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteFeedDB = (feedId) => {
  return function (dispatch, getState) {
    axios
      .delete(`http://3.35.49.228/api/feeds/delete/${feedId}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
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
    axios
      .post(
        `http://3.35.49.228/api/feeds/good/${feedId}`,
        { feedId: feedId },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(likeFeed({ goodStatus: res.data.goodStatus, feedId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [ADD_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.feedList.feedList.unshift(action.payload.data);
      }),
    [GET_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.feedList = action.payload.feedList;
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
        draft.feedList.feedList[idx] = {
          ...draft.feedList.feedList[idx],
          goodStatus: action.payload.data.goodStatus,
        };
      }),
  },
  initialState
);
