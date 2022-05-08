import React, { useState } from 'react';
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";

import { Menubar, Header } from '../components/component';

import { Grid, Text, Icon, Button, Image } from '../elements/element';

const PartyDetail = (props) => {
  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const partyid = useParams().partyid;

  const partyItem = {
      partyId : 1,
      username: "이재진",
      userTitle: "셰르파",
      userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
      title : '관악산 같이 갈래?',
      mountain : '관악산',
      address : '서울 관악구',
      partyDate : '2022-04-23',
      partyTime: '11:00',
      maxPeople : 8,
      curPeople : 4,
      partyContent: "내용내요내애내내내ㅐ내요용내요ㅐ뇨애",
      createdAt : '09:00'
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
      <PartyContainer>
        <Header />
        <PartyWrap>
          <Grid padding="96px 14px 100px">
            <Grid flexRow margin="0 0 20px">
              {/* <Mainprofile> */}
              <Image
                type="circle"
                width="32px"
                margin="0 14px 0 0"
                src="https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png"/>
              {/* </Mainprofile> */}
              <Grid>
                <Text margin="0" size="12px" bold="500">[{partyItem.userTitle}] {partyItem.username}</Text>
              </Grid>
            </Grid>
            <hr style={{border: "1px solid #DEDEDE"}}/>
            <Grid padding="20px 0" margin="0 0 24px" flexColumn>
              <Grid alignItems="left">
                <Text margin="0 0 33.5px" size="18px" bold="600">{partyItem.title}</Text>
                <Grid flexRow justify="left" padding="0 0 10px">
                  <Grid width="18px">
                    <Icon type="partyMountain" width="18px" height="17px" margin="0 auto"/>
                  </Grid>
                  <Text margin="0 12px" bold="500" size="14px">{partyItem.mountain} ({partyItem.address})</Text>
                </Grid>
                <Grid flexRow justify="left" padding="0 0 10px">
                  <Grid width="18px">
                    <Icon type="partyDate" width="15px" height="17px" margin="0 auto"/>
                  </Grid>
                  <Text margin="0 12px" bold="500" size="14px">{partyItem.partyDate} (시간 {partyItem.partyTime})</Text>
                </Grid>
                <Grid flexRow justify="left" padding="0 0 10px">
                  <Grid width="18px">
                    <Icon type="partyPeople" width="16px" height="16px" margin="0 auto"/>
                  </Grid>
                  <Text margin="0 8px 0 12px" bold="500" size="14px">{partyItem.curPeople}/{partyItem.maxPeople}명</Text>
                  {/* <Icon type="detailBtn" width="8px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                </Grid>
                <Grid margin="45px 0">
                  <Text margin="0 0 33.5px" size="16px" bold="500">{partyItem.partyContent}</Text>
                </Grid>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid padding="20px 0">
                <Text margin="0 0 20px" size="18px" bold="600">참여인원</Text>
                {participants?.map((p, idx)=>{
                  return (
                    <Grid key={idx} flexRow margin="0 0 20px">
                      <Image
                        type="circle"
                        width="32px"
                        margin="0 14px 0 0"
                        src={p.userImageUrl}/>
                      <Grid>
                        <Text margin="0" size="12px" bold="500">[{p.userTitle}] {p.username}</Text>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex>
                <Button bgColor="#C4C4C4" border="none" height="48px" margin="20px 0 20px 13px" radius="12px" _onClick={()=>{alert(`${partyItem.partyId} 번째 모임 참가완료!`)}}>
                  <Text margin="0" size="18px" bold="600" align>참가하기</Text>
                </Button>
                <Button bgColor="#C4C4C4" border="none" height="48px" margin="20px 0 20px 13px" radius="12px" _onClick={()=>{alert(`${partyItem.partyId} 번 채팅방 입장!`)}}>
                  <Text margin="0" size="18px" bold="600" align>채팅방들어가기</Text>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </PartyWrap>
        
        <MenubarContainer>
          <Grid height="88px" minWidth="414px" maxWidth="800px" margin="auto">
            <Menubar menuColor={menuColor}/>
          </Grid>
        </MenubarContainer>

      </PartyContainer>
    </React.Fragment>
  );
}

const PartyContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  min-width: 414px;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
`;

const PartyWrap = styled.div`
  // position: absolute;
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


export default PartyDetail;