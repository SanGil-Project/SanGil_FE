import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { api } from "../../shared/api";

const ADD_CHATROOM = "ADD_CHATROOM";
const GET_CHAT = "GET_CHAT";
const SEND_CHAT = "SEND_CHAT";
const ENTER_CHAT = "ENTER_CHAT";

const initialState = {
  chatList: [],
};

const addChatRoom = createAction(ADD_CHATROOM, (chatRoom) => ({ chatRoom }));
const getChat = createAction(GET_CHAT, (chat) => ({ chat }));
const sendChat = createAction(SEND_CHAT, (chat) => ({ chat }));
const enterChat = createAction(ENTER_CHAT, (chatRoom) => ({ chatRoom }));

const addChatRoomDB = (title, partyId) => {
  return function (dispatch, getState) {
    const userInfo = getState().user.userInfo;

    api
      .addChatRoom(title, partyId)
      .then((res) => {
        const roomInfo = {
          entrance: [userInfo.nickname],
        };
        dispatch(addChatRoom(roomInfo));
      })
      .catch((err) => {
        console.log("(addChatRoom) 실패 ::", err);
      });
  };
};

const enterChatDB = (chatRoomId) => {
  return function (dispatch, getState) {
    dispatch(getChat([]));

    // const
    return;
    api
      .enterChatRoom(chatRoomId)
      .then((res) => {
        console.log("(enterChatRoom) 성공 데이터 원본 ::", res);
        console.log("(enterChatRoom) 성공 데이터 디테일 ::", res.data);
        dispatch(getChat(res.data));
      })
      .catch((err) => {
        console.log("(enterChatRoom) 실패 ::", err);
      });
  };
};

const getChatDB = (content) => {
  return function (dispatch, getState) {
    dispatch(getChat(content));
    return;
  };
};

export default handleActions(
  {
    [ADD_CHATROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.chatInfo = action.payload.chatRoom;
      }),
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = action.payload.chat;
      }),
    [SEND_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = [...draft.chatList, ...action.payload.chat];
      }),
  },
  initialState
);

const actionCreators = {
  addChatRoomDB,
  getChatDB,
  sendChat,
  enterChatDB,
};

export { actionCreators };
