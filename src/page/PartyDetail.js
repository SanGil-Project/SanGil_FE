import React, { useState } from 'react';
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";

import { Section, Menubar, FullMap, HorizontalScroll, Card, Header } from '../components/component';

import { Grid, Text, Icon, Button, Input, Image } from '../elements/element';

const PartyDetail = (props) => {
  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const partyid = useParams().partyid;

  const partyItem = {
      partyId : 1,
      username: "이재진",
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
                <Text margin="0" size="12px" bold="500">[유저타이틀필요] {partyItem.username}</Text>
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
                  <Text margin="0 8px 0 12px" bold="500" size="14px">{partyItem.curPeople}/{partyItem.maxPeople}명 | 모두 참여 가능 </Text>
                  <Icon type="detailBtn" width="8px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} />
                </Grid>
                <Grid margin="45px 0">
                  <Text margin="0 0 33.5px" size="16px" bold="500">{partyItem.partyContent}</Text>
                </Grid>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex>
                <Icon type="like" width="18px" margin="auto" />
                <Button bgColor="#C4C4C4" border="none" height="48px" margin="20px 0 20px 13px" radius="12px" _onClick={()=>{alert(`${partyItem.partyId} 번방 참가하기`)}}>
                  <Text margin="0" size="18px" bold="600" align>참가하기</Text>
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