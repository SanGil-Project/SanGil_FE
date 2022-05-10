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

export const aroundDB = (lat, lng) => {
  return function (dispatch, getState) {
    console.log(lat, lng);
    axios
      .get(`http://52.78.68.95/api/main/nearby/1?lat=37.45988&lng=126.9519`)
      .then((res) => {
        dispatch(getAround(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const feedDB = (token) => {
  return function (dispatch, getState) {
    axios
      .get("http://52.78.68.95/api/main/feeds/1")
      .then((res) => {
        dispatch(getFeed(res.data));
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
        dispatch(getBest(res.data));
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
    [GETBEST]: (state, action) =>
      produce(state, (draft) => {
        draft.mountains = action.payload.mountains;
      }),
    [GETFEED]: (state, action) =>
      produce(state, (draft) => {
        draft.feedList = action.payload.feeds;
      }),
    [GETAROUND]: (state, action) =>
      produce(state, (draft) => {
        draft.around = action.payload.course;
      }),
  },
  initialState
);
