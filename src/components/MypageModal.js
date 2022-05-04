import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

import { Grid, Text, Icon, Image } from '../elements/element';

const MypageModal = (props) => {

  const titleDB = [
    { title: "등린이", pick: false,}, 
    { title: "등산의신", pick: false,},
    { title: "산신령", pick: false,},
    { title: "100대명산정복자", pick: false,},
    { title: "1000km달성", pick: false,}, 
    { title: "산길러", pick: true,},
    { title: "연예인", pick: false,},
    { title: "인싸중에인싸", pick: false,},
    { title: "아싸중에아싸", pick: false,}, 
    { title: "무쇠다리", pick: false,},
    { title: "따라올테면따라와바", pick: false,},
    { title: "욜로", pick: false,},
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Grid margin="0 0 20px">
        <button onClick={()=> setModalIsOpen(true)}>프로필 수정</button>
        <Modal isOpen={modalIsOpen} 
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15, 15, 15, 0.3)",
              zIndex: "100",
            },
            content: {
              position: "absolute",
              top: "60px",
              bottom: "80px",
              width: "75%",
              margin: "auto",
              maxWidth: "700px",
              height: "70%",
              border: "none",
              background: "#fff",
              boxShadow: "0 4px 12px 0 rgba(0,0,0,0.1)",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "0",
              outline: "none",
              padding: "20px",
            },
          }}
          onRequestClose={() => setModalIsOpen(false)}>
            <Grid>
              <button onClick={()=> setModalIsOpen(false)}>&lt;</button>
              <Grid flexColumn height="auto" padding="10px 15px 18px">
                <UserProfile>
                  <Image
                    type="circle"
                    width="100px"
                    margin="0 0 10px 20px"
                    src="https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png"/>
                  <Icon type="profileEdit" width="21px" height="21px" margin="0 auto" />
                </UserProfile>
                <UserName>
                  <Text bold="500" size="20px" margin="0 10px 0 25px">유저이름</Text>
                  <Icon type="nameEdit" width="17px" height="16px" margin="0 auto" />
                </UserName>
              </Grid>
              <Grid height="auto" padding="0 0 20px 0">
                <TitleList>
                  {titleDB.map((t, idx) => {
                    return <TitleItem key={idx} title={t.title} pick={t.pick}/>
                  })}
                </TitleList>
              </Grid>
            </Grid>
          </Modal>
      </Grid>
    </React.Fragment>
  );
}

const UserName = styled.div`
  display: flex;  
  align-items:center; 
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

  const { title, pick } = props

  return (
    <React.Fragment>
      {pick ? 
        (<Grid padding="2px" bg="#ccc" flexColumn width="82px" margin="0 12px 12px 0" radius="4px">
          <Image
            width="70px"
            height="70px"
            borderRadius="12px"
            src="https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png"/>
          <Text margin="5px 0 0 0" size="10px" bold="500">{title}</Text>
        </Grid>) : 
        (<Grid padding="2px" flexColumn width="82px" margin="0 12px 12px 0" radius="4px">
          <Image
            width="70px"
            height="70px"
            borderRadius="12px"
            src="https://user-images.githubusercontent.com/91959791/166439276-e09b9d5c-5a85-461d-8204-1667d68c271e.png"/>
          <Text margin="5px 0 0 0" size="10px" bold="500">{title}</Text>
        </Grid>)}
    </React.Fragment>
  );
}

TitleItem.defaultProps = {
}