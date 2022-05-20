import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { api } from "../../shared/api";

const GETPARTY = "GETPARTY";
const GETBEST = "GETBEST";
const GETFEED = "GETFEED";
const GETAROUND = "GETAROUND";
const BOOKMARK = "BOOKMARK";

const getParty = createAction(GETPARTY, (parties) => ({ parties }));
const getBest = createAction(GETBEST, (mountains) => ({ mountains }));
const getFeed = createAction(GETFEED, (feeds) => ({ feeds }));
const getAround = createAction(GETAROUND, (course) => ({ course }));
const bookmark = createAction(BOOKMARK, (like) => ({ like }));

const initialState = {};

export const aroundDB = (lat, lng) => {
  return function (dispatch, getState) {
    api
      .around(lat, lng)
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
    api
      .mainFeed()
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
    api
      .mountains()
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
    api
      .mainParty()
      .then((res) => {
        dispatch(getParty(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const bookmarkDB = (mountainId, type) => {
  return function (dispatch, getState) {
    api
      .mainBookmark(mountainId, type)
      .then((res) => {
        dispatch(bookmark({ like: res.data, mountainId, type }));
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
    [BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.like.type === "mountain") {
          const idx = draft.mountains.findIndex(
            (el) => el.mountainId === action.payload.like.mountainId
          );
          draft.mountains[idx].bookmark = action.payload.like.like;
        }
        if (action.payload.like.type === "around") {
          const idx = draft.around.nearbyMountainDtos.findIndex(
            (el) => el.mountainId === action.payload.like.mountainId
          );
          draft.around.nearbyMountainDtos[idx].bookmark =
            action.payload.like.like;
        }
      }),
  },
  initialState
);
