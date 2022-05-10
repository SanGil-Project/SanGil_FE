import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { Grid, Text, Icon, Image, Button, Input } from '../elements/element';

const MypageModal = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const titleList = useSelector((state) => state?.user?.titleList);

  React.useEffect(() => {
    dispatch(userActions.myTitleDB());
  }, []);

  const img = (userInfo?.userImageUrl !== "없음") ? userInfo?.userImageUrl : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png";
  const userTitleList = titleList?.filter((p) => p.have === true);
  const noTitleList = titleList?.filter((p) => p.have === false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nameCount, setNameCount] = useState(userInfo?.username?.length);
  const [username, setUsername] = useState(userInfo?.username);
  const [_userTitle, set_userTitle] = useState(userInfo?.userTitle);

  const changeNickname = (e) => {
    // 현 글자수 보여주기
    setNameCount(e.target.value.length);
    //  글자수 10자로 제한
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substr(0, 10);
      setUsername(e.target.value.substr(0, 10));
      // 10이상은 10으로 고정 (11 안나오게)
      setNameCount(10);
    }
    setUsername(e.target.value)
  }

  const nameCheck = () => {
    dispatch(userActions.nameCheckDB(username));
  }
  const changeName = () => {
    dispatch(userActions.changeNameDB(username));
  }

  const selectTitle = (curTitle) => {
    // 타이틀 수정
    console.log("자식한테 받은 curTitle ::", curTitle);
    set_userTitle(curTitle);
    dispatch(userActions.changeTitleDB(curTitle));

  }
  console.log(_userTitle)

  return (
    <React.Fragment>
      <Grid>
        <Grid flexRow>
          <Mainprofile>
            <Image
              type="circle"
              width="80px"
              margin="0 10px 0 11px"
              src={img}/>
            <Editbtn>
              <Icon type="profileEdit" width="21px" height="21px" margin="0 auto" _onClick={()=> {setModalIsOpen(true); setNameCount(userInfo?.username?.length);}}/>
            </Editbtn>
          </Mainprofile>
          <Grid>
            <Text margin="0" size="14px">{userInfo?.userTitle}</Text>
            <Text margin="8px 0 13px" size="20px" bold="600">{userInfo?.username}</Text>
          </Grid>
        </Grid>
        {/* <button onClick={()=> setModalIsOpen(true)}>프로필 수정</button> */}
        <Modal isOpen={modalIsOpen} 
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "transparent",
              backdropFilter: "blur(5px)",
              zIndex: "100",
            },
            content: {
              position: "absolute",
              top: "60px",
              bottom: "80px",
              inset: "60px 20px 80px",
              // width: "80vw",
              // height: "70%",
              margin: "auto",
              maxWidth: "400px",
              border: "none",
              background: "rgba(0, 0, 0, 0.4)",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "0",
              outline: "none",
              padding: "20px",
            },
          }}
          onRequestClose={() => setModalIsOpen(false)}>
            <Grid>
              <Grid isFlex height="auto">
                <Icon type="back" width="24px" height="25px" margin="0 auto" color="white" _onClick={()=> {setModalIsOpen(false); setNameCount(userInfo.username.length);}}/>
                {/* <Button height="auto" width="auto" color="#fff" border="none" _onClick={()=> {setModalIsOpen(false); setNameCount(userInfo.username.length);}}>확인</Button> */}
              </Grid>
              <Grid flexColumn height="auto" padding="10px 15px 0">
                <UserProfile>
                  <Image
                    hover
                    type="circle"
                    width="100px"
                    src="https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png"/>
                  {/* <Icon type="profileEdit" width="21px" height="21px" margin="0 auto" /> */}
                </UserProfile>
                <Grid flexRow padding="10px 0 45px">
                  <UserName>
                    <Input width="140px" padding="0" border="none" bg="transparent" defaultValue={userInfo?.username} _onChange={changeNickname}/>
                    <Text margin="0 10px 0 0" bold="500" size="10px" color="#c4c4c4"> {nameCount}/10</Text>
                  </UserName>
                  <Icon type="checkBtn" width="24px" height="24px" margin="0 auto" check="#6F6F6F" _onClick={nameCheck}/>
                  <Icon type="checkBtn" width="24px" height="24px" margin="0 auto" check="#6F6F6F" _onClick={changeName}/>
                  {/* <path d="M18 8L9.99999 16L6 12" stroke="#61D161" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> */}
                </Grid>
              </Grid>
              <Grid height="auto" padding="0 0 20px 0">
                <TitleList>
                  {userTitleList?.map((t, idx) => {
                    const pick = (userInfo?.userTitle === t.userTitle) ? true : false;
                    return (
                      <Grid _onClick={()=>{selectTitle(t.userTitle)}} width="auto">
                        <TitleItem key={idx} title={t.userTitle} img={t.userTitleImgUrl} pick={pick} done/>
                      </Grid> 
                    );
                    
                  })}
                  {noTitleList?.map((t, idx) => {
                    return (
                      <Grid _onClick={()=>{selectTitle(t.userTitle)}} width="auto">
                        <TitleItem key={idx} title={t.userTitle} img={t.userTitleImgUrl}/>
                      </Grid>
                    );
                  })}
                </TitleList>
              </Grid>
            </Grid>
          </Modal>
      </Grid>
    </React.Fragment>
  );
}

const Mainprofile = styled.div`
  position: relative;
`;

const Editbtn = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  cursor: pointer;
`;

const UserName = styled.div`
  display: flex;  
  align-items:center;
  border: 1px solid #C4C4C4;
  background: #FFFFFF;
  padding: 3px 0 3px 12px;
  margin: 0 5px 0 0;
  width: 195px;
  box-sizing: border-box;
`;

const UserProfile = styled.div`
  display: flex;  
`;

const TitleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
`;
export default MypageModal;


const TitleItem = (props) => {

  const { title, img , pick, done, selectTitle } = props

  // const [curTitle, setCurTitle] = useState();


  // React.useEffect((curTitle) => {
  //   console.log(curTitle);
  // }, [curTitle]);

  // if(selectTitle) {
  //   props.selectTitle(curTitle);
  // }
  // const selectT = (title) => {
  //   setCurTitle(title);
  //   if(selectTitle) {
  //   props.selectTitle(curTitle);
  //   }
  // }

  if(done) {
    return (
      <React.Fragment>
        <Grid padding="2px" flexColumn width="82px" margin="0 12px 12px 0" radius="4px" hover>
        {pick ? 
          <Image
            width="70px"
            height="70px"
            bg="#fff"
            border="2px solid #000000"
            borderRadius="12px"
            src={img}/> : 
          <Image
            width="70px"
            height="70px" 
            bg="#fff"
            borderRadius="12px"
            src={img}/>}
          <Text margin="5px 0 0 0" size="10px" bold="500" align="center">{title}</Text>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="2px" flexColumn width="82px" margin="0 12px 12px 0" radius="4px">
        {/* <Image
          width="70px"
          height="70px" 
          bg="#C4C4C4"
          borderRadius="12px"
          src={img}/> */}
        <Grid width="70px"
          height="70px" 
          bg="#C4C4C4"
          radius="12px"></Grid>
        <Text margin="5px 0 0 0" size="10px" bold="500" color="#D2D2D2" align="center">{title}</Text>
      </Grid>
    </React.Fragment>
  );
}

TitleItem.defaultProps = {
}