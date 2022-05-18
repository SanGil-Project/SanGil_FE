import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

const SELECT_MARKER = "SELECT_MARKER";
const SELECT_TIME = "SELECT_TIME"

const selectMarker = createAction(SELECT_MARKER, (selectData) => ({ selectData }));
const selectTime = createAction(SELECT_TIME, (selectTime) => ({ selectTime }));

const initialState = {
  selectTime: {
    division: "오전",
    hour: null,
    minute: null,
  },
};

const selectMarkerDB = (id, idx = null) => {
  return function (dispatch, getState) {
    console.log(id, idx)
    const selectData = {
      id: id,
      index: idx,
    }
    dispatch(selectMarker(selectData));
  };
};

const selectTimeDB = (time = null, type) => {
  return function (dispatch, getState) {

    let selectData = getState().handle.selectTime;

    if (type === "division") {
      selectData = {
        ...selectData,
        division: time,
      }
    } else if(type === "hour") {
      selectData = {
        ...selectData,
        hour: time,
      }
    } else {
      selectData = {
        ...selectData,
        minute: time,
      }
    }
    dispatch(selectTime(selectData));
  };
};

export default handleActions(
  {
    [SELECT_MARKER]: (state, action) => produce(state, (draft) => {
      draft.selectMarker = action.payload.selectData;
    }),
    [SELECT_TIME]: (state, action) => produce(state, (draft) => {
      console.log(action.payload);
      draft.selectTime = action.payload.selectTime;
    }),
  },
  initialState
);

const actionCreators = {
  selectMarkerDB,
  selectTimeDB
};

export { actionCreators };
