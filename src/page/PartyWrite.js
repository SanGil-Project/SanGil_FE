import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as partyActions } from "../redux/modules/party";
import { actionCreators as handleActions } from "../redux/modules/handle";

import "date-fns";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

import {
  Menubar,
  Header,
  ScrollTime,
  AlertModal,
} from "../components/component";

import { Grid, Text, Icon, Button, Input, ElInput } from "../elements/element";
import SearchModal from "../components/SearchModal";

const PartyWrite = (props) => {
  const dispatch = useDispatch();
  const { partyId } = useParams();
  const is_edit = partyId ? true : false;
  const partyItem = useSelector((state) => state?.party?.curtParty);
  const origin = useSelector((state) => state?.handle?.partyBefore);
  const selectTime = useSelector((state) => state?.handle?.selectTime);

  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const navigate = useNavigate();
  const today = useRef(new Date());
  const year = today.current.getFullYear();
  const month = ("0" + (today.current.getMonth() + 1)).slice(-2);
  const day = ("0" + today.current.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  const hours = ("0" + today.current.getHours()).slice(-2);
  const minutes = ("0" + today.current.getMinutes()).slice(-2);

  const [partyName, setPartyName] = React.useState(
    is_edit ? partyItem?.title : ""
  );
  const [partyContent, setPartyContent] = React.useState(
    is_edit ? partyItem?.partyContent : ""
  );
  const [dateValue, setDateValue] = React.useState(
    is_edit ? partyItem?.partyDate : "선택"
  );
  const [timeValue, setTimeValue] = React.useState(
    is_edit ? partyItem?.partyTime : "선택"
  );
  const [numberValue, setNumberValue] = React.useState(
    is_edit ? partyItem?.maxPeople : null
  );
  const [mountValue, setMountValue] = React.useState(
    is_edit ? partyItem?.mountain : "검색"
  );
  const [mountAddValue, setMountAddValue] = React.useState(
    is_edit ? partyItem?.address : ""
  );

  const [startDate, setStartDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [dateHandle, setDateHandle] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [timeHandle, setTimeHandle] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchHandle, setSearchHandle] = useState(false);

  React.useEffect(() => {
    const pagename = is_edit ? "등산 모임 수정하기" : "등산 모임 만들기";
    dispatch(handleActions.isPagename(pagename));
    if (is_edit) {
      dispatch(handleActions.partyBeforeDB(partyItem));
      if (!partyItem) {
        setModalContent(
          `정보가 없어졌습니다! \n모임 상세 페이지로 돌아갑니다!`
        );
        setModalOpen(true);
        setIsSend(true);
        setIsError(true);
      }
    }
  }, []);

  const handleDateModal = () => {
    setDateOpen(false);
  };
  const handleTimeModal = () => {
    setTimeOpen(false);
  };
  const saveDateModal = () => {
    const year = startDate.getFullYear();
    const month = ("0" + (startDate.getMonth() + 1)).slice(-2);
    const day = ("0" + startDate.getDate()).slice(-2);

    const dateString = year + "-" + month + "-" + day;

    console.log(dateValue, dateString);
    setDateValue(dateString);
    setDateOpen(false);
  };
  const saveTimeModal = () => {
    if (selectTime?.division === "오전") {
      selectTime.hour / 10 === 0
        ? setTimeValue(`0${selectTime.hour}:${selectTime.minute}`)
        : setTimeValue(`${selectTime.hour}:${selectTime.minute}`);
    } else {
      const sumHour = parseInt(selectTime.hour) + 12;
      setTimeValue(`${sumHour}:${selectTime.minute}`);
    }
    setTimeOpen(false);
  };

  const formatDate = (d) => {
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [complete, setcomplete] = useState(is_edit ? true : false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isError, setIsError] = useState(false);

  const inputName = (e) => {
    setPartyName(e.target.value);
  };
  const inputContent = (e) => {
    setPartyContent(e.target.value);
  };
  const inputNumber = (e) => {
    setNumberValue(e.target.value);
  };
  const selectMnt = (data) => {
    setMountValue(data.mountain);
    setMountAddValue(data.mountainAddress);
  };

  let btnColor = "#E6E6E6";
  let btnTextColor = "#000";
  const titleColor = is_edit ? "#989898" : "#000";
  if (
    partyName !== "" &&
    mountValue !== "검색" &&
    dateValue !== "선택" &&
    timeValue !== "선택" &&
    numberValue &&
    partyContent !== ""
  ) {
    btnColor = "#43CA3B";
    btnTextColor = "#fff";
  }

  const addParty = () => {
    if (
      partyName === "" ||
      mountValue === "검색" ||
      mountAddValue === "" ||
      dateValue === "선택" ||
      timeValue === "선택" ||
      partyContent === ""
    ) {
      setModalContent("입력되지 않은 부분이 있습니다!");
      setModalOpen(true);
      return;
    }
    if (numberValue <= 0 || numberValue === "") {
      setModalContent("인원수는 자연수로만 입력해주세요!");
      setModalOpen(true);
      return;
    }
    if (numberValue % 1 !== 0) {
      setModalContent("인원수는 소수를 포함할 수 없어요!!");
      setModalOpen(true);
      return;
    }
    if (dateValue === dateString) {
      const tempT = timeValue.split(":");
      if (parseInt(tempT[0]) === parseInt(hours)) {
        if (parseInt(tempT[1]) <= parseInt(minutes)) {
          setModalContent("선택된 시간은 이미 지났습니다!!");
          setModalOpen(true);
          return;
        }
      } else if (parseInt(tempT[0]) < parseInt(hours)) {
        setModalContent("선택된 시간은 이미 지났습니다!!");
        setModalOpen(true);
        return;
      }
    } else if (dateValue < dateString) {
      setModalContent("선택된 날짜는 이미 지났습니다!!");
      setModalOpen(true);
      return;
    }
    if (is_edit) {
      if (numberValue < origin.curPeople) {
        setModalContent("현재 참가 인원수보다 적게 설정할 수 없습니다!");
        setModalOpen(true);
        return;
      }
      const num = parseInt(numberValue);
      const partyData = {
        title: partyName,
        mountain: mountValue,
        address: mountAddValue,
        partyDate: dateValue,
        partyTime: timeValue,
        maxPeople: num,
        partyContent: partyContent,
      };
      dispatch(partyActions.editPartyDB(partyId, partyData));
      setModalContent("수정 완료!");
      setIsSend(true);
      setModalOpen(true);
      return;
    }
    const num = parseInt(numberValue);
    const partyData = {
      title: partyName,
      mountain: mountValue,
      address: mountAddValue,
      partyDate: dateValue,
      partyTime: timeValue,
      maxPeople: num,
      partyContent: partyContent,
    };
    dispatch(partyActions.addPartyDB(partyData));
    setModalContent("작성 완료!");
    setIsSend(true);
    setModalOpen(true);
  };

  const movePage = (check) => {
    if (check) {
      navigate(`/party`, { replace: true });
    }
  };
  const moveBack = (check) => {
    if (check) {
      navigate(-1);
    }
  };

  return (
    <React.Fragment>
      <PartyContainer>
        <Header />
        {modalOpen && (
          <AlertModal
            type="check"
            onClose={setModalOpen}
            modalState={modalOpen}
            contents={modalContent}
            checkFunction={isSend ? (isError ? moveBack : movePage) : null}
          />
        )}
        <PartyWrap>
          <Grid padding="96px 14px 100px">
            <Grid width="auto">
              <Grid flexRow justify="left" margin="0 0 10px">
                <Text margin="0 6px 0 0" size="16px" bold="600" color="#000">
                  모임 이름
                </Text>
                {is_edit && (
                  <Icon
                    type="rock"
                    width="24px"
                    height="24px"
                    margin="0 0 10px"
                  />
                )}
              </Grid>
              {is_edit ? (
                <ElInput
                  width="100%"
                  bg="#eee"
                  size="16px"
                  border="1px solid #BBBBBB"
                  radius="8px"
                  padding="16px 12px"
                  margin="0 0 34.5px"
                  placeholder="모임의 이름은 무엇인가요?"
                  value={partyName}
                  disabled
                  _onChange={inputName}
                />
              ) : (
                <ElInput
                  width="100%"
                  size="16px"
                  border="1px solid #BBBBBB"
                  radius="8px"
                  padding="16px 12px"
                  margin="0 0 34.5px"
                  placeholder="모임의 이름은 무엇인가요?"
                  value={partyName}
                  _onChange={inputName}
                />
              )}
              <Text margin="0 0 10px" size="16px" bold="600">
                세부 내용
              </Text>
              <ElInput
                width="100%"
                size="16px"
                border="1px solid #BBBBBB"
                radius="8px"
                padding="16px 12px"
                margin="0 0 34.5px"
                textarea
                value={partyContent}
                placeholder="어떤 활동을 함께 하고 싶으신가요?"
                _onChange={inputContent}
              />
            </Grid>
            <Grid margin="28px 0">
              <Grid isFlex margin="24px 0">
                <Text margin="0" size="16px" bold="600">
                  날짜
                </Text>
                <Grid flexRow width="auto">
                  <Grid
                    hover
                    flexRow
                    _onClick={() => {
                      setDateOpen(!dateOpen);
                      setDateHandle(true);
                    }}
                  >
                    <Text
                      margin="0 6px"
                      width="auto"
                      size="16px"
                      color="#989898"
                    >
                      {dateValue}
                    </Text>
                    <Icon
                      type="detailBtn"
                      width="7px"
                      height="13"
                      margin="auto"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <hr style={{ border: "1px solid #DEDEDE", width: "100%" }} />
              <Grid isFlex margin="24px 0">
                <Text margin="0" size="16px" bold="600">
                  시간
                </Text>
                <Grid flexRow width="auto">
                  <Grid
                    hover
                    flexRow
                    _onClick={() => {
                      setTimeOpen(!timeOpen);
                      setTimeHandle(true);
                    }}
                  >
                    <Text
                      margin="0 6px"
                      width="auto"
                      size="16px"
                      color="#989898"
                    >
                      {timeValue}
                    </Text>
                    <Icon
                      type="detailBtn"
                      width="7px"
                      height="13"
                      margin="auto"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <hr style={{ border: "1px solid #DEDEDE", width: "100%" }} />
              <Grid isFlex margin="24px 0">
                <Text margin="0" size="16px" bold="600">
                  인원
                </Text>
                <Grid flexRow width="auto">
                  <ElInput
                    type="number"
                    size="16px"
                    color="#989898"
                    textAlign="right"
                    border="none"
                    radius="8px"
                    padding="0"
                    placeholder="숫자만 입력해주세요"
                    value={numberValue}
                    _onChange={inputNumber}
                  />
                </Grid>
              </Grid>
              <hr style={{ border: "1px solid #DEDEDE", width: "100%" }} />
              <Grid isFlex margin="24px 0">
                <Grid flexRow justify="left" margin="0 0 10px">
                  <Text margin="0 6px 0 0" size="16px" bold="600" color="#000">
                    위치
                  </Text>
                  {is_edit && (
                    <Icon
                      type="rock"
                      width="24px"
                      height="24px"
                      margin="0 0 10px"
                    />
                  )}
                </Grid>
                {is_edit ? (
                  <Grid
                    flexRow
                    width="auto"
                    _onClick={() => {
                      setModalContent("산정보는 수정이 불가능합니다!");
                      setModalOpen(true);
                    }}
                  >
                    <Text
                      margin="0 6px"
                      width="auto"
                      size="16px"
                      color="#989898"
                    >
                      {mountValue}
                    </Text>
                    <Icon
                      type="detailBtn"
                      width="7px"
                      height="13"
                      margin="auto"
                      cursor="default"
                    />
                  </Grid>
                ) : (
                  <Grid
                    flexRow
                    _onClick={() => {
                      setSearchOpen(!searchOpen);
                      setSearchHandle(true);
                    }}
                    hover
                    width="auto"
                  >
                    <Text
                      margin="0 6px"
                      width="auto"
                      size="16px"
                      color="#989898"
                    >
                      {mountValue}
                    </Text>
                    <Icon
                      type="detailBtn"
                      width="7px"
                      height="13"
                      margin="auto"
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid>
              {complete ? (
                <Button
                  bgColor={btnColor}
                  border="none"
                  height="48px"
                  margin="20px 0"
                  radius="8px"
                  _onClick={addParty}
                >
                  <Text
                    color={btnTextColor}
                    margin="0"
                    size="18px"
                    bold="600"
                    align
                  >
                    {is_edit ? "수정 완료" : "작성 완료"}
                  </Text>
                </Button>
              ) : (
                <Button
                  bgColor={btnColor}
                  border="none"
                  height="48px"
                  margin="20px 0"
                  radius="8px"
                  _onClick={addParty}
                >
                  <Text
                    color={btnTextColor}
                    margin="0"
                    size="18px"
                    bold="600"
                    align
                  >
                    {is_edit ? "수정 완료" : "작성 완료"}
                  </Text>
                </Button>
              )}
            </Grid>
          </Grid>
        </PartyWrap>
        {/* {isOpen && 
        <ModalContainer>
          <SearchModal onClose={setIsOpen} selectMnt={selectMnt}/>
        </ModalContainer>} */}
        <MenubarContainer>
          {dateHandle && (
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
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
                    <Grid
                      className="datepickerHeader"
                      isFlex
                      padding="10px 58px"
                    >
                      <div className="fomrmatDate">{formatDate(date)}</div>
                      <Grid width="auto" isFlex>
                        <div onClick={decreaseMonth}>
                          <Text margin="0 10px 0" color="#43CA3B" bold="700">
                            &lt;
                          </Text>
                        </div>
                        <div onClick={increaseMonth}>
                          <Text margin="0" color="#43CA3B" bold="700">
                            &gt;
                          </Text>
                        </div>
                      </Grid>
                    </Grid>
                  )}
                />
                <Grid flexRow height="auto" padding="10px 20px">
                  <Button
                    _onClick={handleDateModal}
                    margin="0 10px 0 0"
                    radius="8px"
                    border="none"
                    bgColor="#E6E6E6"
                  >
                    <Text margin="0 auto" align bold="700">
                      취소
                    </Text>
                  </Button>
                  <Button
                    _onClick={saveDateModal}
                    radius="8px"
                    border="none"
                    bgColor="#43CA3B"
                  >
                    <Text margin="0 auto" align color="white" bold="700">
                      확인
                    </Text>
                  </Button>
                </Grid>
              </div>
            </DateModal>
          )}

          {timeHandle && (
            <DateModal className="dateModal" modalOpen={timeOpen}>
              <div className="modal_container">
                <Grid height="auto">
                  <ScrollTime />
                </Grid>
                <Grid flexRow height="auto" padding="10px 20px">
                  <Button
                    _onClick={handleTimeModal}
                    margin="0 10px 0 0"
                    radius="8px"
                    border="none"
                    bgColor="#E6E6E6"
                  >
                    <Text margin="0 auto" align bold="700">
                      취소
                    </Text>
                  </Button>
                  <Button
                    _onClick={saveTimeModal}
                    radius="8px"
                    border="none"
                    bgColor="#43CA3B"
                  >
                    <Text margin="0 auto" align color="white" bold="700">
                      확인
                    </Text>
                  </Button>
                </Grid>
              </div>
            </DateModal>
          )}

          {searchHandle && (
            <DateModal className="dateModal" modalOpen={searchOpen}>
              <div className="modal_container">
                <Grid>
                  <SearchModal
                    selectMnt={selectMnt}
                    onClose={setSearchOpen}
                    scroll="scroll"
                  />
                </Grid>
                {/* <Grid flexRow height="auto" padding="10px 20px">
                <Button _onClick={handleSearchModal} margin="0 10px 0 0" radius="8px" border="none" bgColor="#E6E6E6">
                  <Text margin="0 auto" align bold="700">취소</Text>
                </Button>
                <Button _onClick={saveTimeModal} radius="8px" border="none" bgColor="#43CA3B">
                  <Text margin="0 auto" align color="white" bold="700">확인</Text>
                </Button>
              </Grid> */}
              </div>
            </DateModal>
          )}
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor} />
          </Grid>
        </MenubarContainer>
      </PartyContainer>
    </React.Fragment>
  );
};

const FadeIn = keyframes`
  0% {
    bottom: -100%;
    background-color: transparent;
  }
  85% {
    background-color: transparent;
  }
  100% {
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const FadeOut = keyframes`
  0% {
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  15% {
    background-color: transparent;
  }
  100% {
    bottom: -100%;
    background-color: transparent;
  }
`;

const DateModal = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  bottom: ${(props) => (props.modalOpen ? "0" : "-100%")};
  left: 0;
  right: 0;
  z-index: 100px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  animation: ${(props) => (props.modalOpen ? FadeIn : FadeOut)} 0.5s ease-out
    alternate;

  .modal_container {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #fff;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  .react-datepicker {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: none;
    border-top: 1px solid #ccc;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .react-datepicker__header {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 0.8em;
    background-color: white;
    width: 100%;
    max-width: 500px;
    margin: auto;
    border: none;
    font-size: 2.5rem;
  }
  .react-datepicker__month {
    margin: 0.4em;
  }
  .react-datepicker__day-name {
    font-size: 1.6rem;
    font-weight: 500;
    margin: 3.8%;
    color: #959595;
  }
  .react-datepicker__day {
    width: 25px;
    height: 25px;
    font-size: 2rem;
    margin: 3%;
    line-height: 1.8;
    text-align: center;
  }
  .react-datepicker__navigation {
    top: 2em;
    line-height: 1.7em;
    border: 0.45em solid transparent;
  }
  .fomrmatDate {
    font-size: 22px;
    font-weight: 500;
  }
  .react-datepicker__day--selected {
    color: #43ca3b;
    border: none;
    background-color: transparent;
    font-weight: 700;
    text-align: center;
    line-height: 1.8;
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
  width: 100%;
  overflow-y: auto;
  input[type="number"]::-webkit-outer-spin-button, 
  input[type="number"]::-webkit-inner-spin-button { 
    -webkit-appearance: none; 
    -moz-appearance: none; 
    appearance: none; 
  }

`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
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
