import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as partyActions } from "../redux/modules/party";

import { Menubar, Header } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";

import { Grid, Text, Icon, Button, Image } from "../elements/element";

const PartyDetail = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { partyId } = useParams();
  console.log(partyId)
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const menuColor = [false, true, false, false, false]; // 메뉴바 색

  React.useEffect(() => {
    console.log(partyId);
    dispatch(partyActions.getOnePartyDB(partyId));
  }, []);

  const partyList = useSelector((state) => state?.party?.partyList[0]);
  const partymember = partyList?.partymemberDto;
  const img =
    partyList?.userImgUrl !== "없음"
      ? partyList?.userImgUrl
      : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png";
  const attendBtn = partymember?.some((m) => m.username === userInfo.username)
    ? "참가취소하기"
    : "참가하기";

  console.log(partyList, partymember, attendBtn);
  const attendParty = (partyId) => {
    if (partyList.username === userInfo.username) {
      window.alert("모임 주최자는 취소할수 없어요!!");
      return;
    }
    if (partymember.length === partyList.maxPeople) {
      window.alert("모집이 완료되었습니다!");
      return;
    }
    dispatch(partyActions.attendPartyDB(partyId));
  };

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
            <Grid padding="96px 14px 100px">
              <Grid isFlex>
                <Grid flexRow margin="0 0 20px">
                  {/* <Mainprofile> */}
                  <Image
                    type="circle"
                    width="32px"
                    margin="0 14px 0 0"
                    src={img}
                  />
                  {/* </Mainprofile> */}
                  <Grid>
                    <Text margin="0" size="12px" bold="500">
                      [{partyList?.userTitle}] {partyList?.username}
                    </Text>
                  </Grid>
                </Grid>
                <Grid width="auto" margin="0 0 20px" flexRow>
                  <Button 
                    width="auto" height="auto" padding="5px" margin="0 5px" 
                    _onClick={()=>{
                      navigate(`/partywrite/${partyList.partyId}`);}}>
                    <Text margin="0">수정</Text>
                  </Button>
                  <Button 
                    width="auto" height="auto" padding="5px" 
                    _onClick={()=>{deleteParty(partyList.partyId)}}>
                    <Text margin="0">삭제</Text>
                  </Button>
                </Grid>
              </Grid>
              <hr style={{ border: "1px solid #DEDEDE" }} />
              <Grid padding="20px 0" margin="0 0 24px" flexColumn>
                <Grid alignItems="left">
                  <Text margin="0 0 33.5px" size="18px" bold="600">
                    {partyList?.title}
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
                      {partyList?.mountain} ({partyList?.address})
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
                      {partyList?.partyDate} (시간 {partyList?.partyTime})
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
                      {partyList?.curPeople}/{partyList?.maxPeople}명
                    </Text>
                    {/* <Icon type="detailBtn" width="8px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                  <Grid margin="45px 0">
                    <Text margin="0 0 33.5px" size="16px" bold="500">
                      {partyList?.partyContent}
                    </Text>
                  </Grid>
                </Grid>
                <hr style={{ border: "1px solid #DEDEDE", width: "100%" }} />
                <Grid padding="20px 0">
                  <Text margin="0 0 20px" size="18px" bold="600">
                    참여인원
                  </Text>
                  {partymember?.map((p, idx) => {
                    const image =
                      p?.userImageUrl !== "없음"
                        ? p?.userImageUrl
                        : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png";
                    return (
                      <Grid key={idx} flexRow margin="0 0 20px">
                        <Image
                          type="circle"
                          width="32px"
                          margin="0 14px 0 0"
                          src={image}
                        />
                        <Grid>
                          <Text margin="0" size="12px" bold="500">
                            [{p.userTitle}] {p.username}
                          </Text>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
                <hr style={{ border: "1px solid #DEDEDE", width: "100%" }} />
                <Grid isFlex>
                  <Button
                    bgColor="#C4C4C4"
                    border="none"
                    height="48px"
                    margin="20px 0 20px 13px"
                    radius="12px"
                    _onClick={() => {
                      navigate(`/chatroom/${partyList.partyId}`);
                    }}
                  >
                    <Text margin="0" size="18px" bold="600" align>
                      대화하기
                    </Text>
                  </Button>
                  <Button
                    bgColor="#C4C4C4"
                    border="none"
                    height="48px"
                    margin="20px 0 20px 13px"
                    radius="12px"
                    _onClick={() => {
                      attendParty(partyList.partyId);
                    }}
                  >
                    <Text margin="0" size="18px" bold="600" align>
                      {attendBtn}
                    </Text>
                  </Button>
                </Grid>
              </Grid>
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
            <Grid padding="96px 14px 100px">
              <Grid isFlex>
                <Grid flexRow margin="0 0 20px">
                  {/* <Mainprofile> */}
                  <Image
                    type="circle"
                    width="32px"
                    margin="0 14px 0 0"
                    src={img}
                  />
                  {/* </Mainprofile> */}
                  <Grid>
                    <Text margin="0" size="12px" bold="500">
                      [{partyList?.userTitle}] {partyList?.username}
                    </Text>
                  </Grid>
                </Grid>
                <Grid width="auto" margin="0 0 20px" flexRow>
                  <Button 
                    width="auto" height="auto" padding="5px" margin="0 5px" 
                    _onClick={()=>{
                      navigate(`/partywrite/${partyList.partyId}`);}}>
                    <Text margin="0">수정</Text>
                  </Button>
                  <Button 
                    width="auto" height="auto" padding="5px" 
                    _onClick={()=>{deleteParty(partyList.partyId)}}>
                    <Text margin="0">삭제</Text>
                  </Button>
                </Grid>
              </Grid>
              <hr style={{ border: "1px solid #DEDEDE" }} />
              <Grid padding="20px 0" margin="0 0 24px" flexColumn>
                <Grid alignItems="left">
                  <Text margin="0 0 33.5px" size="18px" bold="600">
                    {partyList?.title}
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
                      {partyList?.mountain} ({partyList?.address})
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
                      {partyList?.partyDate} (시간 {partyList?.partyTime})
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
                      {partyList?.curPeople}/{partyList?.maxPeople}명
                    </Text>
                    {/* <Icon type="detailBtn" width="8px" height="13" margin="auto" _onClick={()=>{alert("참여인원정보 확인?")}} /> */}
                  </Grid>
                  <Grid margin="45px 0">
                    <Text margin="0 0 33.5px" size="16px" bold="500">
                      {partyList?.partyContent}
                    </Text>
                  </Grid>
                </Grid>
                <hr style={{ border: "1px solid #DEDEDE", width: "100%" }} />
                <Grid padding="20px 0">
                  <Text margin="0 0 20px" size="18px" bold="600">
                    참여인원
                  </Text>
                  {partymember?.map((p, idx) => {
                    return (
                      <Grid key={idx} flexRow margin="0 0 20px">
                        <Image
                          type="circle"
                          width="32px"
                          margin="0 14px 0 0"
                          src={p.userImageUrl}
                        />
                        <Grid>
                          <Text margin="0" size="12px" bold="500">
                            [{p.userTitle}] {p.username}
                          </Text>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
                <hr style={{ border: "1px solid #DEDEDE", width: "100%" }} />
                <Grid isFlex>
                  <Button
                    bgColor="#C4C4C4"
                    border="none"
                    height="48px"
                    margin="20px 0 20px 13px"
                    radius="12px"
                    _onClick={() => {
                      navigate(`/chatroom/${partyList?.partyId}`);
                    }}
                  >
                    <Text margin="0" size="18px" bold="600" align>
                      대화하기
                    </Text>
                  </Button>
                  <Button
                    bgColor="#C4C4C4"
                    border="none"
                    height="48px"
                    margin="20px 0 20px 13px"
                    radius="12px"
                    _onClick={() => {
                      attendParty(partyList?.partyId);
                    }}
                  >
                    <Text margin="0" size="18px" bold="600" align>
                      참가하기
                    </Text>
                  </Button>
                </Grid>
              </Grid>
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

export default PartyDetail;
