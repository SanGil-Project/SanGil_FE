import React from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements/element";
import { Header, Menubar, FeedCard } from "../components/component";
import { useSelector, useDispatch } from "react-redux";
import { getFeedDB } from "../redux/modules/feed";
import { useNavigate } from "react-router";
import _ from "lodash";

const FeedDetail = () => {
  const userInfo = useSelector((state) => state.user?.userInfo);
  const feedList = useSelector((state) => state.feed.feedList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuColor = [true, false, false, false, false]; // 메뉴바 색
  const [pageNum, setPageNum] = React.useState(1);

  const onScroll = _.throttle((e) => {
    // 총 높이: e.target.scrollHeight
    // 현재 높이:  curHeight
    const clientHeight = e.target.scrollHeight;
    const curHeight = e.target.scrollTop;
    if (
      clientHeight - curHeight <= 1000 &&
      !(feedList?.totalPage - 1 === feedList?.currentPage)
    ) {
      setPageNum((prev) => prev + 1);
    }
  }, 500);

  React.useEffect(() => {
    if (!feedList.totalPage || feedList.totalPage >= pageNum) {
      dispatch(getFeedDB(pageNum));
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pageNum]);

  return (
    <>
      <Header />
      <Grid padding="64px 0 88px 0" overflowY="scroll" _onScroll={onScroll}>
        {feedList?.feedList?.map((el, idx) => (
          <FeedContainer key={idx}>
            <FeedCard el={el} />
          </FeedContainer>
        ))}
      </Grid>
      <Grid height="88px"></Grid>
      <TrackBtn>
        <Button
          width="60px"
          height="60px"
          bgColor="#43CA3B"
          border="none"
          color="#fff"
          radius="100%"
          shadow="0px 3px 4px rgba(0, 0, 0, 0.15)"
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
    </>
  );
};

const FeedContainer = styled.div`
  margin: 0 0 70px 0;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const TrackBtn = styled.div`
  position: fixed;
  right: calc(5%);
  bottom: 113px;
`;

const AddFeed = styled.svg`
  width: 25px;
  height: 25px;
`;

export default FeedDetail;
