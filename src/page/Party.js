import React, { useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as partyActions } from '../redux/modules/party';

import { history } from "../redux/configureStore";

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

  const partyList = useSelector((state) => state?.party?.partyList);
  console.log(partyList);

  React.useEffect(() => {
    if (partyList?.length < 2) {
      dispatch(partyActions.getPartyDB());
    }
  }, []);

  const moveDetail = (partyId, completed) => {
    if (!completed) {
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
          <Grid padding="96px 14px 100px">
            {partyList?.map((p, idx) => {
              const bg = p.completed ? "#E6E6E6" : "#C4C4C4";
              const btnText = p.completed ? "모집내용확인" : "마감 되었어요😢";
              const curPeople = p.curPeople ? p.curPeople : 0;
              return (
                <Grid
                  key={idx}
                  bg={bg}
                  radius="16px"
                  padding="17px 16px"
                  margin="0 0 24px"
                  flexColumn
                >
                  <Grid alignItems="left">
                    <Text margin="0 0 18px" bold="500">
                      {p.title}
                    </Text>
                    <Grid flexRow justify="left" padding="0 0 10px">
                      <Grid width="18px">
                        <Icon
                          type="partyMountain"
                          width="18px"
                          height="17px"
                          margin="0 auto"
                        />
                      </Grid>
                      <Text margin="0 12px" bold="500" size="14px">
                        {p.mountain} ({p.address})
                      </Text>
                    </Grid>
                    <Grid flexRow justify="left" padding="0 0 10px">
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
                    <Grid flexRow justify="left" padding="0 0 10px">
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
                  <Button
                    bgColor="#fff"
                    border="none"
                    width="170px"
                    height="48px"
                    margin="20px 0 0"
                    _onClick={() => {
                      moveDetail(p.partyId, p.completed);
                    }}
                  >
                    <Text margin="0" align>
                      {btnText}
                    </Text>
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </PartyWrap>
        {/* <CreatPartyBtn>
          <Button
            bgColor="#48E988"
            border="none"
            width="105px"
            height="45px"
            radius="16px"
            shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            _onClick={() => {
              navigate(`/partywrite`);
            }}
          >
            <Text margin="0" align size="14px">
              모임 만들기
            </Text>
          </Button>
        </CreatPartyBtn> */}

        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">

            <CreatPartyBtn>
              <Button
                bgColor="#48E988"
                border="none"
                width="105px"
                height="45px"
                radius="16px"
                shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                _onClick={() => {
                  navigate(`/partywrite`);
                }}
              >
                <Text margin="0" align size="14px">
                  모임 만들기
                </Text>
              </Button>
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
              const bg = p.completed ? "#E6E6E6" : "#C4C4C4";
              const btnText = p.completed ? "모집내용확인" : "마감 되었어요😢";
              const curPeople = p.curPeople ? p.curPeople : 0;
              return (
                <Grid
                  key={idx}
                  bg={bg}
                  radius="16px"
                  padding="17px 16px"
                  margin="0 0 24px"
                  flexColumn
                >
                  <Grid alignItems="left">
                    <Text margin="0 0 18px" bold="500">
                      {p.title}
                    </Text>
                    <Grid flexRow justify="left" padding="0 0 10px">
                      <Grid width="18px">
                        <Icon
                          type="partyMountain"
                          width="18px"
                          height="17px"
                          margin="0 auto"
                        />
                      </Grid>
                      <Text margin="0 12px" bold="500" size="14px">
                        {p.mountain} ({p.address})
                      </Text>
                    </Grid>
                    <Grid flexRow justify="left" padding="0 0 10px">
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
                    <Grid flexRow justify="left" padding="0 0 10px">
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
                  <Button
                    bgColor="#fff"
                    border="none"
                    width="170px"
                    height="48px"
                    margin="20px 0 0"
                    _onClick={() => {
                      moveDetail(p.partyId, p.completed);
                    }}
                  >
                    <Text margin="0" align>
                      {btnText}
                    </Text>
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </PartyWrap>

        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <CreatPartyBtn>
              <Button
                bgColor="#48E988"
                border="none"
                width="105px"
                height="45px"
                radius="16px"
                shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                _onClick={() => {
                  navigate(`/partywrite`);
                }}
              >
                <Text margin="0" align size="14px">
                  모임 만들기
                </Text>
              </Button>
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
  width: 100%;
  height: 100%;
  max-width: 500px;
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
  z-index: 10;
`;

const CreatPartyBtn = styled.div`
  
  // // position: fixed;
  position: absolute;
  // right: 110px;
  bottom: 110px;
  // right: 5%;
  // z-index: 9;
`;

export default Party;
