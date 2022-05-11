import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { api } from "../../shared/api";

const GET_TOP_MNT = "GET_TOP_MNT";
// const SEARCH_MNT = "SEARCH_MNT";

const getTopMnt = createAction(GET_TOP_MNT, (mountainList) => ({ mountainList }));
// const searchMnt = createAction(SEARCH_MNT, (searchList) => ({ searchList }));

const initialState = {
};


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

// const searchMntDB = (keyword, pageNum) => {
//   return function (dispatch, getState) {
//     console.log(keyword, pageNum)
//     return;
//     // const pageNum = 1;
//     api
//       .searchMount(keyword, pageNum)
//       .then((res) => {
//         console.log("(searchMnt) 성공 데이터 확인 ::", res);
//         dispatch(searchMnt(res.data));
//       })
//       .catch((err) => {
//         console.log("(searchMnt) 실패 ::", err);
//       });
//   };
// };



export default handleActions(
  {
    [GET_TOP_MNT]: (state, action) => produce(state, (draft) => {
      console.log(action.payload)
      draft.mountainList = action.payload.mountainList;
    }),
    // [SEARCH_MNT]: (state, action) => produce(state, (draft) => {
    //   console.log(action.payload)
    // }),
  },
  initialState
);

const actionCreators = {
  // searchMnt,
  getTopMnt,
  // searchMntDB,
  getTopMntDB,
};

export { actionCreators };
