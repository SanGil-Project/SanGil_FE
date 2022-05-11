import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as partyActions } from '../redux/modules/party';
import { actionCreators as mountActions } from '../redux/modules/mountain';

import 'date-fns';
import DatePicker from 'react-mobile-datepicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { Menubar, Header } from '../components/component';
import { Desktop, Mobile } from "../shared/responsive";

import { Grid, Text, Icon, Button, Input, Image } from '../elements/element';
import Search from './Search';
import SearchModal from '../components/SearchModal';

const PartyWrite = (props) => {
  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [partyName, setPartyName] = React.useState("");
  const [partyContent, setPartyContent] = React.useState("");
  const [dateValue, setDateValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [timeValue, setTimeValue] = React.useState("");
  const [numberValue, setNumberValue] = React.useState();
  const [mountValue, setMountValue] = React.useState("");
  const [mountAddValue, setMountAddValue] = React.useState("");

  const [isOpen, setIsOpen] = useState(false);

  const inputName = (e) => {
    setPartyName(e.target.value);
  }
  const inputContent = (e) => {
    setPartyContent(e.target.value);
  }
  const inputDate = (e) => {
    setDateValue(e.target.value);
  }
  const inputTime = (e) => {
    setTimeValue(e.target.value);
  }
  const inputNumber = (e) => {
    setNumberValue(e.target.value);
  }
  const selectMnt = (data) => {
    setMountValue(data.mountain);
    setMountAddValue(data.mountainAddress);
  }

  const addParty = () => {
    if (partyName === "" || mountValue==="" || mountAddValue==="" || dateValue==="" || timeValue==="" || numberValue==="" || partyContent==="") {
      window.alert("입력되지 않은 부분이 있습니다!");
      return;
    }
    const num = parseInt(numberValue);
    const partyData = {
      title : partyName,
      mountain : mountValue,
      address : mountAddValue,
      partyDate : dateValue,
      partyTime: timeValue,
      maxPeople : num,
      partyContent : partyContent,
    }
    console.log(partyData);
    dispatch(partyActions.addPartyDB(partyData));
    window.alert("작성 완료!");
    navigate(`/party`);
  }

  return (
    <React.Fragment>
      <Mobile>
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
                  {/* <Grid flexRow _onClick={handleClick}> */}
                  <Grid flexRow>

                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                      <Stack component="form" noValidate spacing={1} sx={{ border: "none" }}>
                        <TextField
                          id="date"
                          // label="Birthday"
                          // variant="standard"
                          type="date"
                          // style={{ fontSize: 1 }}
                          // size="medium"
                          onChange={inputDate}
                          // defaultValue="2017-05-24"
                          value={dateValue}
                          sx={{ width: 150, border: "none", fontSize: 15 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Stack>
                    </LocalizationProvider>

                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">시간</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack component="form" noValidate spacing={1}>
                        <TextField
                        id="time"
                        type="time"
                        // defaultValue="07:30"

                        onChange={inputTime}
                        value={timeValue}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 600, // 5 min
                        }}
                        sx={{ width: 150 }}
                      />
                      </Stack>
                    </LocalizationProvider>
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto"/> */}
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">인원</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>

                    <Input 
                      type="number"
                      width="150px" border="1px solid #BBBBBB" radius="8px" padding="16px 12px"
                      placeholder="인원수 입력"
                      _onChange={inputNumber}/>
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">위치</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>
                    <Input 
                      width="150px" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 10px"
                      placeholder="산이름 입력"
                      value={mountValue}
                      is_submit/>
                      {/* _onChange={inputMount}/> */}
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text> */}
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{setIsOpen(true)}} />
                  </Grid>
                </Button>
              </Grid>
              
            </Grid>
            <Grid>
            <Button 
              bgColor="#C4C4C4" border="none" height="48px" margin="20px 0" radius="12px" 
              _onClick={addParty}>
              <Text margin="0" size="18px" bold="600" align>작성하기</Text>
            </Button>

            </Grid>
          </Grid>

        </PartyWrap>
        {isOpen && 
        <ModalContainer>
          <SearchModal onClose={setIsOpen} selectMnt={selectMnt}/>
        </ModalContainer>}
        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor}/>
          </Grid>
        </MenubarContainer>

      </PartyContainer>
        
        </Mobile>
        <Desktop>
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
                  {/* <Grid flexRow _onClick={handleClick}> */}
                  <Grid flexRow>

                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                      <Stack component="form" noValidate spacing={1} sx={{ border: "none" }}>
                        <TextField
                          id="date"
                          // label="Birthday"
                          // variant="standard"
                          type="date"
                          // style={{ fontSize: 1 }}
                          // size="medium"
                          onChange={inputDate}
                          // defaultValue="2017-05-24"
                          value={dateValue}
                          sx={{ width: 150, border: "none", fontSize: 15 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Stack>
                    </LocalizationProvider>

                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">시간</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack component="form" noValidate spacing={1}>
                        <TextField
                        id="time"
                        type="time"
                        // defaultValue="07:30"

                        onChange={inputTime}
                        value={timeValue}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 600, // 5 min
                        }}
                        sx={{ width: 150 }}
                      />
                      </Stack>
                    </LocalizationProvider>
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto"/> */}
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">인원</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>

                    <Input 
                      type="number"
                      width="150px" border="1px solid #BBBBBB" radius="8px" padding="16px 12px"
                      placeholder="인원수 입력"
                      _onChange={inputNumber}/>
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">위치</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>
                    <Input 
                      width="150px" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 10px"
                      value={mountValue}
                      placeholder="산이름 입력"
                      is_submit/>
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text> */}
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{setIsOpen(true)}} />
                  </Grid>
                </Button>
              </Grid>
              
            </Grid>
            <Grid>
            <Button 
              bgColor="#C4C4C4" border="none" height="48px" margin="20px 0" radius="12px" 
              _onClick={addParty}>
              <Text margin="0" size="18px" bold="600" align>작성하기</Text>
            </Button>

            </Grid>
          </Grid>

        </PartyWrap>
        {isOpen && 
        <ModalContainer>
          <SearchModal onClose={setIsOpen} selectMnt={selectMnt}/>
        </ModalContainer>}
        
        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor}/>
          </Grid>
        </MenubarContainer>

      </PartyContainer>

        </Desktop>
    </React.Fragment>
  );
}

const PartyContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: auto;
  // overflow: hidden;
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

const ModalContainer = styled.div`
  position: fixed;
  bottom: 88px;
  width: 100%;
  max-width: 500px;
  // height: 100%;
  margin: 0;
  padding: 0;
  // align-items: flex-end
`;

const Modal = styled.div`
  position: absolute;
`;

export default PartyWrite;