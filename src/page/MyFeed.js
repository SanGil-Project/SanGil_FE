import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as partyActions } from '../redux/modules/party';
import { actionCreators as userActions } from "../redux/modules/user";

import { Desktop, Mobile } from "../shared/responsive";
import {
  Menubar,
  Header,
} from "../components/component";

import { Grid, Text, Icon, Button, Input } from "../elements/element";
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
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          console.log(totalPage)
          setCurPage((pre) => pre + 1);
        }
      },
      { threshold: 0.25, rootMargin: '80px' },
    );
    console.log(curPage);
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

  React.useEffect(() => {
    dispatch(userActions.myFeedDB(curPage));
  }, [curPage]);

  // const moveDetail = (partyId, completed, check) => {
  //   console.log(check);
  //   navigate(`/partydetail/${partyId}`);
  // }

  return (
    <React.Fragment>
      <Mobile>
        <FeedContainer>
          <Header />
          <FeedWrap>
            <Grid padding="70px 3px 100px" flexRow wrap="wrap" justify="left">
              {feedList?.map((d, idx) => {
                return (
                  <Grid 
                    key={idx} 
                    width="158px" 
                    height="158px" 
                    bgImg={d.feedImgUrl} 
                    bgSize="cover"
                    margin="0 3px 6px">
                  </Grid>
                );
              })}
            </Grid>
            {totalPage > curPage ? <div ref={setBottom}></div> : null}
          </FeedWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </FeedContainer>
      </Mobile>
    </React.Fragment>
  );
};

const FeedContainer = styled.div`
  // position: relative;
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
