import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

const SELECT_MARKER = "SELECT_MARKER";

const selectMarker = createAction(SELECT_MARKER, (selectData) => ({ selectData }));

const initialState = {};

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

export default handleActions(
  {
    [SELECT_MARKER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.selectMarker = action.payload.selectData;
      }),
  },
  initialState
);

const actionCreators = {
  selectMarkerDB,
};

export { actionCreators };
