import React from 'react';
import styled from "styled-components";

import { Section, Menubar } from '../components/component';
import { Grid } from '../elements/element';

const Mypage = () => {
  return (
    <React.Fragment>
      <MypageContainer>
        <Grid bg="#ededed" padding="70px 14px 28px" height="auto">
          <Section/>
        </Grid>
        <Grid padding="70px 14px 28px" height="auto">
          🚩 정복한 산길
        </Grid>
        <Grid padding="70px 14px 28px" height="auto">
          ❤️ 정복해야할 산길
        </Grid>
        <MenubarContainer>
          <Grid height="88px" minWidth="414px" maxWidth="800px" margin="auto">
            <Menubar/>
          </Grid>
        </MenubarContainer>

      </MypageContainer>
    </React.Fragment> 
  );
}

const MypageContainer = styled.div`
  background-color: orange;
  width: 100%;
  height: 100vh;
  min-width: 414px;
  max-width: 800px;
  margin: auto;
`;
const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index : 10;
`;

export default Mypage;

