import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

const SELECT_MARKER = "SELECT_MARKER";

const selectMarker = createAction(SELECT_MARKER, (marker) => ({ marker }));

const initialState = {};

const selectMarkerDB = (mountainId) => {
  return function (dispatch, getState) {
    dispatch(selectMarker(mountainId));
  };
};

export default handleActions(
  {
    [SELECT_MARKER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.selectMarker = action.payload.marker;
      }),
  },
  initialState
);

const actionCreators = {
  selectMarkerDB,
};

export { actionCreators };
