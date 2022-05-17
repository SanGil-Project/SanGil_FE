import React from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements/element";
import { Header, Menubar, FeedCard } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import { useSelector, useDispatch } from "react-redux";
import { getFeedDB } from "../redux/modules/feed";
import { useNavigate } from "react-router";

const FeedDetail = () => {
  const userInfo = useSelector((state) => state.user?.userInfo);
  const feedList = useSelector((state) => state.feed.feedList?.feedList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuColor = [true, false, false, false, false]; // 메뉴바 색

  React.useEffect(() => {
    dispatch(getFeedDB());
    console.log("니가범인?2");
  }, []);

  return (
    <>
      <Mobile></Mobile>

      {/* 데스크탑 */}
      <Desktop>
        <FeedContainer>
          <Header />
          <Grid overflowY="scroll">
            <Grid height="94px"></Grid>
            {feedList?.map((el, idx) => (
              <FeedCard el={el} key={idx} />
            ))}
          </Grid>
          <Grid height="88px"></Grid>
          <TrackBtn>
            <Button
              width="50px"
              height="50px"
              bgColor="#5CB16E"
              border="none"
              color="#fff"
              radius="100%"
              // position="fixed"
              // margin="-80px 0 0 350px"
              _onClick={() => navigate("/feedwrite")}
            >
              <AddFeed viewBox="0 0 25 25" fill="none">
                <path
                  d="M6 3.5V10.5M2.5 7H9.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 21.5H12.5L22.5 11.5L17.5 6.5L7.5 16.5V21.5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M14.5 9.5L19.5 14.5" stroke="white" strokeWidth="2" />
              </AddFeed>
            </Button>
          </TrackBtn>
          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </FeedContainer>
      </Desktop>
    </>
  );
};

const FeedContainer = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: auto;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const TrackBtn = styled.div`
  position: absolute;
  right: calc(50% - 220px);
  bottom: 120px;
`;

const AddFeed = styled.svg`
  width: 25px;
  height: 25px;
`;

export default FeedDetail;
