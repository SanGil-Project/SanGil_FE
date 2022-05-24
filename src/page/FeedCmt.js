import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/element";
import { Header, Menubar } from "../components/component";
import { useParams } from "react-router";

const FeedCmt = () => {
  const { feedId } = useParams();
  const menuColor = [false, false, false, true, false]; // 메뉴바 색

  return (
    <>
      <Header />
      <Grid padding="64px 0 0 0">댓글페이지</Grid>
      <MenubarContainer>
        <Grid height="88px" maxWidth="500px" margin="auto">
          <Menubar menuColor={menuColor} />
        </Grid>
      </MenubarContainer>
    </>
  );
};

const DetailContainer = styled.div`
  width: 100%;
  height: 100vh;
  // min-width: 414px;
  max-width: 500px;
  margin: auto;
  background-color: #fff;
  overflow-y: scroll;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
export default FeedCmt;
