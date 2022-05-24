import React from "react";
import styled from "styled-components";
import { Grid, Input, Text, Image } from "../elements/element";
import { Header, Menubar } from "../components/component";
import { useParams } from "react-router";
import { getCmtDB } from "../redux/modules/feedCmt";
import { useDispatch } from "react-redux";
import _ from "lodash";

const FeedCmt = () => {
  const dispatch = useDispatch();
  const { feedId } = useParams();
  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const [cmt, setCmt] = React.useState(null);

  const getText = (e) => {
    setCmt(e.target.value);
  };

  React.useEffect(() => {
    dispatch(getCmtDB(feedId, 1));
  }, []);

  return (
    <>
      <Header />
      <Grid padding="64px 0 0 0">
        <Grid maxWidth="91.78%" height="80px" margin="25px auto" isFlex>
          <Grid
            border="1px solid #C4C4C4"
            width="86.84%"
            radius="10px"
            height="48px"
          >
            <Input
              radius="10px"
              width="100%"
              border="none"
              margin="0"
              placeholder="댓글을 입력해주세요!"
              _onChange={getText}
            />
          </Grid>
          <Text
            bold="500"
            size="1.6rem"
            color="#959595"
            width="30px"
            align="center"
            hover
          >
            등록
          </Text>
        </Grid>
        <div>
          <Grid width="91.78%" height="90px" margin="10px auto">
            <Grid height="40px" margin="0" flex="flex">
              <Image
                type="circle"
                width="40px"
                height="40px"
                src="https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg"
              />
              <Grid margin="0 0 0 10px" width="89%">
                <Grid height="16px" isFlex>
                  <Text
                    bold="500"
                    size="1.2rem"
                    margin="0"
                    height="12px"
                    lineHeight="12px"
                    color="#43CA3B"
                  >
                    [엄홍길]
                  </Text>
                  <Grid width="60px" isFlex>
                    <Text bold="300" size="1.2rem">
                      수정
                    </Text>
                    <Text bold="300" size="1.2rem" color="#FF7676">
                      삭제
                    </Text>
                  </Grid>
                </Grid>
                <Text bold="700" size="1.6rem" margin="0">
                  닉넴가나다라마바사
                </Text>
              </Grid>
            </Grid>
            <Grid height="50px" margin="0 0 0 11%" width="89%" isFlex>
              <Text bold="500" size="1.6rem">
                여기는 댓글 내용이 들어갑니다
              </Text>
              <Text bold="500" size="1.4rem" color="#C0C0C0">
                2022-03-15
              </Text>
            </Grid>
            <Grid border="1px solid #F2F3F6" height="1px" />
          </Grid>
        </div>
      </Grid>
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
