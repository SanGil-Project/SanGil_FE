import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

const ADDFEED = "ADDFEED";
const GETFEED = "GETFEED";

const addFeed = createAction(ADDFEED, (data) => ({ data }));
const getFeed = createAction(GETFEED, (feeds) => ({ feeds }));

const initialState = {};

export const feedDB = () => {
  return function (dispatch, getState) {};
};

export const addFeedDB = () => {
  return function (dispatch, getState) {};
};

export default handleActions(
  {
    [ADDFEED]: (state, action) => produce(state, (draft) => {}),
    [GETFEED]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);
