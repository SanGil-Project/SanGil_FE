import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

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
    console.log(lat, lng);
    axios
      .get(`http://3.35.49.228/api/main/nearby/1?lat=${lat}&lng=${lng}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
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

export const mountainsDB = () => {
  return function (dispatch, getState) {
    axios
      .get("http://3.35.49.228/api/main/mountains", {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
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
      .get("http://3.35.49.228/api/main/parties", {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
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
    axios
      .post(
        `http://3.35.49.228/api/mountain/bookmark/${mountainId}`,
        {
          mountainId: mountainId,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
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
