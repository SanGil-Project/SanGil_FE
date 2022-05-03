import React from "react";
import styled from "styled-components";

import { Section, Menubar, FullMap, HorizontalScroll, Card, Header } from '../components/component';
import { Grid, Text, Icon, Button } from '../elements/element';

const Search = () => {
  return (
    <React.Fragment>
      <SearchContainer>
        <Header />
        <SearchWrap>
          <Grid padding="96px 14px 0px" height="auto">
            <FullMap/>
            <hr/>
          </Grid>
          {/* 28px */}
          <Grid padding="25px 14px 100px" height="auto">
            <Grid padding="17px 16px 22px" height="132px" bg="#efefef">
              <Button bgColor="#fff" border="none" radius="12px" padding="6px 11px" width="auto" height="auto">
                <Text margin="0" size="18px">A 관악산</Text>
              </Button>
              <Text size="16px" bold="400">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내...</Text>
            </Grid>

          </Grid>
        </SearchWrap>
        
        <MenubarContainer>
          <Grid height="88px" minWidth="414px" maxWidth="800px" margin="auto">
            <Menubar/>
          </Grid>
        </MenubarContainer>

      </SearchContainer>
    </React.Fragment>
  );
}

const SearchContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  min-width: 414px;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
  
`;

const SearchWrap = styled.div`
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
export default Search;