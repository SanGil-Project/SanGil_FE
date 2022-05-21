import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";
import _ from "lodash";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { Grid, Text, Icon, Image, Button, Input } from '../elements/element';

const MypageModal = (props) => {
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
      <Grid>
        <Grid flexRow>
          <Mainprofile>
            <Image
              type="circle"
              width="80px"
              height="80px"
              margin="0 10px 0 0"
              src={img}/>
            <Editbtn>
              <Icon type="profileEdit" width="21px" height="21px" margin="0 auto" _onClick={()=> {setModalIsOpen(true); setNameCount(userInfo?.nickname?.length);}}/>
            </Editbtn>
          </Mainprofile>
          <Grid>
            <Text margin="0" size="14px" bold="400">{userInfo?.userTitle}</Text>
            <Grid isFlex margin="10px 0 0">
              <Text margin="0" size="20px" bold="600" color="#43CA3B">{userInfo?.nickname}</Text>
              <Button 
                padding= "6px 8px" width="auto" height="auto" border="1px solid #43CA3B" radius="4px"
                _onClick={()=>{alert("로그아웃?")}}>
                <Text size="12px" bold="500" color="#43CA3B" align margin="0">로그아웃</Text>
              </Button>
            </Grid>
          </Grid>
        </Grid>
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
              zIndex: "1001",
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
                <Icon 
                  type="back" width="24px" height="25px" margin="0 auto" color="white"
                  _onClick={()=> {setModalIsOpen(false); setNameCount(userInfo?.nickname.length);}}/>
              </Grid>
              <Grid flexColumn height="auto" padding="10px 15px 0">
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
                <Grid flexRow padding="10px 0 53px">
                  <UserName>
                    <Input width="140px" padding="0" border="none" bg="transparent" defaultValue={userInfo?.nickname} _onChange={changeNickname}/>
                    <Text margin="0 10px 0 0" bold="500" size="10px" color="#c4c4c4"> {nameCount}/10</Text>
                  </UserName>
                  {checkType ? 
                  <Icon type="checkBtn" width="24px" height="24px" margin="0 auto" check="#6F6F6F" checkColor={checkColor} _onClick={changeName}/> : 
                  <Icon type="errorBtn" width="24px" height="24px" margin="0 auto" _onClick={changeName}/>}
                </Grid>
              </Grid>
              <Grid height="auto" padding="0 0 20px 0">
                <TitleList>
                  {userTitleList?.map((t, idx) => {
                    const pick = (userInfo?.userTitle === t.userTitle) ? true : false;
                    const img = (t.userTitleImgUrl === "없음") ? "https://user-images.githubusercontent.com/91959791/168312178-a06a5ceb-490f-4844-ab17-b8888de30e68.png" : t.userTitleImgUrl;
                    return (
                      <Grid key={idx} _onClick={()=>{selectTitle(t.userTitle)}} width="auto" height="130px">
                        <TitleItem key={idx} title={t.userTitle} img={img} pick={pick} done/>
                      </Grid> 
                    );
                    
                  })}
                  {noTitleList?.map((t, idx) => {
                    return (
                      <Grid key={idx} _onClick={()=>{selectTitle(t.userTitle)}} width="auto" height="130px">
                        <TitleItem key={idx} title={t.userTitle} img={img}/>
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
  left: 0;
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


const Label = styled.label`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
    border-radius: 100%;
    cursor: pointer;
    &:hover {
        box-shadow: 0 1px 4px rgb(0,0,0,0.3);
      }
`;


export default MypageModal;


const TitleItem = (props) => {

  const { title, img , pick, done, selectTitle } = props

  if(done) {
    return (
      <React.Fragment>
        {pick ? 
          (<Grid flexColumn width="70px" margin="0 12px 0 0" radius="4px" hover justify="flex-start">
              <Image
                width="70px"
                height="70px"
                bg="#fff"
                border="2px solid #43CA3B"
                borderRadius="64px"
                src={img}/>
              <Text width="70px" margin="5px 0 0 0" size="10px" bold="600" align="center" color="#43CA3B">{title}</Text>
            </Grid>) : 
          (<Grid flexColumn width="70px" margin="0 12px 0 0" radius="4px" hover justify="flex-start">
              <Image
                width="70px"
                height="70px" 
                bg="#fff"
                borderRadius="64px"
                src={img}/>
              <Text width="70px" margin="5px 0 0 0" size="10px" bold="300" align="center">{title}</Text>
            </Grid>)}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid flexColumn width="70px" margin="0 12px 0 0" radius="4px" justify="flex-start">
        <Grid width="70px"
          height="70px" 
          bg="#C4C4C4"
          radius="64px"></Grid>
        <Text width="70px" margin="5px 0 0 0" size="10px" bold="300" color="#D2D2D2" align="center">{title}</Text>
      </Grid>
    </React.Fragment>
  );
}
