import React from 'react';
import styled from "styled-components";

import { Menubar, Header } from '../components/component';

import { Grid, Text, Icon, Button, Input, Image } from '../elements/element';

const ChatRoom = (props) => {
  const menuColor = [false, true, false, false, false]; // 메뉴바 색

  const userInfo = {
    userId : 1,
    username: "정상준",
    userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
    userTitle: "홍길동",
  };

  return (
    <React.Fragment>
      <ChatContainer>
        <Header />
        <ChatWrap>
          <Grid padding="96px 14px 100px">
            <Grid flexRow margin="0 0 20px">
              <Image
                type="circle"
                width="32px"
                margin="0 14px 0 0"
                src={userInfo.userImageUrl}/>
              <Grid>
                <Text margin="0" size="12px" bold="500">[{userInfo.userTitle}] {userInfo.username}</Text>
              </Grid>
            </Grid>
          </Grid>
        </ChatWrap>
        
        <MenubarContainer>
          <Grid height="88px" minWidth="414px" maxWidth="800px" margin="auto">
            <Menubar menuColor={menuColor}/>
          </Grid>
        </MenubarContainer>

      </ChatContainer>
    </React.Fragment>
  );
}

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 414px;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
`;

const ChatWrap = styled.div`
  top: 64px;
  height:100%
  overflow-y: auto;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index : 10;
`;


export default ChatRoom;