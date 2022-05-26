import React from "react";
import styled from "styled-components";
import { Grid, Input, Text, Image, Icon } from "../elements/element";
import { Header, Menubar } from "../components/component";
import { useNavigate, useParams } from "react-router";
import {
  getDetailDB,
  detailLikeDB,
  addCmtDB,
  deleteDB,
  deleteCmtDB,
} from "../redux/modules/feedDetail";

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { deleteFeedDB } from "../redux/modules/feed";

const FeedCmt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feedDetail = useSelector((state) => state.feedDetail?.feed);
  const feedCmt = useSelector(
    (state) => state.feedDetail.feed?.feedCommentListDto
  );
  const userId = useSelector((state) => state.user.userInfo?.userId);
  const { feedId } = useParams();
  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const [cmt, setCmt] = React.useState(null);

  const detailLike = () => {
    dispatch(detailLikeDB(feedId));
  };

  const getText = (e) => {
    setCmt(e.target.value);
  };

  const addCmt = () => {
    if (cmt) {
      dispatch(addCmtDB(feedId, cmt));
    } else {
      alert("댓글을 입력해주세요");
    }
  };

  const deleteDetail = async () => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      await dispatch(deleteFeedDB(feedId));
      alert("삭제되었습니다");
      navigate("/main", { replace: true });
    }
  };

  const deleteCmt = (feedCommentId) => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      dispatch(deleteCmtDB(feedCommentId));
    }
  };

  React.useEffect(() => {
    dispatch(getDetailDB(feedId, 1));
  }, []);

  return (
    <>
      <Header />
      <Grid padding="64px 0 88px 0" overflowY="scroll">
        <div>
          <Grid maxWidth="91.78%" margin="0 auto">
            <Grid width="93.23%" height="52px" margin="10px auto 0 auto" isFlex>
              <Grid width="190px" flex="flex">
                {feedDetail?.userImageUrl !== "없음" ? (
                  <Image
                    width="40px"
                    height="40px"
                    type="circle"
                    src={feedDetail?.userImageUrl}
                  />
                ) : (
                  <Icon width="40px" height="40px" />
                )}
                <Grid
                  width="130px"
                  height="40px"
                  margin="0 0 0 10px"
                  padding="2px 0"
                >
                  <Text margin="0" bold="300" size="1.2rem">
                    {feedDetail?.userTitle}
                  </Text>
                  <Text margin="0" bold="600" size="1.2rem">
                    {feedDetail?.nickname}
                  </Text>
                </Grid>
              </Grid>
              {userId === feedDetail?.userId ? (
                <Icon
                  type="delete"
                  width="20"
                  height="22px"
                  hover
                  _onClick={deleteDetail}
                />
              ) : null}
            </Grid>
          </Grid>
        </div>
        <Grid border="1px solid #e1e1e1" height="500px" margin="10px 0">
          <Image
            width="100%"
            height="100%"
            objectFit="contain"
            src={feedDetail?.feedImageUrl}
          />
        </Grid>
        <Grid maxWidth="91.78%" height="25px" margin="20px auto" isFlex>
          <Grid width="68px" flex="flex">
            <Icon
              type="like"
              width="20px"
              height="20px"
              fill={feedDetail?.goodStatus ? "#43ca3b" : "#c4c4c4"}
              _onClick={detailLike}
            />
            <Text margin="0 0 0 10px">{feedDetail?.goodCnt}</Text>
          </Grid>
          <Text size="1.2rem" bold="600" color="#C4C4C4">
            {feedDetail?.beforeTime}
          </Text>
        </Grid>
        <div>
          <Grid maxWidth="91.78%" margin="0 auto">
            <Text bold="500" size="1.6rem" wordBreak="break-all" margin="0">
              {feedDetail?.feedContent}
            </Text>
          </Grid>
        </div>
        <Grid maxWidth="91.78%" height="80px" margin="25px auto" isFlex>
          <Grid
            border="1px solid #C4C4C4"
            width="86.84%"
            radius="10px"
            height="48px"
            padding="0 0 0 10px"
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
            margin="0 15px 0 0"
            bold="500"
            size="1.6rem"
            color={cmt ? "#43CA3B" : "#959595"}
            _onClick={addCmt}
            width="30px"
            align="center"
            hover
          >
            등록
          </Text>
        </Grid>
        <div>
          {feedCmt?.commentResponseDtos.map((el, idx) => (
            <Grid width="91.78%" height="100px" margin="10px auto">
              <Grid height="40px" margin="0" flex="flex">
                {el.userImgUrl !== "없음" ? (
                  <Image
                    type="circle"
                    width="40px"
                    height="40px"
                    src={el.userImgUrl}
                  />
                ) : (
                  <Icon width="40px" height="40px" />
                )}
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
                      [{el.userTitle}]
                    </Text>
                    {el.userId === userId ? (
                      <Grid width="60px" isFlex>
                        <Text bold="300" size="1.2rem">
                          수정
                        </Text>
                        <Text
                          bold="300"
                          size="1.2rem"
                          color="#FF7676"
                          hover
                          _onClick={() => deleteCmt(el.commentId)}
                        >
                          삭제
                        </Text>
                      </Grid>
                    ) : null}
                  </Grid>
                  <Text bold="700" size="1.6rem" margin="0">
                    {el.nickname}
                  </Text>
                </Grid>
              </Grid>
              <Grid height="50px" margin="0 0 0 11%" width="89%" isFlex>
                <Text bold="500" size="1.6rem">
                  {el.feedComment}
                </Text>
                <Text bold="500" size="1.4rem" color="#C0C0C0">
                  {el.beforeTime}
                </Text>
              </Grid>
              <Line />
            </Grid>
          ))}
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

const Line = styled.hr`
  border: 1px solid #d2d2d2;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
export default FeedCmt;
