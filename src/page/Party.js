import React, { useState, useRef, useEffect } from 'react';
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
  const partyList = partydata?.partyList;
  const totalPage = partydata?.totalPage;

  // 날짜가 지난 파티 완료처리 해주기
  const year = today.current.getFullYear();
  const month = ('0' + (today.current.getMonth() + 1)).slice(-2);
  const day = ('0' + today.current.getDate()).slice(-2);
  const dateString = year + '-' + month  + '-' + day;
  const hours = ('0' + today.current.getHours()).slice(-2); 
  const minutes = ('0' + today.current.getMinutes()).slice(-2);
  let isCompleted = Array(partyList?.length).fill(false);

  const [searchKeyword, setSearchKeyword] = React.useState("");

  const [curPage, setCurPage] = useState(1);
  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          console.log(totalPage)
          // if (totalPage < curPage) {
          //   return;
          // }
          setCurPage((pre) => pre + 1);
        }
      },
      { threshold: 0.25, rootMargin: '80px' },
    );
    console.log(curPage);
    bottomObserver.current = observer;
  }, []);

	React.useEffect(() => {
		const observer = bottomObserver.current;
		if (bottom) {
			observer.observe(bottom);
		}
		return () => {
			if (bottom) {
				observer.unobserve(bottom);
			}
		};
	}, [bottom]);

  React.useEffect(() => {
    console.log(curPage, searchKeyword);
    if (searchKeyword !== "") {
      dispatch(partyActions.getKeywordPartyDB(curPage, searchKeyword));
      return;
    }
    dispatch(partyActions.getPartyDB(curPage));
  }, [curPage]);

  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const search = () => {
    if (searchKeyword === "") {
      window.alert("검색어를 입력해주세요!");
      return;
    }
    console.log(searchKeyword);
    setCurPage(1);
    dispatch(partyActions.getKeywordPartyDB(1, searchKeyword));
    // setSearchKeyword("");
  };

  const cancel = () => {
    setSearchKeyword("")
  }

  const moveDetail = (partyId, completed, check) => {
    console.log(check);
    navigate(`/partydetail/${partyId}`);
    // if (!completed || check) {
    //   window.alert("마감된 모임입니다!");
    // } else {
    //   navigate(`/partydetail/${partyId}`);
    // }
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
                margin="0 6px 0 0"
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
              </Grid>
              <Button border="none" width="auto" _onClick={cancel} padding="15px 10px">
                <Text size="16px" bold="500" margin="0 auto" color="#959595">취소</Text>
              </Button>
            </SearchInput>
            <Grid padding="160px 14px 100px">
              {partyList?.map((p, idx) => {
                const cardImg = p.completed ? 
                  "https://user-images.githubusercontent.com/91959791/170047867-6794743f-7174-4208-b425-2f7456617d45.png" : 
                  "https://user-images.githubusercontent.com/91959791/170047969-5020a76c-9306-4ba0-afdf-e200fbc33a39.png";
                let btnBg = p.completed ? "#43CA3B" : "#959595";
                let textColor = p.completed ? "#000" : "#D9D9D9";
                let btnText = p.completed ? "모집내용확인" : "마감 되었어요😢";
                const curPeople = p.curPeople ? p.curPeople : 0;
                if (p.partyDate === dateString) {
                  const tempT = p.partyTime.split(":");
                  if (parseInt(tempT[0]) === parseInt(hours)) {
                    if (parseInt(tempT[1]) <= parseInt(minutes)) {
                      btnBg = "#E6E6E6";
                      textColor = "#D9D9D9";
                      btnText = "마감 되었어요😢";
                      isCompleted[idx] = true;
                    }
                  } else if (parseInt(tempT[0]) < parseInt(hours)) {
                    btnBg = "#E6E6E6";
                    textColor = "#D9D9D9";
                    btnText = "마감 되었어요😢";
                    isCompleted[idx] = true;
                  }
                } else if (p.partyDate < dateString) {
                  btnBg = "#E6E6E6";
                  textColor = "#D9D9D9";
                  btnText = "마감 되었어요😢";
                  isCompleted[idx] = true;
                }
                return (
                  <Grid
                    key={idx}
                    // bg="#FAFAFA"
                    shadow="1px 3px 10px rgba(69, 69, 69, 0.2)"
                    radius="16px"
                    width="auto"
                    height="230px"
                    padding="17px 16px"
                    margin="0 0 24px"
                    flexColumn
                    bgImg={cardImg}
                    bgSize="cover"
                  >
                    <Grid alignItems="left" height="auto">
                      <Text margin="0 0 18px" bold="500" color={textColor}>
                        {p.title}
                      </Text>
                      <Grid flexRow justify="left" padding="0 0 10px" height="auto">
                        <Grid width="18px">
                          <Icon
                            type="partyMountain"
                            width="18px"
                            height="17px"
                            margin="0 auto"
                            fill={textColor}
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px" height="auto" color={textColor}>
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
                            fill={textColor}
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px" color={textColor}>
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
                            fill={textColor}
                          />
                        </Grid>
                        <Text margin="0 12px" bold="500" size="14px" color={textColor}>
                          {curPeople}/{p.maxPeople}명
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid flexColumn padding="27px 0 0">
                      <Button
                        type="div"
                        bgColor={btnBg}
                        border="none"
                        radius="4px"
                        width="170px"
                        height="48px"
                        margin="20px 0 0"
                        _onClick={() => {
                          moveDetail(p.partyId, p.completed, isCompleted[idx]);
                        }}
                      >
                        <Text margin="0" align color="#fff">
                          {btnText}
                        </Text>
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            {totalPage > curPage ? <div ref={setBottom}></div> : null}
          </PartyWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">

              <UpBtn>
                  <Grid 
                    className
                    flexRow bg="#fff" width="60px" height="60px" radius="100%" shadow="0px 3px 4px rgba(0, 0, 0, 0.15)" 
                    _onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>
                    <Icon type="upBtn" width="24px" height="24px" margin="0 auto"/>
                  </Grid>
              </UpBtn>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  position: fixed;
  top: 64px;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  padding: 20px 14px 24px;
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
  bottom: 113px;
  // right: 5%;
  // z-index: 9;
`;

const UpBtn = styled.div`
  
  position: fixed;
  // position: absolute;
  left: calc(50% + 175.5px);
  bottom: 197px;
  // right: 5%;
  // z-index: 9;
`;

export default Party;
