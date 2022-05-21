import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";
import _ from "lodash";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { Desktop, Mobile } from "../shared/responsive";
import { Header } from "../components/component";
import { Grid, Text, Icon, Image, Button, Input } from '../elements/element';

const MypageEdit = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const user = useSelector((state) => state?.user);
  const titleList = useSelector((state) => state?.user?.titleList?.userTitleDtoList);
  const userInfo = user?.userInfo;
  const checkData = user?.nameCheck;

  React.useEffect(() => {
    dispatch(userActions.myTitleDB());
  }, []);

  const img = (userInfo?.userImageUrl !== "없음") ? userInfo?.userImageUrl : "https://user-images.githubusercontent.com/91959791/168119302-948f0dcf-8165-47af-8b6b-2f90f74aca06.png";
  const userTitleList = titleList?.filter((p) => p.have === true);
  const noTitleList = titleList?.filter((p) => p.have === false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nameCount, setNameCount] = useState(userInfo?.nickname?.length);
  const [nickname, setNickname] = useState(userInfo?.nickname);
  const [_userTitle, set_userTitle] = useState(userInfo?.userTitle);

  const [preview, setPreview] = useState(null);

  const selectFile = (e) => {

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      setPreview(reader.result); // 바로 보여주기
      dispatch(userActions.changeImgDB(file, reader.result));
    };
  };

  // const changeNickname = _.debounce((e) => {
  //   // 현 글자수 보여주기
  //   setNameCount(e.target.value.length);
  //   //  글자수 10자로 제한
  //   if (e.target.value.length > 10) {
  //     e.target.value = e.target.value.substr(0, 10);
  //     setNickname(e.target.value.substr(0, 10));
  //     // 10이상은 10으로 고정 (11 안나오게)
  //     setNameCount(10);
  //   }
  //   setNickname(e.target.value)
  // }, 1000);

  const changeNickname = (e) => {
    // 현 글자수 보여주기
    setNameCount(e.target.value.length);
    //  글자수 10자로 제한
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substr(0, 10);
      setNickname(e.target.value.substr(0, 10));
      // 10이상은 10으로 고정 (11 안나오게)
      setNameCount(10);
    }
    setNickname(e.target.value)
  };

  const checkColor = checkData ? "#61D161" : "#6F6F6F";
  let checkType = true;
  const defalutsrc = "https://user-images.githubusercontent.com/91959791/168119302-948f0dcf-8165-47af-8b6b-2f90f74aca06.png";

  if (!checkData) {
    if (userInfo?.nickname === nickname || !nickname) {
      checkType = true;
    } else {
      checkType = false;
    }
  } else {
    checkType = true;
  }

  React.useEffect(() => {
    if (nickname) {
      dispatch(userActions.nameCheckDB(nickname));
    }
  }, [nickname]);

  const changeName = () => {
    if (!checkData) {
      checkType ? window.alert("변경사항이 없습니다") : window.alert("중복된 닉네임입니다");
      return; 
    }
    dispatch(userActions.changeNameDB(nickname));
  }

  const selectTitle = (curTitle) => {
    // 타이틀 수정
    console.log("자식한테 받은 curTitle ::", curTitle);
    set_userTitle(curTitle);
    dispatch(userActions.changeTitleDB(curTitle));

  }
  
  return (
    <React.Fragment>
      <Mobile>
        <MypageContainer>
          <Header />
          <Grid padding="69px 43px 23px" height="auto">
            <Grid flexColumn height="auto" padding="5px 0">
              <UserProfile>
                <Label className="input_file_button" htmlFor="input_image">
                  <Image
                    hover
                    type="circle"
                    width="100px"
                    height="100px"
                    src={preview ? preview : userInfo?.userImageUrl !== "없음" ? userInfo?.userImageUrl : defalutsrc}/>
                </Label>
                <input id='input_image' type="file" ref={fileInput} onChange={selectFile} style={{display:"none"}}/>
              </UserProfile>
              <Grid flexRow padding="10px 0 42px">
                <UserName>
                  <Grid flexRow width="auto">
                    <Grid width="4px" height="23px" bg="#43CA3B"></Grid>
                    <Input gridWidth="140px" size="14px" width="140px" padding="4.5px 0 4.5px 8px" margin="0" border="none" bg="transparent" defaultValue={userInfo?.nickname} _onChange={changeNickname}/>
                  </Grid>
                  <Text margin="0 10px" bold="500" size="10px" color="#c4c4c4" width="auto"> {nameCount}/10</Text>
                </UserName>
                <Button width="auto" height="23px" padding="4.5px 10px" bgColor="#43CA3B" radius="4px" border="none">
                  <Text margin="0" color="#fff" align size="12px" bold="600">변경</Text>
                </Button>
                {/* {checkType ? 
                <Icon type="checkBtn" width="24px" height="24px" margin="0 auto" check="#6F6F6F" checkColor={checkColor} _onClick={changeName}/> : 
                <Icon type="errorBtn" width="24px" height="24px" margin="0 auto" _onClick={changeName}/>} */}
              </Grid>
            </Grid>
            <Grid height="auto" padding="0 0 20px 0">
              <TitleList>
                {userTitleList?.map((t, idx) => {
                  const pick = (userInfo?.userTitle === t.userTitle) ? true : false;
                  const img = (t.userTitleImgUrl === "없음") ? "https://user-images.githubusercontent.com/91959791/169658309-a910c67d-7ae2-4895-b6be-a155dcfaf5bb.png" : t.userTitleImgUrl;
                  return (
                    <Grid key={idx} _onClick={()=>{selectTitle(t.userTitle)}} width="100px" height="164px">
                      <TitleItem key={idx} title={t.userTitle} img={img} pick={pick} done/>
                    </Grid> 
                  );
                  
                })}
                {noTitleList?.map((t, idx) => {
                  return (
                    <Grid key={idx} _onClick={()=>{selectTitle(t.userTitle)}} width="100px" height="164px">
                      <TitleItem key={idx} title={t.userTitle} img={img}/>
                    </Grid>
                  );
                })}
              </TitleList>
            </Grid>
          </Grid>
        </MypageContainer>
      </Mobile>
      
      <Desktop>
        <MypageContainer>
          <Header />
          <Grid padding="69px 43px 23px" height="auto">
            <Grid flexColumn height="auto" padding="5px 0">
              <UserProfile>
                <Label className="input_file_button" htmlFor="input_image">
                  <Image
                    hover
                    type="circle"
                    width="100px"
                    height="100px"
                    src={preview ? preview : userInfo?.userImageUrl !== "없음" ? userInfo?.userImageUrl : defalutsrc}/>
                </Label>
                <input id='input_image' type="file" ref={fileInput} onChange={selectFile} style={{display:"none"}}/>
              </UserProfile>
              <Grid flexRow padding="10px 0 42px">
                <UserName>
                  <Grid flexRow width="auto">
                    <Grid width="4px" height="23px" bg="#43CA3B"></Grid>
                    <Input gridWidth="140px" size="14px" width="140px" padding="4.5px 0 4.5px 8px" margin="0" border="none" bg="transparent" defaultValue={userInfo?.nickname} _onChange={changeNickname}/>
                  </Grid>
                  <Text margin="0 10px" bold="500" size="10px" color="#c4c4c4" width="auto"> {nameCount}/10</Text>
                </UserName>
                <Button width="auto" height="23px" padding="4.5px 10px" bgColor="#43CA3B" radius="4px" border="none">
                  <Text margin="0" color="#fff" align size="12px" bold="600">변경</Text>
                </Button>
                {/* {checkType ? 
                <Icon type="checkBtn" width="24px" height="24px" margin="0 auto" check="#6F6F6F" checkColor={checkColor} _onClick={changeName}/> : 
                <Icon type="errorBtn" width="24px" height="24px" margin="0 auto" _onClick={changeName}/>} */}
              </Grid>
            </Grid>
            <Grid height="auto" padding="0 0 20px 0">
              <TitleList>
                {userTitleList?.map((t, idx) => {
                  const pick = (userInfo?.userTitle === t.userTitle) ? true : false;
                  const img = (t.userTitleImgUrl === "없음") ? "https://user-images.githubusercontent.com/91959791/169658309-a910c67d-7ae2-4895-b6be-a155dcfaf5bb.png" : t.userTitleImgUrl;
                  return (
                    <Grid key={idx} _onClick={()=>{selectTitle(t.userTitle)}} width="100px" height="164px">
                      <TitleItem key={idx} title={t.userTitle} img={img} pick={pick} done/>
                    </Grid> 
                  );
                  
                })}
                {noTitleList?.map((t, idx) => {
                  return (
                    <Grid key={idx} _onClick={()=>{selectTitle(t.userTitle)}} width="100px" height="164px">
                      <TitleItem key={idx} title={t.userTitle} img={img}/>
                    </Grid>
                  );
                })}
              </TitleList>
            </Grid>
          </Grid>
        </MypageContainer>
      </Desktop>
    </React.Fragment>
  );
}

const MypageContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 500px;
  margin: auto;
  background-color: #fff;
`;

const UserName = styled.div`
  display: flex;  
  align-items:center;
  justify-content: space-between;
  background: #F1F1F1;
  margin: 0 6px 0 0;
  width: 188px;
  height: 23px;
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


const Label = styled.label`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    border-radius: 100%;
    cursor: pointer;
    &:hover {
        box-shadow: 0 1px 4px rgb(0,0,0,0.3);
      }
`;


export default MypageEdit;


const TitleItem = (props) => {

  const { title, img , pick, done, selectTitle } = props

  if(done) {
    return (
      <React.Fragment>
        {pick ? 
          (<Grid flexColumn width="100px" margin="0 14px 0 0" radius="4px" hover justify="flex-start">
              <Image
                width="100px"
                height="100px"
                bg="#000"
                border="2px solid #43CA3B"
                borderRadius="100%"
                src={img}/>
              <Text width="100px" margin="5px 0 0 0" size="10px" bold="600" align="center" color="#43CA3B">{title}</Text>
            </Grid>) : 
          (<Grid flexColumn width="100px" margin="0 14px 0 0" radius="4px" hover justify="flex-start">
              <Image
                width="100px"
                height="100px" 
                bg="#000"
                borderRadius="100%"
                src={img}/>
              <Text width="100px" margin="5px 0 0 0" size="10px" bold="300" align="center">{title}</Text>
            </Grid>)}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid flexColumn width="100px" margin="0 14px 0 0" radius="4px" justify="flex-start">
        <Grid width="100px"
          height="100px" 
          bg="#C4C4C4"
          radius="100%"></Grid>
        <Text width="100px" margin="5px 0 0 0" size="10px" bold="300" color="#D2D2D2" align="center">{title}</Text>
      </Grid>
    </React.Fragment>
  );
}
