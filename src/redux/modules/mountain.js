import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";
import axios from "axios";

const GET_TOP_MNT = "GET_TOP_MNT";
const GET_DETAIL = "GET_DEATIL";
const GET_SEARCH = "GET_SEARCH";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DESC_BOOKMARK = "DESC_BOOKMARK";

const getTopMnt = createAction(GET_TOP_MNT, (mountainList) => ({
  mountainList,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));
const getDetail = createAction(GET_DETAIL, (data) => ({ data }));
const getSearch = createAction(GET_SEARCH, (data) => ({ data }));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));
const updateCmt = createAction(UPDATE_COMMENT, (commentData) => ({
  commentData,
}));
const likeMountain = createAction(DESC_BOOKMARK, (likeStatus) => ({
  likeStatus,
}));

const initialState = {};

const getTopMntDB = () => {
  return function (dispatch, getState) {
    api
      .getTopList()
      .then((res) => {
        dispatch(getTopMnt(res.data));
      })
      .catch((err) => {
        console.log("(getTopList) 실패 ::", err);
      });
  };
};

const getSearchDB = (keyword, pageNum) => {
  return function (dispatch, getState) {
    api
      .searchName(keyword, pageNum)
      .then((res) => {
        dispatch(getSearch(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getDetailDB = (mountainId, pageNum) => {
  return function (dispatch, getState) {
    api
      .getDetail(mountainId, pageNum)
      .then((res) => {
        dispatch(getDetail(res.data));
      })
      .catch((err) => {
        console.log("(getTopList) 실패 ::", err);
      });
  };
};

const addCommentDB = (mountainId, commentData) => {
  return function (dispatch, getState) {
    api
      .addComment(mountainId, commentData)
      .then((res) => {
        if (res.data.msg === "중복") {
          alert("해당 산의 댓글은 한번만 작성이 가능합니다");
          dispatch(addComment(res.data));
          dispatch(deleteCmtDB(res.data.mountainCommentId));
        } else if (res.data.msg === "작성 가능") {
          dispatch(addComment(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteCmtDB = (mountainCommentId) => {
  return function (dispatch, getState) {
    api
      .deleteComment(mountainCommentId)
      .then((res) => {
        dispatch(deleteComment(mountainCommentId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateCmtDB = (commentData) => {
  return function (dispatch, getState) {
    api
      .updateComment(commentData)
      .then((res) => {
        dispatch(updateCmt(commentData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const likeDB = (mountainId) => {
  return function (dispatch, getState) {
    api
      .like(mountainId)
      .then((res) => {
        dispatch(likeMountain(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_TOP_MNT]: (state, action) =>
      produce(state, (draft) => {
        draft.mountainList = action.payload.mountainList;
        draft.searchList = null;
        draft.searchTotalPg = null;
        draft.searchCurrentPg = null;
      }),
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList = action.payload.data.searchList;
        draft.searchTotalPg = action.payload.data.totalPage;
        draft.searchCurrentPg = action.payload.data.currentPage;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.mountainData = action.payload.data;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.mountainData.commentDto.commentLists.push(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        const afterCmt = draft.mountainData.commentDto.commentLists.filter(
          (el, idx) => el.mountainCommentId !== action.payload.commentId
        );
        draft.mountainData.commentDto.commentLists = afterCmt;
      }),
    [UPDATE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.mountainData.commentDto.commentLists.findIndex(
          (el, idx) =>
            el.mountainCommentId ===
            action.payload.commentData.mountainCommentId
        );
        draft.mountainData.commentDto.commentLists[idx].mountainComment =
          action.payload.commentData.mountainComment;
      }),
    [DESC_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.mountainData.bookmark = action.payload.likeStatus;
      }),
  },
  initialState
);

const actionCreators = {
  getTopMnt,
  getTopMntDB,
  getDetailDB,
  addCommentDB,
  deleteCmtDB,
  updateCmtDB,
  likeDB,
  getSearchDB,
};

export { actionCreators };
