import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as partyActions } from "../redux/modules/party";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as handleActions } from "../redux/modules/handle";

import { Menubar, Header } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";

import { Grid, Text, Icon, Button, Image } from "../elements/element";

const PartyDetail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { partyId } = useParams();
  console.log(partyId)
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const curtParty = useSelector((state) => state?.party?.curtParty);
  const menuColor = [false, true, false, false, false]; // 메뉴바 색

  React.useEffect(() => {
    dispatch(handleActions.isPagename(" "));
    dispatch(partyActions.getOnePartyDB(partyId));
  }, []);

  const partymember = curtParty?.partymemberDto;
  const img =
    curtParty?.userImgUrl !== "없음"
      ? curtParty?.userImgUrl
      : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png";
  const attendBtn = partymember?.some((m) => m.nickname === userInfo.nickname)
    ? "참가취소하기"
    : "참가하기";
  const myMode = userInfo?.nickname === curtParty?.nickname ? true : false;
  const isChief = userInfo?.nickname === curtParty?.nickname ? true : false;

  const attendParty = (partyId) => {
    if (curtParty.nickname === userInfo.nickname) {
      window.alert("모임 주최자는 취소할수 없어요!!");
      return;
    }
    if (partymember.length === curtParty.maxPeople) {
      window.alert("모집이 완료되었습니다!");
      return;
    }
    dispatch(partyActions.attendPartyDB(partyId));
  };

  const enterChatRoom = (partyId) => {
    dispatch(chatActions.enterChatDB(partyId));
    navigate(`/chatroom/${partyId}`);
  }

  const deleteParty = (partyId) => {
    dispatch(partyActions.deletePartyDB(partyId));
    navigate("/party");
  }

  return (
    <React.Fragment>
      <Mobile>
        <PartyContainer>
          <Header />
          <PartyWrap>
            <Grid padding="64px 0 8px" bg="#F2F3F6" height="auto">
              <Grid isFlex padding="13px 14px" borderBottom="1px solid #DEDEDE"  bg="#fff" height="auto">
                <Grid flexRow margin="0">
                  <Image
                    type="circle"
                    width="32px"
                    height="32px"
                    margin="0 14px 0 0"
                    src={img}
                  />
                  <Grid>
                    <Text margin="0" size="12px" bold="500">
                      [{curtParty?.userTitle}] {curtParty?.nickname}
                    </Text>
                  </Grid>
                </Grid>
                {myMode && 
                <Grid width="auto" margin="0" flexRow>
                  <Grid _onClick={()=>{navigate(`/partywrite/${curtParty.partyId}`);}}>
                   <Icon type="partyEdit" width="31px" height="31px" margin="auto"/>
                  </Grid>
                  <Grid _onClick={()=>{deleteParty(curtParty.partyId)}}>
                    <Icon type="partyDelete" width="31px" height="31px" margin="auto"/>
                  </Grid>
                </Grid>}
              </Grid>
              <Grid padding="20px 14px" margin="0 0 8px" height="auto" flexColumn  bg="#fff">
                <Grid alignItems="left">
                  <Text margin="0 0 33.5px" size="18px" bold="600">
                    {curtParty?.title}
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
                      {curtParty?.mountain} ({curtParty?.address})
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
                      {curtParty?.partyDate} (시간 {curtParty?.partyTime})
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
                    <Text margin="0 8px 0 12px" bold="500" size="14px">
                      {curtParty?.curPeople}/{curtParty?.maxPeople}명
                    </Text>
                    {/* <Icon type="detailBtn" width="8px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                  <Grid padding="45px 0">
                    <Text margin="0" size="16px" bold="500">
                      {curtParty?.partyContent}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
              <Grid padding="12px 14px 18px"  margin="0" height="auto"  bg="#fff">
                <Text margin="0" size="14px" bold="600">
                  참여인원
                </Text>
                {partymember?.map((p, idx) => {
                  const isCheif = (p.nickname === curtParty.nickname) ? true : false;
                  const image =
                    p?.userImageUrl !== "없음"
                      ? p?.userImageUrl
                      : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png";
                  return (
                    <Grid key={idx} margin="20px 0 0" isFlex>
                      <Grid flexRow >
                        <Image
                          type="circle"
                          width="32px"
                          height="32px"
                          margin="0 14px 0 0"
                          src={image}
                        />
                        <Grid>
                          <Text margin="0" size="12px" bold="500">
                            [{p.userTitle}] {p.nickname}
                          </Text>
                        </Grid>
                      </Grid>
                      {isCheif && 
                        <Image
                          src={"https://user-images.githubusercontent.com/91959791/169491140-498a7ef5-5a76-4301-8771-d13449d3b92e.png"} 
                          width="31px"
                          height="31px" />
                      }
                      </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid flexRow bg="#fff" padding="44px 14px 0" alignItems="flex-start" height="auto">
              <Button
                bgColor="#E6E6E6"
                border="none"
                height="48px"
                margin="0 17px 0 0"
                radius="8px"
                _onClick={() => {enterChatRoom(curtParty.partyId)
                  navigate(`/chatroom/${curtParty.partyId}`);
                  // navigate(`/chatroom/${curtParty.chatRoomId}`);
                }}
              >
                <Text margin="0" size="18px" bold="600" align>
                  대화하기
                </Text>
              </Button>
              <Button
                bgColor="#43CA3B"
                border="none"
                height="48px"
                margin="0"
                radius="8px"
                _onClick={() => {
                  attendParty(curtParty.partyId);
                }}
              >
                <Text margin="0" size="18px" bold="600" color="#fff" align>
                  {attendBtn}
                </Text>
              </Button>
            </Grid>
          </PartyWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </PartyContainer>
      </Mobile>

      <Desktop>
        <PartyContainer>
          <Header />
          <PartyWrap>
            <Grid padding="64px 0 8px" bg="#F2F3F6" height="auto">
              <Grid isFlex padding="13px 14px" borderBottom="1px solid #DEDEDE"  bg="#fff" height="auto">
                <Grid flexRow margin="0">
                  <Image
                    type="circle"
                    width="32px"
                    height="32px"
                    margin="0 14px 0 0"
                    src={img}
                  />
                  <Grid>
                    <Text margin="0" size="12px" bold="500">
                      [{curtParty?.userTitle}] {curtParty?.nickname}
                    </Text>
                  </Grid>
                </Grid>
                {myMode && 
                <Grid width="auto" margin="0" flexRow>
                  <Grid _onClick={()=>{navigate(`/partywrite/${curtParty.partyId}`);}}>
                   <Icon type="partyEdit" width="31px" height="31px" margin="auto"/>
                  </Grid>
                  <Grid _onClick={()=>{deleteParty(curtParty.partyId)}}>
                    <Icon type="partyDelete" width="31px" height="31px" margin="auto"/>
                  </Grid>
                </Grid>}
              </Grid>
              <Grid padding="20px 14px" margin="0 0 8px" height="auto" flexColumn  bg="#fff">
                <Grid alignItems="left">
                  <Text margin="0 0 33.5px" size="18px" bold="600">
                    {curtParty?.title}
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
                      {curtParty?.mountain} ({curtParty?.address})
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
                      {curtParty?.partyDate} (시간 {curtParty?.partyTime})
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
                    <Text margin="0 8px 0 12px" bold="500" size="14px">
                      {curtParty?.curPeople}/{curtParty?.maxPeople}명
                    </Text>
                    {/* <Icon type="detailBtn" width="8px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                  <Grid padding="45px 0">
                    <Text margin="0" size="16px" bold="500">
                      {curtParty?.partyContent}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
              <Grid padding="12px 14px 18px"  margin="0" height="auto"  bg="#fff">
                <Text margin="0" size="14px" bold="600">
                  참여인원
                </Text>
                {partymember?.map((p, idx) => {
                  const isCheif = (p.nickname === curtParty.nickname) ? true : false;
                  const image =
                    p?.userImageUrl !== "없음"
                      ? p?.userImageUrl
                      : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png";
                  return (
                    <Grid key={idx} margin="20px 0 0" isFlex>
                      <Grid flexRow >
                        <Image
                          type="circle"
                          width="32px"
                          height="32px"
                          margin="0 14px 0 0"
                          src={image}
                        />
                        <Grid>
                          <Text margin="0" size="12px" bold="500">
                            [{p.userTitle}] {p.nickname}
                          </Text>
                        </Grid>
                      </Grid>
                      {isCheif && 
                        <Image
                          src={"https://user-images.githubusercontent.com/91959791/169491140-498a7ef5-5a76-4301-8771-d13449d3b92e.png"} 
                          width="31px"
                          height="31px" />
                      }
                      </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid flexRow bg="#fff" padding="44px 14px 0" alignItems="flex-start" height="auto">
              <Button
                bgColor="#E6E6E6"
                border="none"
                height="48px"
                margin="0 17px 0 0"
                radius="8px"
                _onClick={() => {
                  navigate(`/chatroom/${curtParty.partyId}`);
                  // navigate(`/chatroom/${curtParty.chatRoomId}`);
                }}
              >
                <Text margin="0" size="18px" bold="600" align>
                  대화하기
                </Text>
              </Button>
              <Button
                bgColor="#43CA3B"
                border="none"
                height="48px"
                margin="0"
                radius="8px"
                _onClick={() => {
                  attendParty(curtParty.partyId);
                }}
              >
                <Text margin="0" size="18px" bold="600" color="#fff" align>
                  {attendBtn}
                </Text>
              </Button>
            </Grid>
          </PartyWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
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
  overflow: hidden;
`;

const PartyWrap = styled.div`
  // position: absolute;
  top: 64px;
  height:100%;
  overflow-y: auto;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export default PartyDetail;
