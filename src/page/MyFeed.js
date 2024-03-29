import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as handleActions } from "../redux/modules/handle";

import { Menubar, Header } from "../components/component";

import { Grid, Text, Image } from "../elements/element";
import { useNavigate } from "react-router";

const MyFeed = (props) => {
  const menuColor = [false, false, false, false, true]; // 메뉴바 색
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myFeedData = useSelector((state) => state?.user?.feedList);
  const feedList = myFeedData?.feedList;
  const totalPage = myFeedData?.totalPage;

  const [curPage, setCurPage] = useState(1);
  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);

  // observer 적용
  React.useEffect(() => {
    dispatch(handleActions.isPagename(""));
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurPage((pre) => pre + 1);
        }
      },
      { threshold: 0.25, rootMargin: "80px" }
    );
    bottomObserver.current = observer;
  }, []);

  React.useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

  const goDetail = (d) => {
    navigate(`/feeddetail/${d.feedId}`);
  };

  React.useEffect(() => {
    dispatch(userActions.myFeedDB(curPage));
  }, [curPage]);

  return (
    <React.Fragment>
      <FeedContainer>
        <Header />
        <FeedWrap>
          <Grid padding="70px 3px 100px" flexRow wrap="wrap" justify="left">
            {feedList?.length === 0 ? (
              <Grid padding="100px 0" width="auto" margin="0 auto" flexColumn>
                <Image
                  width="250px"
                  src={require("../assets/images/NoCmt.png")}
                />
                <Text bold="800" color="#d2d2d2" size="32px" align="center">
                  작성한 피드가 없어요
                </Text>
              </Grid>
              ) : (
                feedList?.map((d, idx) => {
                  return (
                    <Grid
                      key={idx}
                      width="31%"
                      height="158px"
                      bgImg={d.feedImgUrl}
                      bgSize="cover"
                      margin="0 3px 6px"
                      border="1px solid #e1e1e1"
                      hover
                      _onClick={() => goDetail(d)}
                    ></Grid>
                  );
              }))
            }
          </Grid>
          {totalPage > curPage ? <div ref={setBottom}></div> : null}
        </FeedWrap>

        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor} />
          </Grid>
        </MenubarContainer>
      </FeedContainer>
    </React.Fragment>
  );
};

const FeedContainer = styled.div`
  // position: relative;s
  background-color: #fff;
  width: 100%;
  height: 100vh;
  max-width: 500px;
  margin: auto;
  overflow: scroll;
`;
const FeedWrap = styled.div`
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
  z-index: 10;
`;

export default MyFeed;
