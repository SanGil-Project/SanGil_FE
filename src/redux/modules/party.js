import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { api } from "../../shared/api";

const SET_PARTY = "SET_PARTY";
const ADD_PARTY = "ADD_PARTY";
const EDIT_PARTY = "EDIT_PARTY";
const ATTEND_PARTY = "ATTEND_PARTY";
const DELETE_PARTY = "DELETE_PARTY";

const setParty = createAction(SET_PARTY, (partyList) => ({ partyList }));
const addParty = createAction(ADD_PARTY, (party) => ({ party }));
const editParty = createAction(EDIT_PARTY, (partyId, party) => ({ partyId, party }));
const attendParty = createAction(ATTEND_PARTY, (partyId, user) => ({ partyId, user }));
const deleteParty = createAction(DELETE_PARTY, (partyId) => ({ partyId }));

const initialState = {
  partyList : [
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
  ]
};

const getPartyDB = () => {
  return function (dispatch, getState) {

    const fakeDB = {
      partyList : [
        {
        partyId : 1,
        title : "관악산 같이 갈래?",
        mountain : "관악산",
        address : "서울 관악구",
        partyDate : "2022-04-23",
        partyTime: "11:00",
        maxPeople : 8,
        curPeople : 4,
        completed : false,
        createdAt : "09:00",
        },
        {
        partyId : 2,
        title : "관악산 나도 갈래!",
        mountain : "북한산",
        address : "서울 불광",
        partyDate : "2022-04-23",
        partyTime: "11:00",
        maxPeople : 8,
        curPeople : 8,
        completed : true,
        createdAt : "09:00"
        }],
        totalPage : 7,
        currentPage : 1,
    }
    dispatch(setParty(fakeDB));
    return;
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
  return function(dispatch, getState){

    const temp = {

      partyId : 1,
      username: "이재진",
      userTitle: "테스트용",
      userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      title : '관악산 같이 갈래?',
      mountain : '관악산',
      address : '서울 관악구',
      partyDate : '2022-04-23',
      partyTime: '11:00',
      maxPeople : 8,
      curtPeople : 4,
      partyContent: "내용내요내애내내내ㅐ내요용내요ㅐ뇨애",
      createdAt : '09:00',
      partymember: [
      {
        username: "정상준",
        userTitle: "홍길동",
        userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      },
      {
        username: "박예슬",
        userTitle: "등린이",
        userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      },
      {
        username: "정의현",
        userTitle: "산길인맥왕",
        userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      },
      {
        username: "천누리",
        userTitle: "아직 여기라고?",
        userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      },
     ]
    }
    const fakeDB = {
      partyList: [temp],
    }
    console.log(fakeDB)
    dispatch(setParty(fakeDB));
    return;
    api
      .getOneParty(partyId)
      .then((res) => {
        console.log("(getOneParty) 성공 데이터 확인 ::", res);
        dispatch(setParty(res.data));
        // dispatch(setParty([res.data]));
      })
      .catch((err) => {
        console.log("(getOneParty) 실패 ::", err);
      });
  };  
};

const addPartyDB = (token, party = {}) => {
  return function (dispatch, getState) {

    console.log("리덕스 연결 성공 :: ", token, party);
    const fakeDB = {
      partyId: 1,
      username: "이재진",
      createdAt: "09:00",
      ...party,      
    }
    dispatch(addParty(fakeDB));
    return;
    api
      .addParty(token, party)
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

const attendPartyDB = (token, partyId = null) => {
  return function (dispatch, getState) {

    // const _user = getState().user;
    const _user = {
      username: "테스트용",
      userTitle: "테스트한다",
      userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
    }
    const user_info = {
      username: _user.username,
      userTitle: _user.userTitle,
      userImageUrl: _user.userImageUrl,
    };

    dispatch(attendParty(partyId, user_info));
    return;
    api
      .attendParty(token, partyId)
      .then((res) => {
        console.log("(editParty) 성공 데이터 확인 ::", res);
        dispatch(attendParty(partyId, user_info));
        // dispatch(editParty(partyId, { ...party }));
      })
      .catch((err) => {
        console.log("(editParty) 실패 ::", err);
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
    [SET_PARTY]: (state, action) => produce(state, (draft) => {
      // console.log(action.payload.partyList)
      // draft.partyList.push(...action.payload.partyList.partyList);
      draft.partyList = action.payload.partyList.partyList;
    }),
    [ADD_PARTY]: (state, action) => produce(state, (draft) => {
      draft.partyList.unshift(action.payload.party);
    }),
    [EDIT_PARTY]: (state, action) => produce(state, (draft) => {}),
    [ATTEND_PARTY]: (state, action) => produce(state, (draft) => {
      draft.partyList[0].partymember.push(action.payload.user);
    }),
    [DELETE_PARTY]: (state, action) => produce(state, (draft) => {
      draft.partyList = draft.partyList.filter((p) => p.partyId !== action.payload.partyList.partyId);
    }),
  },
  initialState
);

const actionCreators = {
  setParty,
  addParty,
  editParty,
  attendParty,
  deleteParty,
  getPartyDB,
  getOnePartyDB,
  addPartyDB,
  editPartyDB,
  attendPartyDB,
  deletePartyDB,
};

export { actionCreators };
