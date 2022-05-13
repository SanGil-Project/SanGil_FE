import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";
import axios from "axios";

const GET_TOP_MNT = "GET_TOP_MNT";
const GET_DETAIL = "GET_DEATIL";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const getTopMnt = createAction(GET_TOP_MNT, (mountainList) => ({
  mountainList,
}));
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));
const getDetail = createAction(GET_DETAIL, (data) => ({ data }));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));

const initialState = {};

const getTopMntDB = () => {
  return function (dispatch, getState) {
    api
      .getTopList()
      .then((res) => {
        console.log("(getTopList) 성공 데이터 확인 ::", res);
        dispatch(getTopMnt(res.data));
      })
      .catch((err) => {
        console.log("(getTopList) 실패 ::", err);
      });
  };
};

const getDetailDB = (mountainId, pageNum) => {
  return function (dispatch, getState) {
    api
      .getDetail(mountainId, pageNum)
      .then((res) => {
        console.log("(getDetail) 성공 데이터 확인 ::", res);
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
        console.log(res.data);
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

export default handleActions(
  {
    [GET_TOP_MNT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.mountainList = action.payload.mountainList;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.mountainData = action.payload.data;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.mountainData.commentDto.commentLists.unshift(
          action.payload.comment
        );
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const afterCmt = draft.mountainData.commentDto.commentLists.filter(
          (el, idx) => el.mountainCommentId !== action.payload.commentId
        );
        draft.mountainData = {
          ...draft.mountainData,
          commentDto: {
            ...draft.mountainData.commentDto,
            commentLists: afterCmt,
          },
        };
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
};

export { actionCreators };
