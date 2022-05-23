import React from 'react';
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { actionCreators as chatActions } from '../redux/modules/chat';
import { actionCreators as handleActions } from "../redux/modules/handle";
import { Menubar, Header, ChatInput } from '../components/component';
import { Desktop, Mobile } from "../shared/responsive";

import { Grid, Text, Icon, Button, Input, Image } from '../elements/element';

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const { chatRoomId } = useParams();
  const token = sessionStorage.getItem("token");
  const _userInfo = useSelector((state) => state?.user?.userInfo);
  // const chatList = useSelector((state) => state.chat?.chatList);

  // console.log(chatRoomId, token, _userInfo);

  // const sockJs = new SockJS("http://13.125.232.76:8080/ws-stomp"); // 서버주소/ws-stomp
  // const sockJs = new SockJS("http://52.79.228.126:8080/ws-stomp"); // 서버주소/ws-stomp
  const sockJs = new SockJS("http://3.37.128.96:8080/ws-stomp"); // 서버주소/ws-stomp
  const stomp = Stomp.over(sockJs);

  function ConnectSub(token) {
    try {
      console.log("STOMP Start");
      stomp.connect({}, () => {
        console.log("STOMP Connection");
        stomp.subscribe(`/chat/rooms/${chatRoomId}`,
            (res) => {
              console.log("subscribe callback ::", res);
              const content = JSON.parse(res.body);
              console.log("받은 메세지 ::", content);
              // const writer = content.writer;
              // if (content.length === 1){
              //   dispatch(sockActions.sendMessage(newMessage));
              // }else {
              //   dispatch(sockActions.getMessageDB(newMessage));
              // }
              // dispatch(chatActions.getChatDB(content)); // 처음 연결시, 서버에서 받은 "content"에 지금까지 전체 채팅내용 올수 있따면..
              dispatch(chatActions.getChatDB(chatRoomId)); // 아닐경우, api로 요청해야 하는 방식 
            }, { token: token }
          );
          dispatch(chatActions.getChatDB(chatRoomId));
          stomp.send(
            "/pub/chat/message", { token: token }, JSON.stringify({
              roomId: parseInt(chatRoomId), sender: _userInfo.nickname, type: 'ENTER',})
          )
        });
    } catch (err) {
      console.log("connect, subscribe error!! ::", err.response);
    }
  }

  function DisConnectUnsub() {
    try {
      stomp.disconnect({
        Headers: {
        Authorization: token,
      }}, () => {
        stomp.unsubscribe(`/sub/chat/rooms/${chatRoomId}`);
        }, { token: token }
      );
    } catch (err) {
      console.log("disconnect error!! ::", err);
    }
  }

  React.useEffect(() => {
    // console.log(token);
    dispatch(handleActions.isPagename(`${chatRoomId}번 채팅방`));
    ConnectSub(token);
    return () => {
      DisConnectUnsub();
    };
  }, []); 


  const userInfo = {
    userId : 1,
    username: "정상준",
    userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
    userTitle: "홍길동",
  };
  // const participants = [
  const chatList = [
    {
      nickname: "정상준",
      userTitle: "홍길동",
      userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      content: "내욘ㅇ애뇽냉222"
    },
    {
      nickname: "박예슬",
      userTitle: "등린이",
      userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      content: "내욘ㅇ애뇽냉1111"
    },
    {
      nickname: "정의현",
      userTitle: "산길인맥왕",
      userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      content: "내욘ㅇ애뇽냉4444"
    },
    {
      nickname: "천누리",
      userTitle: "아직 여기라고?",
      userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      content: "내욘ㅇ애뇽냉3333"
    },
  ];

  return (
    <React.Fragment>
      <Mobile>
      <ChatContainer>
        <Header />
        <ChatWrap>
          <Grid padding="96px 14px 100px">
            {chatList?.map((chat, idx) => {
              return (
                <div key={idx}>
                  <Grid flexRow margin="10px 0 0">
                    <Image
                      type="circle"
                      width="32px"
                      margin="0 14px 0 0"
                      src={chat.userImageUrl}/>
                    <Grid>
                      <Text margin="0" size="12px" bold="500">[{chat.userTitle}] {chat.nickname}</Text>
                    </Grid>
                  </Grid>
                  <Grid padding="5px 0 5px 46px" flexRow justify>
                    <Grid padding="16px" bg="#EBEBEB" radius="30px" width="auto">
                      <Text margin="0">{chat.content} </Text>
                    </Grid>
                    <Text margin="35px 0 0" size="12px" bold="500" color="#A4A4A4">{chat.createdAt}</Text>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </ChatWrap>
        <ChatInputWrap>
          <ChatInput chatRoomId={chatRoomId}/>
        </ChatInputWrap>

        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor}/>
          </Grid>
        </MenubarContainer>

      </ChatContainer>
      </Mobile>
      
      <Desktop>
      {/* <ChatContainer>
        <Header />
        <ChatWrap>
          <Grid padding="96px 14px 100px">
            <Grid flexRow margin="10px 0 0">
              <Image
                type="circle"
                width="32px"
                margin="0 14px 0 0"
                src={participants[2].userImageUrl}/>
              <Grid>
                <Text margin="0" size="12px" bold="500">[{participants[2].userTitle}] {participants[2].username}</Text>
              </Grid>
            </Grid>
            <Grid padding="5px 0 5px 46px" flexRow justify>
              <Grid padding="16px" bg="#EBEBEB" radius="30px" width="auto">
                <Text margin="0">등산에 필요한 물품은 각자 알아서 </Text>
              </Grid>
            </Grid>
            <Grid padding="5px 0 5px 46px" flexRow justify>
              <Grid padding="16px" bg="#EBEBEB" radius="30px" width="auto">
                <Text margin="0">가져오는 걸로 해요 !!! </Text>
              </Grid>
              <Text margin="35px 0 0" size="12px" bold="500" color="#A4A4A4">오전 8:20</Text>
            </Grid>


            <Grid flexRow margin="10px 0 0">
              <Image
                type="circle"
                width="32px"
                margin="0 14px 0 0"
                src={userInfo.userImageUrl}/>
              <Grid>
                <Text margin="0" size="12px" bold="500">[{userInfo.userTitle}] {userInfo.username}</Text>
              </Grid>
            </Grid>
            <Grid padding="5px 0 5px 46px" flexRow justify>
              <Grid padding="16px" bg="#68DC68" radius="30px" width="auto">
                <Text margin="0">등산에 필요한 물품은 각자 알아서 </Text>
              </Grid>
              <Text margin="35px 0 0" size="12px" bold="500" color="#A4A4A4">오전 8:20</Text>
            </Grid>
          </Grid>
        </ChatWrap>
        
        

        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor}/>
          </Grid>
        </MenubarContainer>

      </ChatContainer> */}

      </Desktop>
    </React.Fragment>
  );
}

const ChatContainer = styled.div`

  background-color: #fff;
  width: 100%;
  height: 100vh;
  max-width: 500px;
  margin: auto;
  overflow: hidden;
`;

const ChatWrap = styled.div`
  top: 64px;
  height:100%
  overflow-y: auto;
`;

const ChatInputWrap = styled.div`
  position: fixed;
  bottom: 88px;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  padding: 20px 15px 27px;
  background-color: #fff;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index : 10;
`;


export default ChatRoom;