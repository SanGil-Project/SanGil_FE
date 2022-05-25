import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

const GET_CMT = "GET_CMT";
const ADD_CMT = "ADD_CMT";
const DELETE_CMT = "DELETE_CMT";
const UPDATE_CMT = "UPDATE_CMT";

const getFeedCmt = createAction(GET_CMT, (feedList) => ({ feedList }));
const addFeedCmt = createAction(ADD_CMT, (feed) => ({ feed }));
const deleteFeedCmt = createAction(DELETE_CMT, (feedId) => ({ feedId }));
const updateCmt = createAction(UPDATE_CMT, (feedData) => ({ feedData }));

const initialState = {};

export const getDetailDB = (feedId, pageNum) => {
  return function (dispatch, getState) {
    api
      .getFeedDetail(feedId, pageNum)
      .then((res) => {
        console.log(res);
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_CMT]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);
