import React, { useState } from 'react';
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";

import { Section, Menubar, FullMap, HorizontalScroll, Card, Header } from '../components/component';

import { Grid, Text, Icon, Button, Input } from '../elements/element';

const PartyDetail = (props) => {
  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const partyid = useParams().partyid;

  const partyList = [
    {
      partyId : 1,
      title : '관악산 같이 갈래?',
      mountain : '관악산',
      address : '서울 관악구',
      partyDate : '22-04-23',
      partyTime: '11:00',
      maxPeople : 8,
      curPeople : 4,
      completed : false,
      createdAt : '09:00'
    },
    {
      partyId : 2,
      title : '아침등산 같이 하실 여자분 계시나요?',
      mountain : '팔공산',
      address : '서울 팔공마을',
      partyDate : '22-05-10',
      partyTime: '09:00',
      maxPeople : 6,
      curPeople : 6,
      completed : true,
      createdAt : '07:30'
    },
    {
      partyId : 3,
      title : '주말마다 같이 등산 가실분?',
      mountain : '북한산',
      address : '서울 불광',
      partyDate : '22-05-16',
      partyTime: '08:30',
      maxPeople : 3,
      curPeople : 6,
      completed : false,
      createdAt : '18:00'
    },
    {
      partyId : 4,
      title : '이번주말 모임 급구!!!',
      mountain : '아차산',
      address : '서울 광진구',
      partyDate : '22-05-8',
      partyTime: '10:30',
      maxPeople : 4,
      curPeople : 4,
      completed : true,
      createdAt : '16:30'
    },
  ];

  const partyIdx = partyList.findIndex(p => p.partyId == partyid);

  return (
    <React.Fragment>
      <PartyContainer>
        <Header />
        <PartyWrap>
          <Grid padding="96px 14px 100px">
            <Grid radius="16px" padding="17px 16px" margin="0 0 24px" flexColumn>
              <Grid alignItems="left">
                <Text margin="0 0 18px" bold="500">{partyList[partyIdx].title}</Text>
                <Grid flexRow justify="left" padding="0 0 10px">
                  <Grid width="18px">
                    <Icon type="partyMountain" width="18px" height="17px" margin="0 auto"/>
                  </Grid>
                  <Text margin="0 12px" bold="500" size="14px">{partyList[partyIdx].mountain} ({partyList[partyIdx].address})</Text>
                </Grid>
                <Grid flexRow justify="left" padding="0 0 10px">
                  <Grid width="18px">
                    <Icon type="partyDate" width="15px" height="17px" margin="0 auto"/>
                  </Grid>
                  <Text margin="0 12px" bold="500" size="14px">{partyList[partyIdx].partyDate} (시간 {partyList[partyIdx].partyTime})</Text>
                </Grid>
                <Grid flexRow justify="left" padding="0 0 10px">
                  <Grid width="18px">
                    <Icon type="partyPeople" width="16px" height="16px" margin="0 auto"/>
                  </Grid>
                  <Text margin="0 12px" bold="500" size="14px">{partyList[partyIdx].curPeople}/{partyList[partyIdx].maxPeople}명 | 모두 참여 가능 </Text>
                </Grid>
              </Grid>
              <Button bgColor="#fff" border="none" width="170px" height="48px" margin="20px 0 0" _onClick={()=>{alert(partyList[partyIdx].partyId, '번방 참가하기')}}>
                <Text margin="0" align>참가하기</Text>
              </Button>
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