import React from "react";
import styled from "@emotion/styled";
import { Grid, Image, Text, Icon } from "../elements/element";
import { useSelector, useDispatch } from "react-redux";
import { deleteFeedDB, feedLikeDB } from "../redux/modules/feed";

const FeedCard = (props) => {
  const { el } = props;
  const userInfo = useSelector((state) => state.user?.userInfo);
  const dispatch = useDispatch();

  const [liked, setLiked] = React.useState({
    likeCnt: el.goodCnt,
    likeStatus: el.goodStatus,
  });

  const like = (feedId) => {
    liked.likeStatus
      ? setLiked((prev) => ({ likeCnt: prev.likeCnt - 1, likeStatus: false }))
      : setLiked((prev) => ({ likeCnt: prev.likeCnt + 1, likeStatus: true }));
    dispatch(feedLikeDB(feedId));
  };

  const deleteFeed = (feedId) => {
    if (window.confirm("진짜 삭제하시려고요? 이걸?") === true) {
      dispatch(deleteFeedDB(feedId));
    }
  };
  return (
    <DescContainer>
      <Grid height="50px" maxWidth="86%" margin="0 auto 10px auto" isFlex>
        <Grid maxWidth="204px" isFlex>
          <Image
            width="40px"
            height="40px"
            type="circle"
            src={
              el.userImgUrl !== "없음"
                ? el.userImgUrl
                : "https://cdn.newscj.com/news/photo/202009/newscj_%EC%B2%9C%EC%A7%80%EC%9D%BC%EB%B3%B4_774982_810186_5520.jpg"
            }
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
        height="500px"
        objectFit="scale-down"
        borderRadius="4px"
        src={el.feedImgUrl}
      />
      <Grid height="20px" margin="10px auto" maxWidth="86%" isFlex>
        <Grid lineHeight="20px" maxWidth="50px" isFlex>
          <Icon
            type="like"
            width="18px"
            height="18px"
            fill={liked.likeStatus ? "#e54353" : `#c4c4c4`}
            _onClick={() => like(el.feedId)}
          />
          <Text size="1.2rem" bold="500">
            {liked.likeCnt}
          </Text>
        </Grid>

        <Text height="15px" size="1.2rem" color="#C4C4C4">
          15분 전
        </Text>
      </Grid>
      <Grid maxWidth="86%" height="50px" margin="0 auto">
        <Text
          width="100%"
          height="50px"
          lineHeight="25px"
          margin="0"
          wordBreak="break-all"
          ellipsis="2"
        >
          {el.feedContent}
        </Text>
      </Grid>
    </DescContainer>
  );
};

const DescContainer = styled.div`
  width: 100%;
  margin: 0 0 10px 0;
`;

export default FeedCard;
