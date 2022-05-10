import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import axios from "axios";

const SET_PATH = "SET_PATH";
const GETSEARCH = "GETSEARCH";
const DISTANCE = "DISTANCE";
const ENDCLIMB = "ENDCLIMB";

const setPath = createAction(SET_PATH, (path) => ({ path }));
const getSearch = createAction(GETSEARCH, (data) => ({ data }));
const distance = createAction(DISTANCE, (distance) => ({ distance }));

export const startDB = (mountainId, setCompletedId) => {
  return function (dispatch, getState) {
    axios
      .post(
        `http://3.35.49.228/api/tracking/${mountainId}`,
        { send: 1 },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setCompletedId(res.data.completedId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const searchNameDB = (keyword, pageNum) => {
  return function (dispatch, getState) {
    axios
      .get(
        `http://3.35.49.228/api/mountain/search?keyword=${keyword}&pageNum=${pageNum}`,
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
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
    axios
      .post(
        `http://3.35.49.228/api/mountain/tracking/${completedId}`,
        { lat: loca.lat, lng: loca.lng },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch(distance(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const endClimbDB = (completedId, data) => {
  console.log(data)
  return function (dispatch, getState) {
    // axios
    //   .put(
    //     `http://3.35.49.228/api/mountain/tracking/${completedId}`,
    //     {
    //       totalDistance: data.totalDistance,
    //       totalTime: data.totalTime,
    //     },
    //     {
    //       headers: {
    //         Authorization: sessionStorage.getItem("token"),
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
};

const initialState = {
  polylinePath: { distance: {} },
};

export default handleActions(
  {
    [SET_PATH]: (state, action) =>
      produce(state, (draft) => {
        draft.polylinePath.push(action.payload.path);
      }),
    [GETSEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList = action.payload.data.searchList;
      }),
    [DISTANCE]: (state, action) =>
      produce(state, (draft) => {
        draft.distance = { ...draft.distance, ...action.payload.distance };
      }),
  },
  initialState
);

const actionCreators = {
  setPath,
};

export { actionCreators };
