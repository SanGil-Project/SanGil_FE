import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import axios from "axios";

const SET_PATH = "SET_PATH";

const setPath = createAction(SET_PATH, (path) => ({ path }));

export const setPathDB = () => {
  return function (dispatch, getState) {
    axios
      .get("url")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const initialState = {
  polylinePath: [],
};

export default handleActions(
  {
    [SET_PATH]: (state, action) =>
      produce(state, (draft) => {
        draft.polylinePath.push(action.payload.path);
      }),
  },
  initialState
);

const actionCreators = {
  setPath,
};

export { actionCreators };
