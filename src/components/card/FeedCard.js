import React from "react";
import styled from "@emotion/styled";
import { Grid, Image, Text, Icon } from "../../elements/element";
import { useSelector, useDispatch } from "react-redux";
import { deleteFeedDB, feedLikeDB } from "../../redux/modules/feed";
import { useNavigate } from "react-router";

const FeedCard = (props) => {
  const { el } = props;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user?.userInfo);
  const [hidden, setHidden] = React.useState(false);
  const dispatch = useDispatch();

  const like = (feedId) => {
    dispatch(feedLikeDB(feedId));
  };

  const deleteFeed = (feedId) => {
    if (window.confirm("삭제하시겠습니까?") === true) {
      dispatch(deleteFeedDB(feedId));
    }
  };

  const showHidden = () => {
    setHidden(true);
  };

  const goCmt = () => {
    navigate(`/feeddetail/${el.feedId}`);
  };

  return (
    <DescContainer>
      <Grid height="50px" maxWidth="86%" margin="0 auto 10px auto" isFlex>
        <Grid maxWidth="204px" isFlex>
          {el.userImgUrl !== "없음" ? (
            <Image
              width="40px"
              height="40px"
              type="circle"
              src={el.userImgUrl}
            />
          ) : (
            <Icon width="40px" border="1px solid black" />
          )}
          <Grid height="40px" lineHeight="15px" margin="0 0 0 5px">
            <Text margin="6px 0 0 5px" size="1.2rem" bold="200">
              {el.userTitle}
            </Text>
            <Text margin="0 0 6px 5px" bold="500" size="1.4rem">
              {el.nickname}
            </Text>
          </Grid>
        </Grid>
        {userInfo?.userId === el.userId ? (
          <Grid
            maxWidth="70px"
            lineHeight="50px"
            isFlex
            hover
            _onClick={() => deleteFeed(el.feedId)}
          >
            <Icon width="15px" height="16px" type="delete" />
            <Text bold="500" size="1.2rem">
              삭제하기
            </Text>
          </Grid>
        ) : null}
      </Grid>
      <Image
        border="1px solid #E6E6E8"
        width="100%"
        height="400px"
        objectFit="scale-down"
        borderRadius="4px"
        src={el.feedImgUrl}
      />
      <Grid height="20px" margin="10px auto" maxWidth="86%" isFlex>
        <Grid lineHeight="20px" maxWidth="60px" flex="flex">
          <Icon
            type="like"
            width="18px"
            height="18px"
            fill={el.goodStatus ? "#43ca3b" : `#c4c4c4`}
            _onClick={() => like(el.feedId)}
          />
          <Text size="1.2rem" bold="500" margin="0 0 0 5px">
            {el.goodCnt}
          </Text>
        </Grid>

        <Text height="15px" size="1.2rem" color="#C4C4C4">
          {el.beforeTime}
        </Text>
      </Grid>
      <Grid maxWidth="86%" margin="0 auto" flex="flex">
        <Cmt className={hidden ? "" : "close"}>{el.feedContent}</Cmt>
        {el.feedContent.length > 80 && !hidden ? (
          <Text
            size="1.2rem"
            width="35px"
            margin="28px 0 0 0"
            color="#C4C4C4"
            hover
            _onClick={showHidden}
          >
            더보기
          </Text>
        ) : null}
      </Grid>
      <Text
        width="120px"
        margin="8px 0 8px 35px"
        bold="600"
        size="1.2rem"
        color="#C4C4C4"
        hover
        _onClick={goCmt}
      >
        {!el.commentCnt ? "댓글 작성하기" : `댓글 ${el.commentCnt}개 모두 보기`}
      </Text>
    </DescContainer>
  );
};

const DescContainer = styled.div`
  margin: 0 0 10px 0;
`;

const Cmt = styled.div`
  width: 100%;
  margin: 0;
  line-height: 25px;
  font-size: 1.6rem;
  &.close {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export default FeedCard;
