import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { api } from "../../shared/api";

const SET_PATH = "SET_PATH";
const GETSEARCH = "GETSEARCH";
const DISTANCE = "DISTANCE";
const ENDCLIMB = "ENDCLIMB";
const DELETE_PATH = "DELETE_PATH";
const GET_COMPLETED = "GET_COMPLETED";
const GET_IMG = "GET_IMG";

export const deletePath = createAction(DELETE_PATH, (path) => ({ path }));
export const setPath = createAction(SET_PATH, (path) => ({ path }));
const getSearch = createAction(GETSEARCH, (data) => ({ data }));
const distance = createAction(DISTANCE, (distance) => ({ distance }));
const endClimb = createAction(ENDCLIMB, (comment) => ({ comment }));
const getCompleted = createAction(GET_COMPLETED, (trackList) => ({
  trackList,
}));
const getImg = createAction(GET_IMG, (mountainImg) => ({ mountainImg }));

export const startDB = (mountainId, setCompletedId) => {
  return function (dispatch, getState) {
    api
      .start(mountainId, setCompletedId)
      .then((res) => {
        setCompletedId(res.data.completedId);
        dispatch(getImg(res.data.mountainImgUrl));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const searchNameDB = (keyword, pageNum) => {
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

export const setPathDB = (completedId, loca) => {
  return function (dispatch, getState) {
    api
      .setPath(completedId, loca)
      .then((res) => {
        dispatch(distance(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const endClimbDB = (completedId, data) => {
  return function (dispatch, getState) {
    api
      .endClimb(completedId, data)
      .then((res) => {
        dispatch(endClimb(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteDB = (completedId) => {
  return function (distpatch, getState) {
    api
      .deleteDB(completedId)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
};

const getCompletedDB = (completedId) => {
  return function (dispatch, getState) {
    api
      .getMytrack(completedId)
      .then((res) => {
        dispatch(getCompleted(res.data));
        dispatch(setPath(res.data.trackingList));
      })
      .catch((err) => {
        console.log("(getMytrack) 실패 ::", err);
      });
  };
};

const initialState = {
  polylinePath: { polylinePath: [] },
};

export default handleActions(
  {
    [SET_PATH]: (state, action) =>
      produce(state, (draft) => {
        draft.polylinePath.polylinePath.push(action.payload.path);
      }),
    [DELETE_PATH]: (state, action) =>
      produce(state, (draft) => {
        draft.polylinePath = [];
      }),
    [GETSEARCH]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.data.currentPage === 0) {
          draft.searchList = action.payload.data.searchList;
          draft.searchTotalPg = action.payload.data.totalPage;
          draft.searchCurrentPg = action.payload.data.currentPage;
        } else {
          draft.searchList.push(...action.payload.data.searchList);
          draft.searchCurrentPg = action.payload.data.currentPage;
        }
      }),
    [DISTANCE]: (state, action) =>
      produce(state, (draft) => {
        draft.distance = action.payload.distance;
      }),
    [ENDCLIMB]: (state, action) =>
      produce(state, (draft) => {
        draft.comment = action.payload.comment;
      }),
    [GET_COMPLETED]: (state, action) =>
      produce(state, (draft) => {
        draft.myTrack = action.payload.trackList;
      }),
    [GET_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.mountainImg = action.payload.mountainImg;
      }),
  },
  initialState
);

const actionCreators = {
  setPath,
  getCompletedDB,
};

export { actionCreators };
