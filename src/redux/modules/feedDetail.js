import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

const GET_DETAIL = "GET_DETAIL";
const DELETE_FEED = "DELETE_FEED";
const ADD_CMT = "ADD_CMT";
const MORE_CMT = "MORE_CMT";
const DELETE_CMT = "DELETE_CMT";
const UPDATE_CMT = "UPDATE_CMT";
const DETAIL_LIKE = "DETAIL_LIKE";

const getFeedDetail = createAction(GET_DETAIL, (feed) => ({ feed }));
const deleteFeed = createAction(DELETE_FEED, (data) => ({ data }));
const addFeedCmt = createAction(ADD_CMT, (comment) => ({ comment }));
const moreCmt = createAction(MORE_CMT, (feedList) => ({ feedList }));
const deleteFeedCmt = createAction(DELETE_CMT, (feedCommentId) => ({
  feedCommentId,
}));
const updateCmt = createAction(UPDATE_CMT, (feedData) => ({ feedData }));
const feedLike = createAction(DETAIL_LIKE, (goodStatus) => ({ goodStatus }));

const initialState = {};

export const getDetailDB = (feedId, pageNum) => {
  return function (dispatch, getState) {
    api
      .getFeedDetail(feedId, pageNum)
      .then((res) => {
        if (res.data.commentList.currentPage === 0) {
          dispatch(getFeedDetail(res.data));
        } else {
          dispatch(moreCmt(res.data.commentList));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateCmtDB = (feedCommentId, feedComment) => {
  return function (dispatch, getState) {
    api
      .updateFeedCmt(feedCommentId, feedComment)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteDB = (feedId) => {
  return function (dispatch, getState) {
    api
      .deleteDetail(feedId)
      .then((res) => {
        dispatch(deleteFeed(feedId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const detailLikeDB = (feedId) => {
  return function (dispatch, getState) {
    api
      .detailLike(feedId)
      .then((res) => {
        dispatch(feedLike(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addCmtDB = (feedId, feedComment) => {
  return function (dispatch, getState) {
    api
      .addFeedCmt(feedId, feedComment)
      .then((res) => {
        dispatch(addFeedCmt({ ...res.data, feedComment }));
        alert("댓글이 작성되었습니다");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCmtDB = (feedCommentId) => {
  return function (dispatch, getState) {
    api
      .deleteFeedCmt(feedCommentId)
      .then((res) => {
        dispatch(deleteFeedCmt(feedCommentId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.feed = action.payload.feed;
      }),
    [MORE_CMT]: (state, action) =>
      produce(state, (draft) => {
        const moreCmt = draft.feed.commentList.commentResponseDtos.concat(
          action.payload.feedList.commentResponseDtos
        );
        draft.feed.commentList = {
          ...action.payload.feedList,
          commentResponseDtos: moreCmt,
        };
      }),
    [DETAIL_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.feed = {
          ...state.feed,
          goodStatus: action.payload.goodStatus.goodStatus,
          goodCnt: action.payload.goodStatus.goodCnt,
        };
      }),
    [DELETE_FEED]: (state, action) => produce(state, (draft) => {}),
    [ADD_CMT]: (state, action) =>
      produce(state, (draft) => {
        draft.feed.commentList.commentResponseDtos.unshift({
          ...action.payload.comment,
          beforeTime: "방금 전",
        });
      }),
    [DELETE_CMT]: (state, action) =>
      produce(state, (draft) => {
        const afterCmt = draft.feed.commentList.commentResponseDtos.filter(
          (el, idx) => el.commentId !== action.payload.feedCommentId
        );
        draft.feed.commentList.commentResponseDtos = afterCmt;
      }),
  },
  initialState
);
