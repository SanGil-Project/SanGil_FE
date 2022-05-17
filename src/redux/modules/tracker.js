import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { api } from "../../shared/api";

const SET_PATH = "SET_PATH";
const GETSEARCH = "GETSEARCH";
const DISTANCE = "DISTANCE";
const ENDCLIMB = "ENDCLIMB";
const DELETE = "DELETE";
const GET_COMPLETED = "GET_COMPLETED";

export const setPath = createAction(SET_PATH, (path) => ({ path }));
const getSearch = createAction(GETSEARCH, (data) => ({ data }));
const distance = createAction(DISTANCE, (distance) => ({ distance }));
const endClimb = createAction(ENDCLIMB, (comment) => ({ comment }));
const getCompleted = createAction(GET_COMPLETED, (trackList) => ({ trackList }))


export const startDB = (mountainId, setCompletedId) => {
  return function (dispatch, getState) {
    axios
      .post(
        // `https://burgerrr.shop/api/tracking/${mountainId}`,
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
        // `https://burgerrr.shop/api/mountain/search?keyword=${keyword}&pageNum=${pageNum}`,
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
        // `https://burgerrr.shop/api/tracking/mountain/${completedId}`,
        `http://3.35.49.228/api/tracking/mountain/${completedId}`,
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
  return function (dispatch, getState) {
    axios
      .put(
        // `https://burgerrr.shop/api/tracking/${completedId}`,
        `http://3.35.49.228/api/tracking/${completedId}`,
        {
          totalDistance: data.totalDistance,
          totalTime: data.totalTime,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(endClimb(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteDB = (completedId) => {
  console.log(completedId);
  return function (distpatch, getState) {
    axios
      // .delete(`https://burgerrr.shop/api/tracking/${completedId}`, {
        .delete(`http://3.35.49.228/api/tracking/${completedId}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


const getCompletedDB = (completedId) => {
  return function (dispatch, getState) {

    // const fakeDB = {
    //   userId : 1,
    //   username : "이재진",
    //   userTitle : "um.....홍길?",
    //   userTitleImgUrl : "없음",
    //   completedid : 1,
    //   mountian : "지리산",
    //   totalDistance : 10.3,
    //   totalTime : "4시간 20분 13초",
    //   creatDate : "2022-05-22",
    //   trackingList: [
    //   {
    //   lat:12.1234567,
    //   lng:123.1234567,
    //   },
    //   {
    //   lat:12.1234567,
    //   lng:123.1234567,
    //   },
    //   {
    //   lat:12.1234567,
    //   lng:123.1234567,
    //   },
    //   {
    //   lat:12.1234567,
    //   lng:123.1234567,
    //   }
    // ]};

    // dispatch(getCompleted(fakeDB));
    // dispatch(setPath(fakeDB.trackingList));
    // return;

    api
      .getMytrack(completedId)
      .then((res) => {
        console.log("(getMytrack) 성공 후 데이터 ::", res);
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
        console.log(action.payload.path);
        draft.polylinePath.polylinePath.push(action.payload.path);
      }),
    [GETSEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList = action.payload.data.searchList;
      }),
    [DISTANCE]: (state, action) =>
      produce(state, (draft) => {
        draft.distance = action.payload.distance;
      }),
    [ENDCLIMB]: (state, action) =>
      produce(state, (draft) => {
        draft.comment = action.payload.comment;
      }),
    [GET_COMPLETED]: (state, action) => produce(state, (draft) => {
      console.log(action.payload);
      draft.myTrack = action.payload.trackList;
    }),
  },
  initialState
);

const actionCreators = {
  setPath,
  getCompletedDB,
};

export { actionCreators };
