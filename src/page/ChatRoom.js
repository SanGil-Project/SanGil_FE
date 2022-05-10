import React from 'react';
import styled from "styled-components";

import { Menubar, Header } from '../components/component';
import { Desktop, Mobile } from "../shared/responsive";

import { Grid, Text, Icon, Button, Input, Image } from '../elements/element';

const ChatRoom = (props) => {
  const menuColor = [false, true, false, false, false]; // 메뉴바 색

  const userInfo = {
    userId : 1,
    username: "정상준",
    userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
    userTitle: "홍길동",
  };

  const participants = [
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
  ];

  return (
    <React.Fragment>
      <Mobile>
      <ChatContainer>
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
              {/* <Text margin="35px 0 0" size="12px" bold="500" color="#A4A4A4">오전 8:20</Text> */}
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

      </ChatContainer>
      </Mobile>
      <Desktop>
      <ChatContainer>
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
              {/* <Text margin="35px 0 0" size="12px" bold="500" color="#A4A4A4">오전 8:20</Text> */}
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

      </ChatContainer>

      </Desktop>
    </React.Fragment>
  );
}

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
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