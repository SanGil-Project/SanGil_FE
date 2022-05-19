import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import { useNavigate, useParams } from "react-router";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as partyActions } from '../redux/modules/party';

import 'date-fns';
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

import { Menubar, Header, ScrollTime } from '../components/component';
import { Desktop, Mobile } from "../shared/responsive";

import { Grid, Text, Icon, Button, Input, Image } from '../elements/element';
import Search from './Search';
import SearchModal from '../components/SearchModal';

const PartyWrite = (props) => {
  const { partyId } = useParams();
  const is_edit = partyId ? true : false;
  const partyItem = useSelector((state) => state?.party?.curtParty);
  const selectTime = useSelector((state) => state?.handle?.selectTime);

  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [partyName, setPartyName] = React.useState(is_edit ? partyItem?.title :"");
  const [partyContent, setPartyContent] = React.useState(is_edit ? partyItem?.partyContent :"");
  const [dateValue, setDateValue] = React.useState(is_edit ? partyItem?.partyDate : "선택");
  const [timeValue, setTimeValue] = React.useState(is_edit ? partyItem?.partyTime :"선택");
  const [numberValue, setNumberValue] = React.useState(is_edit ? partyItem?.maxPeople : null);
  const [mountValue, setMountValue] = React.useState(is_edit ? partyItem?.mountain :"");
  const [mountAddValue, setMountAddValue] = React.useState(is_edit ? partyItem?.address :"");

  const [startDate, setStartDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const handleDateModal = () => {
    setDateOpen(false);
  };
  const handleTimeModal = () => {
    setTimeOpen(false);
  };
  const saveDateModal = () => {
    const year = startDate.getFullYear();
    const month = ('0' + (startDate.getMonth() + 1)).slice(-2);
    const day = ('0' + startDate.getDate()).slice(-2);

    const dateString = year + '-' + month  + '-' + day;
    // console.log(dateString, year, month, day);
    setDateValue(dateString);
    setDateOpen(false);
  };
  const saveTimeModal = () => {
    console.log(selectTime);
    if (selectTime?.division === "오전") {
      selectTime.hour / 10 === 0 ? setTimeValue(`0${selectTime.hour}:${selectTime.minute}`) : setTimeValue(`${selectTime.hour}:${selectTime.minute}`);
    } else {
      const sumHour = parseInt(selectTime.hour) + 12
      setTimeValue(`${sumHour}:${selectTime.minute}`);
    }
    setTimeOpen(false);
  };

  const formatDate = (d) => {
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  }
  
  const [isOpen, setIsOpen] = useState(false);
  const [complete, setcomplete] = useState(is_edit ? true : false);

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

  // if (partyName !== "" && mountValue !=="" && mountAddValue !=="" && dateValue !=="" && timeValue !=="" && numberValue !=="" && partyContent !=="") {
  //   setcomplete(true);
  // }

  const addParty = () => {
    if (partyName === "" || mountValue==="" || mountAddValue==="" || dateValue==="" || timeValue==="" || numberValue==="" || partyContent==="") {
      window.alert("입력되지 않은 부분이 있습니다!");
      return;
    }
    if (is_edit) {
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
      dispatch(partyActions.editPartyDB(partyId, partyData));
      window.alert("수정 완료!");
      navigate(`/party`);
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
              {is_edit ? 
                <Input 
                  width="100%" bg="#eee" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 0 34.5px"
                  placeholder="모임의 이름은 무엇인가요?"
                  value={partyName}
                  disabled
                  _onChange={inputName}/> : 
                <Input 
                  width="100%" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 0 34.5px"
                  placeholder="모임의 이름은 무엇인가요?"
                  value={partyName}
                  _onChange={inputName}/>}
              <Text margin="0 0 10px" size="16px" bold="600">세부 내용</Text>
              <Input 
                width="100%" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 0 34.5px"
                multiLine
                value={partyContent}
                placeholder="어떤 활동을 함께 하고 싶으신가요?"
                _onChange={inputContent}/>
            </Grid>
            <Grid margin="28px 0">
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">날짜</Text>
                <Button width="auto" border="none">
                  {/* <Grid flexRow _onClick={handleClick}> */}
                  <Grid flexRow width="auto">
                    <Grid 
                      flexRow
                      _onClick={()=>{setDateOpen(!dateOpen);}} >
                      <Text margin="0 6px" width="auto" size="16px" color="#989898">{dateValue}</Text>
                      <Icon type="detailBtn" width="7px" height="13" margin="auto"/>
                    </Grid>
                    <DateModal className="dateModal" modalOpen={dateOpen}>
                      <div className="modal_container">
                      <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd (eee)" 
                        showPopperArrow={false}
                        inline
                        locale={ko}
                        popperModifiers={{ preventOverflow: { enabled: true } }}
                        popperPlacement="auto"
                        minDate={new Date()} 
                        renderCustomHeader={({date, decreaseMonth, increaseMonth}) => (
                          <Grid className="datepickerHeader" isFlex padding="10px 58px">
                            <div className="fomrmatDate">{formatDate(date)}</div>
                            <Grid width="auto" isFlex>
                              <div onClick={decreaseMonth}>
                                <Text margin="0 10px 0" color="#43CA3B" bold="700">&lt;</Text>
                              </div>
                              <div onClick={increaseMonth}>
                                <Text margin="0" color="#43CA3B" bold="700">&gt;</Text>
                              </div>
                            </Grid>
                          </Grid>
                          
                        )}/>
                      <Grid flexRow height="auto" padding="10px 20px">
                        <Button _onClick={handleDateModal} margin="0 10px 0 0" radius="8px" border="none" bgColor="#E6E6E6">
                          <Text margin="0 auto" align bold="700">취소</Text>
                        </Button>
                        <Button _onClick={saveDateModal} radius="8px" border="none" bgColor="#43CA3B">
                          <Text margin="0 auto" align color="white" bold="700">확인</Text>
                        </Button>
                      </Grid>
                      </div>
                    </DateModal>
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">시간</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>
                    <Grid 
                      flexRow
                      _onClick={()=>{setTimeOpen(!timeOpen);}} >
                      <Text margin="0 6px" width="auto" size="16px" color="#989898">{timeValue}</Text>
                      <Icon type="detailBtn" width="7px" height="13" margin="auto"/>
                    </Grid>
                    <DateModal className="dateModal" modalOpen={timeOpen}>
                      <div className="modal_container">
                        <Grid>
                          <ScrollTime/>
                        </Grid>
                        <Grid flexRow height="auto" padding="10px 20px">
                          <Button _onClick={handleTimeModal} margin="0 10px 0 0" radius="8px" border="none" bgColor="#E6E6E6">
                            <Text margin="0 auto" align bold="700">취소</Text>
                          </Button>
                          <Button _onClick={saveTimeModal} radius="8px" border="none" bgColor="#43CA3B">
                            <Text margin="0 auto" align color="white" bold="700">확인</Text>
                          </Button>
                        </Grid>
                      </div>
                    </DateModal>

                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">인원</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>

                    <Input 
                      dir="rtl"
                      // type="number"
                      width="150px" border="1px solid #BBBBBB" radius="8px" padding="16px 6px" border="none"
                      placeholder="인원수 입력"
                      value={numberValue}
                      _onChange={inputNumber}/>
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">위치</Text>
                {is_edit ? (
                <Button width="auto" border="none" _onClick={()=>{window.alert("산정보는 수정이 불가능합니다!")}} >
                  <Grid flexRow>
                    <Input 
                      dir="rtl"
                      width="auto" bg="#eee" border="none" radius="8px" padding="16px 6px" margin="0 10px"
                      placeholder="선택"
                      disabled
                      value={mountValue}
                      is_submit/>
                      {/* _onChange={inputMount}/> */}
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text> */}
                    <Icon type="detailBtn" width="7px" height="13" margin="auto"/>
                  </Grid>
                </Button>) : (
                // <Button width="auto" border="none">
                  <Grid flexRow _onClick={()=>{setIsOpen(true)}} hover width="auto">
                    <Input 
                      hover
                      dir="rtl"
                      width="auto" border="none" radius="8px" padding="16px 0" margin="0 6px"
                      placeholder="선택"
                      value={mountValue}
                      is_submit/>
                      {/* _onChange={inputMount}/> */}
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text> */}
                    <Icon type="detailBtn" width="7px" height="13" margin="auto"/>
                  </Grid>
                // </Button>
                )}
              </Grid>
              
            </Grid>
            <Grid>
            {complete ? 
            <Button 
              bgColor="#43CA3B" border="none" height="48px" margin="20px 0" radius="8px" 
              _onClick={addParty}>
              <Text color="#fff" margin="0" size="18px" bold="600" align>{is_edit ? "수정 완료" : "작성 완료"}</Text>
            </Button> : 
            <Button 
              bgColor="#E6E6E6" border="none" height="48px" margin="20px 0" radius="8px" 
              _onClick={addParty}>
              <Text margin="0" size="18px" bold="600" align>{is_edit ? "수정 완료" : "작성 완료"}</Text>
            </Button>}

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
              {is_edit ? 
                <Input 
                  width="100%" bg="#eee" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 0 34.5px"
                  placeholder="모임의 이름은 무엇인가요?"
                  value={partyName}
                  disabled
                  _onChange={inputName}/> : 
                <Input 
                  width="100%" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 0 34.5px"
                  placeholder="모임의 이름은 무엇인가요?"
                  value={partyName}
                  _onChange={inputName}/>}
              <Text margin="0 0 10px" size="16px" bold="600">세부 내용</Text>
              <Input 
                width="100%" border="1px solid #BBBBBB" radius="8px" padding="16px 12px" margin="0 0 34.5px"
                multiLine
                value={partyContent}
                placeholder="어떤 활동을 함께 하고 싶으신가요?"
                _onChange={inputContent}/>
            </Grid>
            <Grid margin="28px 0">
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">날짜</Text>
                <Button width="auto" border="none">
                  {/* <Grid flexRow _onClick={handleClick}> */}
                  <Grid flexRow width="auto">
                    <Grid 
                      flexRow
                      _onClick={()=>{setDateOpen(!dateOpen);}} >
                      <Text margin="0 6px" width="auto" size="16px" color="#989898">{dateValue}</Text>
                      <Icon type="detailBtn" width="7px" height="13" margin="auto"/>
                    </Grid>
                    <DateModal className="dateModal" modalOpen={dateOpen}>
                      <div className="modal_container">
                      <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd (eee)" 
                        showPopperArrow={false}
                        inline
                        locale={ko}
                        popperModifiers={{ preventOverflow: { enabled: true } }}
                        popperPlacement="auto"
                        minDate={new Date()} 
                        renderCustomHeader={({date, decreaseMonth, increaseMonth}) => (
                          <Grid className="datepickerHeader" isFlex padding="10px 58px">
                            <div className="fomrmatDate">{formatDate(date)}</div>
                            <Grid width="auto" isFlex>
                              <div onClick={decreaseMonth}>
                                <Text margin="0 10px 0" color="#43CA3B" bold="700">&lt;</Text>
                              </div>
                              <div onClick={increaseMonth}>
                                <Text margin="0" color="#43CA3B" bold="700">&gt;</Text>
                              </div>
                            </Grid>
                          </Grid>
                          
                        )}/>
                      <Grid flexRow height="auto" padding="10px 20px">
                        <Button _onClick={handleDateModal} margin="0 10px 0 0" radius="8px" border="none" bgColor="#E6E6E6">
                          <Text margin="0 auto" align bold="700">취소</Text>
                        </Button>
                        <Button _onClick={saveDateModal} radius="8px" border="none" bgColor="#43CA3B">
                          <Text margin="0 auto" align color="white" bold="700">확인</Text>
                        </Button>
                      </Grid>
                      </div>
                    </DateModal>
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">시간</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>
                    <Grid 
                      flexRow
                      _onClick={()=>{setTimeOpen(!timeOpen);}} >
                      <Text margin="0 6px" width="auto" size="16px" color="#989898">{timeValue}</Text>
                      <Icon type="detailBtn" width="7px" height="13" margin="auto"/>
                    </Grid>
                    <DateModal className="dateModal" modalOpen={timeOpen}>
                      <div className="modal_container">
                        <Grid>
                          <ScrollTime/>
                        </Grid>
                        <Grid flexRow height="auto" padding="10px 20px">
                          <Button _onClick={handleTimeModal} margin="0 10px 0 0" radius="8px" border="none" bgColor="#E6E6E6">
                            <Text margin="0 auto" align bold="700">취소</Text>
                          </Button>
                          <Button _onClick={saveTimeModal} radius="8px" border="none" bgColor="#43CA3B">
                            <Text margin="0 auto" align color="white" bold="700">확인</Text>
                          </Button>
                        </Grid>
                      </div>
                    </DateModal>

                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">인원</Text>
                <Button width="auto" border="none">
                  <Grid flexRow>

                    <Input 
                      dir="rtl"
                      // type="number"
                      width="150px" border="1px solid #BBBBBB" radius="8px" padding="16px 6px" border="none"
                      placeholder="인원수 입력"
                      value={numberValue}
                      _onChange={inputNumber}/>
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text>
                    <Icon type="detailBtn" width="7px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                </Button>
              </Grid>
              <hr style={{border: "1px solid #DEDEDE", width: "100%"}}/>
              <Grid isFlex margin="10px 0">
                <Text margin="0" size="16px" bold="600">위치</Text>
                {is_edit ? (
                <Button width="auto" border="none" _onClick={()=>{window.alert("산정보는 수정이 불가능합니다!")}} >
                  <Grid flexRow>
                    <Input 
                      dir="rtl"
                      width="auto" bg="#eee" border="none" radius="8px" padding="16px 6px" margin="0 10px"
                      placeholder="선택"
                      disabled
                      value={mountValue}
                      is_submit/>
                      {/* _onChange={inputMount}/> */}
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text> */}
                    <Icon type="detailBtn" width="7px" height="13" margin="auto"/>
                  </Grid>
                </Button>) : (
                // <Button width="auto" border="none">
                  <Grid flexRow _onClick={()=>{setIsOpen(true)}} hover width="auto">
                    <Input 
                      hover
                      dir="rtl"
                      width="auto" border="none" radius="8px" padding="16px 0" margin="0 6px"
                      placeholder="선택"
                      value={mountValue}
                      is_submit/>
                      {/* _onChange={inputMount}/> */}
                    {/* <Text margin="0 6px 0 0" bold="500" color="#989898">선택</Text> */}
                    <Icon type="detailBtn" width="7px" height="13" margin="auto"/>
                  </Grid>
                // </Button>
                )}
              </Grid>
              
            </Grid>
            <Grid>
            {complete ? 
            <Button 
              bgColor="#43CA3B" border="none" height="48px" margin="20px 0" radius="8px" 
              _onClick={addParty}>
              <Text color="#fff" margin="0" size="18px" bold="600" align>{is_edit ? "수정 완료" : "작성 완료"}</Text>
            </Button> : 
            <Button 
              bgColor="#E6E6E6" border="none" height="48px" margin="20px 0" radius="8px" 
              _onClick={addParty}>
              <Text margin="0" size="18px" bold="600" align>{is_edit ? "수정 완료" : "작성 완료"}</Text>
            </Button>}

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

const FadeIn = keyframes`
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 88px;
  }
`;

const FadeOut = keyframes`
  0% {
    bottom: 88px;
  }
  100% {
    bottom: -100%;
  }
`;

const DateModal = styled.div`
  position: fixed;
  bottom: ${props => props.modalOpen ? '88px' : '-100%'};
  left: 0;
  right: 0;
  z-index: 100px;
  height: auto;
  // transform: translate(-50%, -50%);
  // transition: all;
  // transform: duration
  animation: ${props => props.modalOpen ? FadeIn : FadeOut} 0.5s ease-out alternate;
  .modal_container {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #fff;
    width: 100%;
    max-width: 500px;
    // height: 70vh;
    margin: auto;
    // height: 50vh;
    // overflow-y: scroll;
  }
  .react-datepicker {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: none;
    border-top: 1px solid #ccc;
    width: 100%;
    display: flex;
    flex-direction: column;
    // background-color: orange;
    // justify-content: center;
  }
  .react-datepicker__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 0.8em;
    background-color: white;
    width: 100%;
    max-width: 500px;
    margin: auto;
    // background-color: orange;
    border: none;
    font-size: 2.5rem;
  }
  .react-datepicker__month {
    margin: .4em 1em;
    // background-color: orange;
  }
  .react-datepicker__day-name {
    font-size: 1.6rem;
    font-weight: 500;
    margin: 2rem;
    color: #959595; 
  }
  .react-datepicker__day {
    width: 28px;
    height: 28px;
    font-size: 2.0rem;
    margin: 1.5rem;
    line-height: 1.8;
    text-align: center;
  }
  .react-datepicker__navigation {
    background-color: orange;
    top: 2em;
    line-height: 1.7em;
    border: 0.45em solid transparent;
  }
  .fomrmatDate {
    font-size: 22px;
    font-weight: 500;
  }
  .react-datepicker__day--selected {
    // background: #2E1C8B;
    color: #43CA3B;
    border: none;
    background-color: transparent;
    // border-radius: 50%;
    font-weight: 700;
    text-align: center;
    line-height: 1.8;
    // display: flex;
    // flex-direction: row;
    // justify-content: center;
    // align-items: center;
    // width: 2.2rem;
    // height: 2.2rem;
    // border-radius: 4.2rem;
    // box-sizing: border-box;
  }

`;

const PartyContainer = styled.div`
  background-color: #fff;
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