import React, { useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';


import { Desktop, Mobile } from "../shared/responsive";
import { Section, Menubar, FullMap, HorizontalScroll, Card, Header, MypageModal } from '../components/component';
import { Grid, Text, Icon } from '../elements/element';


const Mypage = () => {

  const num = [2, 3, 4, 5];
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <React.Fragment>
      {/* <Mobile> */}
        <MypageContainer>
          <Header />
          <MypageWrap>
            <Grid bg="#ededed" padding="96px 14px 28px" height="auto">
              <MypageModal/>
              <Section/>
            </Grid>
            <Grid padding="36px 14px 25px" height="auto">
              <Text bold="600" size="20px" margin="0 0 24px" align="left">🚩 정복한 산길</Text>
              <FullMap/>
            </Grid>
            <Grid padding="35px 14px 70px" height="auto">
            <Grid
                // border="1px solid green"
                margin="0 auto 60px auto"
                height="238px"
              >
                <Text
                  width="350px"
                  height="24px"
                  margin="0 7px 24px 7px"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  ❤️ 정복해야할 산길
                </Text>
                <HorizontalScroll>
                  {num.map((cur, idx) => (
                    <div key={idx}>
                      <Card width="194px" height="120px" margin="10px 7px 8px 7px">
                        <Icon
                          type="like"
                          width="18px"
                          height="18px"
                          margin="0 0 -103px 163px"
                        />
                      </Card>
                      <Text
                        margin="8px 0 0 7px"
                        bold='600'
                        size="1.4rem"
                      >
                        어디어디 산의 어디 코스
                      </Text>

                      <Grid
                        height="20px"
                        isFlex
                        width="194px"
                        margin="8px 7px 0 7px"
                      >
                        <Text bold="300" size="1.2rem">매우 좋음 5.0</Text>
                        <Text bold="400" size="1.2px">100.800km</Text>
                      </Grid>
                    </div>
                  ))}
                </HorizontalScroll>
              </Grid>
            </Grid>
          </MypageWrap>
          
          <MenubarContainer>
            <Grid height="88px" minWidth="414px" maxWidth="800px" margin="auto">
              <Menubar/>
            </Grid>
          </MenubarContainer>

        </MypageContainer>
      {/* </Mobile> */}
      
    </React.Fragment> 
  );
}

const MypageContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  min-width: 414px;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
  
`;

const MypageWrap = styled.div`
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
  z-index : 10;
`;


export default Mypage;

