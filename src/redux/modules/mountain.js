import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { api } from "../../shared/api";

const SEARCH_MNT = "SEARCH_MNT";

const searchMnt = createAction(SEARCH_MNT, (searchList) => ({ searchList }));

const initialState = {
};

const searchMntDB = (keyword, pageNum) => {
  return function (dispatch, getState) {

    console.log(keyword, pageNum)
    // return;
    // const pageNum = 1;
    api
      .searchMount(keyword, pageNum)
      .then((res) => {
        console.log("(searchMnt) 성공 데이터 확인 ::", res);
        dispatch(searchMnt(res.data));
      })
      .catch((err) => {
        console.log("(searchMnt) 실패 ::", err);
      });
  };
};


export default handleActions(
  {
    [SEARCH_MNT]: (state, action) => produce(state, (draft) => {
      console.log(action.payload)
      // draft.partyList.push(...action.payload.partyList.partyList);
      // draft.partyList = action.payload.partyList.partyList;
    }),
    // [ADD_PARTY]: (state, action) => produce(state, (draft) => {
    //   draft.partyList.unshift(action.payload.party);
    // }),
    // [EDIT_PARTY]: (state, action) => produce(state, (draft) => {}),
    // [ATTEND_PARTY]: (state, action) => produce(state, (draft) => {
    //   draft.partyList[0].partymember.push(action.payload.user);
    // }),
    // [DELETE_PARTY]: (state, action) => produce(state, (draft) => {
    //   draft.partyList = draft.partyList.filter((p) => p.partyId !== action.payload.partyList.partyId);
    // }),
  },
  initialState
);

const actionCreators = {
  searchMnt,
  searchMntDB,
};

export { actionCreators };
