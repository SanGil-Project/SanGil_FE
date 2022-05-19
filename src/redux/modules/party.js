import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

import { actionCreators as chatActions } from './chat';

const GET_PARTY = "GET_PARTY";
const GET_ONE_PARTY = "GET_ONE_PARTY";
const GET_MY_PARTY = "GET_MY_PARTY";
const ADD_PARTY = "ADD_PARTY";
const EDIT_PARTY = "EDIT_PARTY";
const ATTEND_PARTY = "ATTEND_PARTY";
const CANCEL_PARTY = "CANCEL_PARTY";
const DELETE_PARTY = "DELETE_PARTY";

const getParty = createAction(GET_PARTY, (partyList) => ({ partyList }));
const getOneParty = createAction(GET_ONE_PARTY, (party) => ({ party }));
const getMyParty = createAction(GET_MY_PARTY, (partyList) => ({ partyList }));
const addParty = createAction(ADD_PARTY, (party) => ({ party }));
const editParty = createAction(EDIT_PARTY, (partyId, party) => ({
  partyId,
  party,
}));
const attendParty = createAction(ATTEND_PARTY, (user) => ({ user }));
const cancelParty = createAction(CANCEL_PARTY, (user) => ({ user }));
const deleteParty = createAction(DELETE_PARTY, (partyId) => ({ partyId }));

const initialState = {
};

const getMyPartyDB = () => {
  return function (dispatch, getState) {
    api
      .getMyParty()
      .then((res) => {
        console.log("(getMyParty) 성공 데이터 확인 ::", res);
        dispatch(getMyParty(res.data));
      })
      .catch((err) => {
        console.log("(getMyParty) 실패 ::", err);
      });
  };
};

const getPartyDB = (pageNum) => {
  return function (dispatch, getState) {
    api
      .getPartyList(pageNum)
      .then((res) => {
        console.log("(getPartyList) 성공 데이터 확인 ::", res);
        dispatch(getParty(res.data));
      })
      .catch((err) => {
        console.log("(getPartyList) 실패 ::", err);
      });
  };
};

const getOnePartyDB = (partyId = null) => {
  return function (dispatch, getState) {

    // const partyList = getState().party.list.partyList;
    // console.log(partyList);
    api
      .getOneParty(partyId)
      .then((res) => {
        console.log("(getOneParty) 성공 데이터 확인 ::", res);
        // const partyDB = {
        //   partyList: [...partyList],
        //   curtParty: res.data,
        // };
        // dispatch(getParty(partyDB));
        dispatch(getOneParty(res.data));
      })
      .catch((err) => {
        console.log("(getOneParty) 실패 ::", err);
      });
  };
};

const addPartyDB = (party = {}) => {
  return function (dispatch, getState) {
    api
      .addParty(party)
      .then((res) => {
        console.log("(addParty) 성공 데이터 확인 ::", res);
        dispatch(addParty(res.data));
        dispatch(chatActions.addChatRoomDB(party.title)); // 작성할때 해당 partyId 채팅방 만들기
      })
      .catch((err) => {
        console.log("(addParty) 실패 ::", err);
      });
  };
};

const editPartyDB = (partyId = null, party = {}) => {
  return function (dispatch, getState) {
    console.log(party);

    api
      .editParty(partyId, party)
      .then((res) => {
        console.log("(editParty) 성공 데이터 확인 ::", res);
        dispatch(editParty(res.data));
        // dispatch(editParty(partyId, { ...party }));
      })
      .catch((err) => {
        console.log("(editParty) 실패 ::", err);
      });
  };
};

const attendPartyDB = (partyId = null) => {
  return function (dispatch, getState) {
    const _user = getState().user.userInfo;
    console.log(_user);
    const user_info = {
      nickname: _user.nickname,
      userTitle: _user.userTitle,
      userImageUrl: _user.userImageUrl,
    };

    api
      .attendParty(partyId)
      .then((res) => {
        console.log("(attendParty) 성공 데이터 확인 ::", res);
        if (res.data) {
          dispatch(attendParty(user_info));
        } else {
          dispatch(cancelParty(user_info));
        }
        // dispatch(editParty(partyId, { ...party }));
      })
      .catch((err) => {
        console.log("(attendParty) 실패 ::", err);
      });
  };
};

const deletePartyDB = (partyId = null) => {
  return function (dispatch, getState) {
    api
      .delParty(partyId)
      .then((res) => {
        console.log("(delParty) 성공 데이터 확인 ::", res);
        dispatch(deleteParty(partyId));
      })
      .catch((err) => {
        console.log("(delParty) 실패 ::", err);
      });
  };
};

export default handleActions(
  {
    [GET_MY_PARTY]: (state, action) => produce(state, (draft) => {
      draft.myPartyList = action.payload.partyList.plans;
    }),
    [GET_PARTY]: (state, action) => produce(state, (draft) => {
      // draft.partyList = action.payload.partyList.partyList;
      // draft.list = action.payload.partyList;
      draft.list = action.payload.partyList;
    }),
    [GET_ONE_PARTY]: (state, action) => produce(state, (draft) => {
      // draft.partyList = action.payload.partyList.partyList;
      // draft.list = action.payload.partyList;
      draft.curtParty = action.payload.party;
    }),
    [ADD_PARTY]: (state, action) => produce(state, (draft) => {
      draft.list.partyList.unshift(action.payload.party);
    }),
    [EDIT_PARTY]: (state, action) => produce(state, (draft) => {
      
    }),
    [ATTEND_PARTY]: (state, action) => produce(state, (draft) => {
      draft.curtParty.partymemberDto.push(action.payload.user);
      draft.curtParty.curPeople++;
    }),
    [CANCEL_PARTY]: (state, action) => produce(state, (draft) => {
      draft.curtParty.partymemberDto =
        draft.curtParty.partymemberDto.filter(
          (p) => p.nickname !== action.payload.user.nickname
        );
      draft.curtParty.curPeople--;
    }),
    [DELETE_PARTY]: (state, action) => produce(state, (draft) => {
        draft.partyList = draft.partyList.filter(
          (p) => p.partyId !== action.payload.partyList.partyId
        );
    }), 
  },
  initialState
);

const actionCreators = {
  getPartyDB,
  getOnePartyDB,
  addPartyDB,
  editPartyDB,
  attendPartyDB,
  deletePartyDB,
  getMyPartyDB,
};

export { actionCreators };
