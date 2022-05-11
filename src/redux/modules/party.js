import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

const SET_PARTY = "SET_PARTY";
const GET_MY_PARTY = "GET_MY_PARTY";
const ADD_PARTY = "ADD_PARTY";
const EDIT_PARTY = "EDIT_PARTY";
const ATTEND_PARTY = "ATTEND_PARTY";
const CANCEL_PARTY = "CANCEL_PARTY";
const DELETE_PARTY = "DELETE_PARTY";

const setParty = createAction(SET_PARTY, (partyList) => ({ partyList }));
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
  partyList: [
    // {
    // partyId : null,
    // username : "",
    // userImgUrl: "",
    // userTitle : "",
    // title : "",
    // mountain : "",
    // address : "",
    // partyDate : "",
    // partyTime: "",
    // partyContent : "",
    // maxPeople : null,
    // curPeople : null,
    // completed : false,
    // createdAt : "",
    // partymember: [
    //   {
    //   username: "",
    //   userImageUrl: "",
    //   userTitle: ""
    //   },]
    // },
  ],
};

const getMyPartyDB = () => {
  return function (dispatch, getState) {
    // return;
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

const getPartyDB = () => {
  return function (dispatch, getState) {
    const pageNum = 1;
    api
      .getPartyList(pageNum)
      .then((res) => {
        console.log("(getPartyList) 성공 데이터 확인 ::", res);
        dispatch(setParty(res.data));
      })
      .catch((err) => {
        console.log("(getPartyList) 실패 ::", err);
      });
  };
};

const getOnePartyDB = (partyId = null) => {
  return function (dispatch, getState) {
    api
      .getOneParty(partyId)
      .then((res) => {
        console.log("(getOneParty) 성공 데이터 확인 ::", res);
        const partyDB = {
          partyList: [res.data],
        };
        dispatch(setParty(partyDB));
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
    // const _partyList = getState().party.partyList[0];
    // const _user = {
    //   username: "테스트용",
    //   userTitle: "테스트한다",
    //   userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
    // }
    console.log(_user);
    const user_info = {
      username: _user.username,
      userTitle: _user.userTitle,
      userImageUrl: _user.userImageUrl,
    };

    // dispatch(attendParty(partyId, user_info));
    // return;
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
    [SET_PARTY]: (state, action) => produce(state, (draft) => {
      draft.partyList = action.payload.partyList.partyList;
    }),
    [ADD_PARTY]: (state, action) => produce(state, (draft) => {
      draft.partyList.unshift(action.payload.party);
    }),
    [EDIT_PARTY]: (state, action) => produce(state, (draft) => {
      
    }),
    [ATTEND_PARTY]: (state, action) => produce(state, (draft) => {
      draft.partyList[0].partymemberDto.push(action.payload.user);
      draft.partyList[0].curPeople++;
    }),
    [CANCEL_PARTY]: (state, action) => produce(state, (draft) => {
      draft.partyList[0].partymemberDto =
        draft.partyList[0].partymemberDto.filter(
          (p) => p.username !== action.payload.user.username
        );
      draft.partyList[0].curPeople--;
    }),
    [DELETE_PARTY]: (state, action) => produce(state, (draft) => {
        // draft.partyList = draft.partyList.filter(
        //   (p) => p.partyId !== action.payload.partyList.partyId
        // );
    }), 
  },
  initialState
);

const actionCreators = {
  setParty,
  addParty,
  editParty,
  attendParty,
  cancelParty,
  deleteParty,
  getPartyDB,
  getOnePartyDB,
  addPartyDB,
  editPartyDB,
  attendPartyDB,
  deletePartyDB,
  getMyPartyDB,
};

export { actionCreators };
