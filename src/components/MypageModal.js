import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

import { Grid, Text, Icon, Image, Button, Input } from '../elements/element';

const MypageModal = (props) => {
  // const userInfo = useSelector((state) => state.user.userInfo);

  // 입력 테스트 정보
  const titleList = [
    { userTitle: "등린이", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false}, 
    { userTitle: "등산의신", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
    { userTitle: "산신령", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
    { userTitle: "100대명산정복자", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
    { userTitle: "1000km달성", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",}, 
    { userTitle: "산길러", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
    { userTitle: "내가바로박예슬", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
    { userTitle: "연예인", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
    { userTitle: "인싸중에인싸", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
    { userTitle: "아싸중에아싸", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",}, 
    { userTitle: "무쇠다리", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
    { userTitle: "따라올테면따라와바", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png",},
  ];

  const userInfo = {
    userId: 1,
    username: "박예슬",
    userImageUrl: "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png",
    userTitle: "등린이"
  }

  const userTitleList = [
    { userTitle: "등린이", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", have: false}, 
    { userTitle: "산길러", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", pick: false},
    { userTitle: "내가바로박예슬", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", pick: true},
    { userTitle: "따라올테면따라와바", userTitleImgUrl: "https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png", pick: false},
  ];

  const noTitleList = titleList.filter((t) => {
    // 유저가 가지고 있지 않은 타이틀만 필터링
    return !userTitleList.some(usert => usert.userTitle === t.userTitle)
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nameCount, setNameCount] = useState(userInfo.username.length);


  const changeNickname = (e) => {
    // 현 글자수 보여주기
    setNameCount(e.target.value.length);
    //  글자수 10자로 제한
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substr(0, 10);
      // 10이상은 10으로 고정 (11 안나오게)
      setNameCount(10);
    }
  }

  return (
    <React.Fragment>
      <Grid>
        <Grid flexRow>
          <Mainprofile>
            <Image
              type="circle"
              width="80px"
              margin="0 10px 0 11px"
              src={userInfo.userImageUrl}/>
            <Editbtn>
              <Icon type="profileEdit" width="21px" height="21px" margin="0 auto" _onClick={()=> {setModalIsOpen(true); setNameCount(userInfo.username.length);}}/>
            </Editbtn>
          </Mainprofile>
          <Grid>
            <Text margin="0" size="14px">{userInfo.userTitle}</Text>
            <Text margin="8px 0 13px" size="20px" bold="600">{userInfo.username}</Text>
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
              // backgroundColor: "rgba(15, 15, 15, 0.3)",
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
              margin: "auto",
              maxWidth: "725px",
              // height: "70%",
              border: "none",
              background: "rgba(0, 0, 0, 0.4)",
              // background: "#fff",
              // boxShadow: "0 4px 12px 0 rgba(0,0,0,0.5)",
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
                <Button height="auto" width="auto" color="#fff" border="none" _onClick={()=> {setModalIsOpen(false); setNameCount(userInfo.username.length);}}>확인</Button>
              </Grid>
              <Grid flexColumn height="auto" padding="10px 15px 0">
                <UserProfile>
                  <Image
                    type="circle"
                    width="100px"
                    src="https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png"/>
                  {/* <Icon type="profileEdit" width="21px" height="21px" margin="0 auto" /> */}
                </UserProfile>
                <UserName>
                  <Input width="140px" padding="0" border="none" bg="transparent" defaultValue={userInfo.username} _onChange={changeNickname}/>
                  <Text margin="0 10px 0 0" bold="500" size="10px" color="#c4c4c4"> {nameCount}/10</Text>
                </UserName>
              </Grid>
              <Grid height="auto" padding="0 0 20px 0">
                <TitleList>
                  {userTitleList.map((t, idx) => {
                    return <TitleItem key={idx} title={t.userTitle} img={t.userTitleImgUrl} pick={t.pick} done/>
                  })}
                  {noTitleList.map((t, idx) => {
                    return <TitleItem key={idx} title={t.userTitle} img={t.userTitleImgUrl}/>
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
  margin: 10px 0 45px;
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

  const { title, img , pick, done} = props

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
          <Text margin="5px 0 0 0" size="10px" bold="500">{title}</Text>
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
        <Text margin="5px 0 0 0" size="10px" bold="500" color="#D2D2D2">{title}</Text>
      </Grid>
    </React.Fragment>
  );
}

TitleItem.defaultProps = {
}