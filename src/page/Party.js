import React, { useState, useRef } from 'react';
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as partyActions } from '../redux/modules/party';

import { Desktop, Mobile } from "../shared/responsive";
import {
  Menubar,
  Header,
} from "../components/component";

import { Grid, Text, Icon, Button, Input } from "../elements/element";
import { useNavigate } from "react-router";

const Party = (props) => {
  const menuColor = [false, true, false, false, false]; // 메뉴바 색
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = useRef(new Date());

  const partydata = useSelector((state) => state?.party?.list);
  const partyList = partydata?.partyList

  // 날짜가 지난 파티 완료처리 해주기
  const year = today.current.getFullYear();
  const month = ('0' + (today.current.getMonth() + 1)).slice(-2);
  const day = ('0' + today.current.getDate()).slice(-2);
  const dateString = year + '-' + month  + '-' + day;
  const hours = ('0' + today.current.getHours()).slice(-2); 
  const minutes = ('0' + today.current.getMinutes()).slice(-2);
  let isCompleted = Array(partyList?.length).fill(false);

  const [searchKeyword, setSearchKeyword] = React.useState("");

  React.useEffect(() => {
    dispatch(partyActions.getPartyDB(1));
    // if (partyList?.length < 2) {
    //   dispatch(partyActions.getPartyDB(1));
    // }
  }, []);

  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const search = () => {
    if (searchKeyword === "") {
      window.alert("검색어를 입력해주세요!");
      return;
    }
    console.log(searchKeyword);
    // dispatch(searchNameDB(searchKeyword, 1));
    // setSearchKeyword("");
  };

  const cancel = () => {
    setSearchKeyword("")
  }

  const moveDetail = (partyId, completed, check) => {
    console.log(check);
    if (!completed || check) {
      window.alert("마감된 모임입니다!");
    } else {
      navigate(`/partydetail/${partyId}`);
    }
  }

  return (
    <React.Fragment>
      <Mobile>
        <PartyContainer>
          <Header />
          <PartyWrap>
            <SearchInput>
            {/* <SearchInput padding="82px 14px 18px" bg="#fff"> */}
              <Grid
                bg="#F2F3F6"
                height="50px"
                border="1px solid #F2F3F6"
                radius="12px"
                padding="15px 13px"
                flexRow
              >
                <Icon
                  type="searchIcon"
                  width="37px"
                  height="37px"
                  margin="0 auto"
                />
                <Input
                  bg="#F2F3F6"
                  width="100%"
                  border="none"
                  padding="0"
                  margin="0 5.5px"
                  placeholder="검색 키워드 : 산이름, 지명, 모임제목"
                  _onChange={onChange}
                  value={searchKeyword}
                  onSubmit={search}
                  is_submit
                />
                <Button border="none" width="50px" _onClick={cancel}>
                  <Text size="16px" bold="500" margin="0" color="#959595">취소</Text>
                </Button>
              </Grid>
            </SearchInput>
            <Grid padding="160px 14px 100px">
              {partyList?.map((p, idx) => {
                let btnBg = p.completed ? "#43CA3B" : "#E6E6E6";
                let btnColor = p.completed ? "#fff" : "#000";
                let btnText = p.completed ? "모집내용확인" : "마감 되었어요😢";
                const curPeople = p.curPeople ? p.curPeople : 0;
                if (p.partyDate === dateString) {
                  const tempT = p.partyTime.split(":");
                  if (parseInt(tempT[0]) === parseInt(hours)) {
                    if (parseInt(tempT[1]) <= parseInt(minutes)) {
                      btnBg = "#E6E6E6";
                      btnColor = "#000";
                      btnText = "마감 되었어요😢";
                      isCompleted[idx] = true;
                    }
                  } else if (parseInt(tempT[0]) < parseInt(hours)) {
                    btnBg = "#E6E6E6";
                    btnColor = "#000";
                    btnText = "마감 되었어요😢";
                    isCompleted[idx] = true;
                  }
                } else if (p.partyDate < dateString) {
                  btnBg = "#E6E6E6";
                  btnColor = "#000";
                  btnText = "마감 되었어요😢";
                  isCompleted[idx] = true;
                }
                return (
                  <Grid
                    key={idx}
                    bg="#FAFAFA"
                    shadow="1px 3px 10px rgba(69, 69, 69, 0.2)"
                    radius="16px"
                    height="230px"
                    padding="17px 16px"
                    margin="0 0 24px"
                    flexColumn
                  >
                    <Grid alignItems="left" height="auto">
                      <Text margin="0 0 18px" bold="500">
                        {p.title}
                      </Text>
                      <Grid flexRow justify="left" padding="0 0 10px" height="auto">
                        <Grid width="18px">
                          <Icon
                            type="partyMountain"
                            width="18px"
                            height="17px"
                            margin="0 auto"
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px" height="auto">
                          {p.mountain} ({p.address})
                        </Text>
                      </Grid>
                      <Grid flexRow justify="left" padding="0 0 10px" height="auto">
                        <Grid width="18px">
                          <Icon
                            type="partyDate"
                            width="15px"
                            height="17px"
                            margin="0 auto"
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px">
                          {p.partyDate} (시간 {p.partyTime})
                        </Text>
                      </Grid>
                      <Grid flexRow justify="left" padding="0" height="auto">
                        <Grid width="18px">
                          <Icon
                            type="partyPeople"
                            width="16px"
                            height="16px"
                            margin="0 auto"
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px">
                          {curPeople}/{p.maxPeople}명
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid flexColumn padding="27px 0 0">
                      <Button
                        type="div"
                        bgColor={btnBg}
                        border="none"
                        radius="8px"
                        width="170px"
                        height="48px"
                        margin="20px 0 0"
                        _onClick={() => {
                          moveDetail(p.partyId, p.completed, isCompleted[idx]);
                        }}
                      >
                        <Text margin="0" align color={btnColor}>
                          {btnText}
                        </Text>
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </PartyWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">

              <CreatPartyBtn>
                <Grid 
                  flexRow bg="#43CA3B" width="60px" height="60px" radius="100%" shadow="0px 3px 4px rgba(0, 0, 0, 0.15)" 
                  _onClick={() => {
                    navigate(`/partywrite`);
                  }}>
                  <Icon type="partyAdd" width="37px" height="25px" margin="0 auto"/>
                </Grid>
              </CreatPartyBtn>
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </PartyContainer>
      </Mobile>

      <Desktop>
        <PartyContainer>
          <Header />
          <PartyWrap>
            <Grid padding="96px 14px 100px">
              {partyList?.map((p, idx) => {
                let btnBg = p.completed ? "#43CA3B" : "#E6E6E6";
                let btnColor = p.completed ? "#fff" : "#000";
                let btnText = p.completed ? "모집내용확인" : "마감 되었어요😢";
                const curPeople = p.curPeople ? p.curPeople : 0;
                if (p.partyDate === dateString) {
                  const tempT = p.partyTime.split(":");
                  if (parseInt(tempT[0]) === parseInt(hours)) {
                    if (parseInt(tempT[1]) <= parseInt(minutes)) {
                      btnBg = "#E6E6E6";
                      btnColor = "#000";
                      btnText = "마감 되었어요😢";
                      isCompleted[idx] = true;
                    }
                  } else if (parseInt(tempT[0]) < parseInt(hours)) {
                    btnBg = "#E6E6E6";
                    btnColor = "#000";
                    btnText = "마감 되었어요😢";
                    isCompleted[idx] = true;
                  }
                } else if (p.partyDate < dateString) {
                  btnBg = "#E6E6E6";
                  btnColor = "#000";
                  btnText = "마감 되었어요😢";
                  isCompleted[idx] = true;
                }
                return (
                  <Grid
                    key={idx}
                    bg="#FAFAFA"
                    shadow="1px 3px 10px rgba(69, 69, 69, 0.2)"
                    radius="16px"
                    height="230px"
                    padding="17px 16px"
                    margin="0 0 24px"
                    flexColumn
                  >
                    <Grid alignItems="left" height="auto">
                      <Text margin="0 0 18px" bold="500">
                        {p.title}
                      </Text>
                      <Grid flexRow justify="left" padding="0 0 10px" height="auto">
                        <Grid width="18px">
                          <Icon
                            type="partyMountain"
                            width="18px"
                            height="17px"
                            margin="0 auto"
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px" height="auto">
                          {p.mountain} ({p.address})
                        </Text>
                      </Grid>
                      <Grid flexRow justify="left" padding="0 0 10px" height="auto">
                        <Grid width="18px">
                          <Icon
                            type="partyDate"
                            width="15px"
                            height="17px"
                            margin="0 auto"
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px">
                          {p.partyDate} (시간 {p.partyTime})
                        </Text>
                      </Grid>
                      <Grid flexRow justify="left" padding="0" height="auto">
                        <Grid width="18px">
                          <Icon
                            type="partyPeople"
                            width="16px"
                            height="16px"
                            margin="0 auto"
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px">
                          {curPeople}/{p.maxPeople}명
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid flexColumn padding="27px 0 0">
                      <Button
                        type="div"
                        bgColor={btnBg}
                        border="none"
                        radius="8px"
                        width="170px"
                        height="48px"
                        margin="20px 0 0"
                        _onClick={() => {
                          moveDetail(p.partyId, p.completed, isCompleted[idx]);
                        }}
                      >
                        <Text margin="0" align color={btnColor}>
                          {btnText}
                        </Text>
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </PartyWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">

              <CreatPartyBtn>
                <Grid 
                  flexRow bg="#43CA3B" width="60px" height="60px" radius="100%" shadow="0px 3px 4px rgba(0, 0, 0, 0.15)" 
                  _onClick={() => {
                    navigate(`/partywrite`);
                  }}>
                  <Icon type="partyAdd" width="37px" height="25px" margin="0 auto"/>
                </Grid>
              </CreatPartyBtn>
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </PartyContainer>
      </Desktop>
    </React.Fragment>
  );
};

const PartyContainer = styled.div`
  // position: relative;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  max-width: 500px;
  margin: auto;
  overflow: scroll;
`;

const PartyWrap = styled.div`
  // position: absolute;
  top: 64px;
  height:100%
  overflow-y: auto;
`;
const SearchInput = styled.div`
  position: fixed;
  top: 64px;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  padding: 20px 14px 27px;
  background-color: #fff;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const CreatPartyBtn = styled.div`
  
  position: fixed;
  // position: absolute;
  left: calc(50% + 175.5px);
  bottom: 113.5px;
  // right: 5%;
  // z-index: 9;
`;

export default Party;
