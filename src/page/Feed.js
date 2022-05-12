import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Icon, Button } from "../elements/element";
import { Header, Menubar, FeedCard } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import { useSelector, useDispatch } from "react-redux";
import { getFeedDB, feedLikeDB } from "../redux/modules/feed";
import { useNavigate } from "react-router";
import { deleteFeedDB } from "./../redux/modules/feed";

const FeedDetail = () => {
  const userInfo = useSelector((state) => state.user?.userInfo);
  const feedList = useSelector((state) => state.feed.feedList?.feedList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuColor = [true, false, false, false, false]; // 메뉴바 색

  React.useEffect(() => {
    dispatch(getFeedDB());
  }, []);

  return (
    <>
      <Mobile>
        <FeedContainer>
          <Header />
          <Grid overflowY="scroll">
            <Grid height="50px" margin="82px 0 0 0">
              <Grid width="86%" margin="0 auto" isFlex>
                <Grid maxWidth="204px" isFlex>
                  <Image
                    width="25px"
                    height="25px"
                    type="circle"
                    src="https://cdn.newscj.com/news/photo/202009/newscj_%EC%B2%9C%EC%A7%80%EC%9D%BC%EB%B3%B4_774982_810186_5520.jpg"
                  />
                  <Grid height="40px" margin="0 0 0 5px">
                    <Text margin="6px 0 0 5px" size="0.9rem" bold="200">
                      칭호
                    </Text>
                    <Text margin="0 0 6px 5px" bold="500" size="1.2rem">
                      호랑이
                    </Text>
                  </Grid>
                </Grid>
                <Grid maxWidth="70px" lineHeight="50px" isFlex hover>
                  <Icon width="15px" height="16px" type="delete" />
                  <Text bold="500" size="1.2rem">
                    삭제하기
                  </Text>
                </Grid>
              </Grid>
            </Grid>
            <Image
              width="100%"
              height="414px"
              margin="10px 0"
              objectFit="scale-down"
              src="https://image.fmkorea.com/files/attach/new/20190717/340354/680568534/2000329228/99b983892094b5c6d2fc3736e15da7d1.jpeg"
            />
            <Grid height="20px" margin="0 auto" width="90.33%" isFlex>
              <Icon type="like" width="18px" height="18px" />
              <Text height="15px" size="1.2rem" color="#C4C4C4">
                15분 전
              </Text>
            </Grid>
          </Grid>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </FeedContainer>
      </Mobile>

      {/* 데스크탑 */}
      <Desktop>
        <FeedContainer>
          <Header />
          <Grid overflowY="scroll" height="1080px">
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
