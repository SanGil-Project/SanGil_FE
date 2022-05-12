import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { api } from "../../shared/api";

const GET_TOP_MNT = "GET_TOP_MNT";
const GET_DETAIL = "GET_DEATIL";

const getTopMnt = createAction(GET_TOP_MNT, (mountainList) => ({
  mountainList,
}));

const getDetail = createAction(GET_DETAIL, (data) => ({ data }));
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
  },
  initialState
);

const actionCreators = {
  getTopMnt,
  getTopMntDB,
  getDetailDB,
};

export { actionCreators };
