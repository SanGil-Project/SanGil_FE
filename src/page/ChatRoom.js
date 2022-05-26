import React, { useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as handleActions } from "../redux/modules/handle";
import { Menubar, Header, ChatInput } from "../components/component";

import { Grid, Text, Icon, Button, Input, Image } from "../elements/element";

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const { chatRoomId } = useParams();
  const token = sessionStorage.getItem("token");
  const nickname = sessionStorage.getItem("nickname");
  const _userInfo = useSelector((state) => state?.user?.userInfo);

  const scrollRef = useRef();
  
  // const sockJs = new SockJS("http://13.125.232.76:8080/ws-stomp"); // 서버주소/ws-stomp
  // const sockJs = new SockJS("http://52.79.228.126:8080/ws-stomp"); // 서버주소/ws-stomp
  // const sockJs = new SockJS("http://15.164.232.187:8080/ws-stomp"); // 서버주소/ws-stomp
  const sockJs = new SockJS("http://15.164.102.106:8080/ws-stomp"); // 서버주소/ws-stomp
  // const sockJs = new SockJS("https://jinnn.shop/ws-stomp"); // 서버주소/ws-stomp
  const stomp = Stomp.over(sockJs);

  // const sender = _userInfo?.nickname;

  const enterChat = {
    roomId: parseInt(chatRoomId),
    sender: nickname,
    type: "ENTER",
  };

  function ConnectSub(token) {
    try {
      stomp.connect({}, () => {
        stomp.subscribe(`/sub/chat/rooms/${chatRoomId}`, (response) => {
          // console.log("subscribe callback ::", response);
          const content = JSON.parse(response.body);
          // console.log("받은 메세지 ::", content);
          // const writer = content.writer;
          if (content.length === 1) {
            dispatch(chatActions.sendChat(content));
            scrollToBottom();
          } else {
            dispatch(chatActions.getChatDB(content));
            scrollToBottom();
          }
        });
        // dispatch(chatActions.getChatDB(chatRoomId));
        stomp.send(
          "/pub/chat/message",
          { token: token },
          JSON.stringify(enterChat)
        );
      });
    } catch (err) {
      console.log("connect, subscribe error!! ::", err.response);
    }
  }

  function DisConnectUnsub() {
    try {
      stomp.disconnect(
        {
          Headers: {
            Authorization: token,
          },
        },
        () => {
          // stomp.unsubscribe(`/sub/chat/rooms/${chatRoomId}`);
          stomp.unsubscribe("sub-0");
        },
        { token: token }
      );
    } catch (err) {
      console.log("disconnect error!! ::", err);
    }
  }

  React.useEffect(() => {
    dispatch(handleActions.isPagename(`${chatRoomId}번 채팅방`));
    ConnectSub(token);
    // if (_userInfo) {
    //   dispatch(handleActions.isPagename(`${chatRoomId}번 채팅방`));
    //   ConnectSub(token);
    // }
    return () => {
      DisConnectUnsub();
    };
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [enterChat]);

  const scrollToBottom = () => {
    // scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    scrollRef.current?.scrollIntoView({ block: 'center' });
  }
  const chatList = useSelector((state) => state?.chat?.chatList);

  return (
    <React.Fragment>
        <ChatContainer>
          <Header />
          <ChatWrap>
            <Grid padding="96px 14px 200px">
              {chatList?.map((chat, idx) => {
                const mine = chat.nickname === nickname ? true : false;
                const time = chat.createdAt.split(" ");
                const boxColor = mine ? "#9EE59C" : "#EBEBEB";
                const img = chat.userImageUrl==="없음" ? "https://user-images.githubusercontent.com/91959791/168119302-948f0dcf-8165-47af-8b6b-2f90f74aca06.png" : chat.userImageUrl;
                return ( mine ? 
                  ( <Grid key={idx}>
                      <Grid padding="0 0 8px 46px" flexRow justify="flex-end">
                        <Text
                          margin="35px 2px 0"
                          size="12px"
                          bold="500"
                          color="#A4A4A4"
                        >
                          {time[1]}
                        </Text>
                        <Grid
                          padding="16px"
                          bg={boxColor}
                          radius="10px"
                          width="auto"
                        >
                          <Text margin="0" bold="500" size="16px">{chat.message} </Text>
                        </Grid>
                      </Grid>
                  </Grid> ) : (
                  <Grid key={idx}>
                    <Grid flexRow margin="8px 0" justify="right">
                      <Image
                        type="circle"
                        width="32px"
                        height="32px"
                        margin="0 14px 0 0"
                        src={img}
                      />
                      <Grid>
                        <Text margin="0" size="12px" bold="500">
                          [{chat.userTitle}] {chat.nickname}
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid padding="0 0 8px 46px" flexRow justify>
                      <Grid
                        padding="16px"
                        bg={boxColor}
                        radius="10px"
                        width="auto"
                      >
                        <Text margin="0" bold="500" size="16px">{chat.message} </Text>
                      </Grid>
                      <Text
                        margin="35px 2px 0"
                        size="12px"
                        bold="500"
                        color="#A4A4A4"
                      >
                        {time[1]}
                      </Text>
                    </Grid>
                  </Grid>)
                );
              })}
              
            <ChatBottom ref={scrollRef}></ChatBottom>
            </Grid>
          </ChatWrap>
          <ChatInputWrap>
            <ChatInput chatRoomId={chatRoomId} />
          </ChatInputWrap>

        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor} />
          </Grid>
        </MenubarContainer>
      </ChatContainer>
    </React.Fragment>
  );
};

const ChatContainer = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100vh;
  max-width: 500px;
  margin: auto;
  overflow: scroll;
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
  padding: 20px 14.5px 27px;
  background-color: #fff;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const ChatBottom = styled.div`
  // padding-bottom: 5px;
`;

export default ChatRoom;
