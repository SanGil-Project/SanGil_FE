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

    // const fackDB1 = {
    //   partyList : [
    //   {
    //   partyId : 1,
    //   title : "관악산 같이 갈래?",
    //   mountain : "관악산",
    //   address : "서울 관악구",
    //   partyDate : "2022-04-23",
    //   partyTime: "11:00",
    //   maxPeople : 8,
    //   curPeople : 8,
    //   completed :  false,
    //   createdAt : "09:00"
    //   },
    //   {
    //   partyId : 2,
    //   title : "관악산 나도 갈래!",
    //   mountain : "관악산",
    //   location : "서울 관악구",
    //   partyDate : "2022-04-23",
    //   partyTime: "11:00",
    //   maxPeople : 8,
    //   curPeople : 6,
    //   completed :true,
    //   createdAt : "09:00",
    //   },
    //   {
    //   partyId : 3,
    //   title : "2-관악산 나도 갈래!",
    //   mountain : "관악산",
    //   location : "서울 관악구",
    //   partyDate : "2022-04-23",
    //   partyTime: "11:00",
    //   maxPeople : 8,
    //   curPeople : 6,
    //   completed :true,
    //   createdAt : "09:00",
    //   },
    //   {
    //   partyId : 4,
    //   title : "2-관악산 나도 갈래!",
    //   mountain : "관악산",
    //   location : "서울 관악구",
    //   partyDate : "2022-04-23",
    //   partyTime: "11:00",
    //   maxPeople : 8,
    //   curPeople : 6,
    //   completed :true,
    //   createdAt : "09:00",
    //   }],
    //   totalPage : 3,
    //   currentPage : 0,
    //   }
    //   const fackDB2 = {
    //     partyList : [
    //     {
    //     partyId : 1,
    //     title : "관악산 같이 갈래?",
    //     mountain : "관악산",
    //     address : "서울 관악구",
    //     partyDate : "2022-04-23",
    //     partyTime: "11:00",
    //     maxPeople : 8,
    //     curPeople : 8,
    //     completed :  false,
    //     createdAt : "09:00"
    //     },
    //     {
    //     partyId : 2,
    //     title : "관악산 나도 갈래!",
    //     mountain : "관악산",
    //     location : "서울 관악구",
    //     partyDate : "2022-04-23",
    //     partyTime: "11:00",
    //     maxPeople : 8,
    //     curPeople : 6,
    //     completed :true,
    //     createdAt : "09:00",
    //     },
    //     {
    //     partyId : 3,
    //     title : "2-관악산 나도 갈래!",
    //     mountain : "관악산",
    //     location : "서울 관악구",
    //     partyDate : "2022-04-23",
    //     partyTime: "11:00",
    //     maxPeople : 8,
    //     curPeople : 6,
    //     completed :true,
    //     createdAt : "09:00",
    //     },
    //     {
    //     partyId : 4,
    //     title : "2-관악산 나도 갈래!",
    //     mountain : "관악산",
    //     location : "서울 관악구",
    //     partyDate : "2022-04-23",
    //     partyTime: "11:00",
    //     maxPeople : 8,
    //     curPeople : 6,
    //     completed :true,
    //     createdAt : "09:00",
    //     }],
    //     totalPage : 3,
    //     currentPage : 0,
    //     }
    //     const fackDB3 = {
    //       partyList : [
    //       {
    //       partyId : 1,
    //       title : "관악산 같이 갈래?",
    //       mountain : "관악산",
    //       address : "서울 관악구",
    //       partyDate : "2022-04-23",
    //       partyTime: "11:00",
    //       maxPeople : 8,
    //       curPeople : 8,
    //       completed :  false,
    //       createdAt : "09:00"
    //       },
    //       {
    //       partyId : 2,
    //       title : "관악산 나도 갈래!",
    //       mountain : "관악산",
    //       location : "서울 관악구",
    //       partyDate : "2022-04-23",
    //       partyTime: "11:00",
    //       maxPeople : 8,
    //       curPeople : 6,
    //       completed :true,
    //       createdAt : "09:00",
    //       },
    //       {
    //       partyId : 3,
    //       title : "2-관악산 나도 갈래!",
    //       mountain : "관악산",
    //       location : "서울 관악구",
    //       partyDate : "2022-04-23",
    //       partyTime: "11:00",
    //       maxPeople : 8,
    //       curPeople : 6,
    //       completed :true,
    //       createdAt : "09:00",
    //       },
    //       {
    //       partyId : 4,
    //       title : "2-관악산 나도 갈래!",
    //       mountain : "관악산",
    //       location : "서울 관악구",
    //       partyDate : "2022-04-23",
    //       partyTime: "11:00",
    //       maxPeople : 8,
    //       curPeople : 6,
    //       completed :true,
    //       createdAt : "09:00",
    //       }],
    //       totalPage : 3,
    //       currentPage : 0,
    //       }

    //   if (pageNum === 0) {
    //     dispatch(getParty(fackDB1));
    //   } else if (pageNum === 1) {
    //     dispatch(getParty(fackDB2));
    //   } else if (pageNum === 2) {
    //     dispatch(getParty(fackDB3));
    //   } 

      // dispatch(getParty(fackDB));
      // return;
      console.log(pageNum)

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
        dispatch(chatActions.addChatRoomDB(party.title, res.data.partyId)); // 작성할때 해당 partyId 채팅방 만들기
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
      if (action.payload.partyList.currentPage === 0) {
        draft.list = action.payload.partyList;
      } else {
        draft.list.partyList.push(...action.payload.partyList.partyList);
        draft.list.currentPage = action.payload.partyList.currentPage;
      }
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
