import React from 'react';
import styled from "styled-components";

import { Menubar, Header } from '../components/component';

import { Grid, Text, Icon, Button, Input, Image } from '../elements/element';

const PartyWrite = (props) => {
  const menuColor = [false, true, false, false, false]; // 메뉴바 색

  const [partyName, setPartyName] = React.useState("");
  const [partyContent, setPartyContent] = React.useState("");
  
  const inputName = (e) => {
    setPartyName(e.target.value);
  }
  const inputContent = (e) => {
    setPartyContent(e.target.value);
  }
  return (
    <React.Fragment>
      <PartyContainer>
        <Header />
        <PartyWrap>
          <Grid padding="96px 14px 100px">
            <Grid>
              <Text margin="0 0 10px" size="16px" bold="600">모임 이름</Text>
              <Input 
                width="100%" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 0 34.5px"
                placeholder="모임의 이름은 무엇인가요?"
                _onChange={inputName}/>
              <Text margin="0 0 10px" size="16px" bold="600">세부 내용</Text>
              <Input 
                width="100%" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 0 34.5px"
                multiLine
                placeholder="어떤 활동을 함께 하고 싶으신가요?"
                _onChange={inputContent}/>
            </Grid>
            <Grid margin="28px 0">
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">날짜</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>
                    <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} />
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">시간</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>
                    <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} />
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">인원</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>
                    <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} />
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">위치</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>
                    <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} />
                  </Grid>
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
  width: 100%;
  height: 100%;
  min-width: 414px;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
`;

const PartyWrap = styled.div`
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


export default PartyWrite;