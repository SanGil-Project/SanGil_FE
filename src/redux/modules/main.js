import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

const GETPARTY = "GETPARTY";
const GETBEST = "GETBEST";
const GETFEED = "GETFEED";
const GETAROUND = "GETAROUND";

const getParty = createAction(GETPARTY, (parties) => ({ parties }));
const getBest = createAction(GETBEST, (mountains) => ({ mountains }));
const getFeed = createAction(GETFEED, (feeds) => ({ feeds }));
const getAround = createAction(GETAROUND, (course) => ({ course }));
const initialState = {};

export const aroundDB = () => {
  return function (dispatch, getState) {
    axios
      .get("url")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const feedDB = () => {
  return function (dispatch, getState) {
    axios
      .get("http://52.78.68.95/api/main/feeds/1")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const mountainsDB = () => {
  return function (dispatch, getState) {
    axios
      .get("http://52.78.68.95/api/main/mountains")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const partyDB = () => {
  return function (dispatch, getState) {
    axios
      .get("http://52.78.68.95/api/main/parties")
      .then((res) => {
        dispatch(getParty(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GETPARTY]: (state, action) =>
      produce(state, (draft) => {
        draft.parties = action.payload.parties;
      }),
    [GETBEST]: (state, action) => produce(state, (draft) => {}),
    [GETFEED]: (state, action) => produce(state, (draft) => {}),
    [GETAROUND]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);
