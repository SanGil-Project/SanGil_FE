import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

const ADDFEED = "ADDFEED";
const GETFEED = "GETFEED";

const addFeed = createAction(ADDFEED, (data) => ({ data }));
const getFeed = createAction(GETFEED, (feeds) => ({ feeds }));

const initialState = {};

export const feedDB = (feed) => {
  const frm = new FormData();
  frm.append("file", feed.multipartfile, feed.multipartfile.name);
  frm.append("feedContent", feed.feedContent);
  return function (dispatch, getState) {
    axios
      .post("http://3.35.49.228/api/feeds/write", frm, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(addFeed(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addFeedDB = () => {
  return function (dispatch, getState) {};
};

export default handleActions(
  {
    [ADDFEED]: (state, action) => produce(state, (draft) => {}),
    [GETFEED]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);
