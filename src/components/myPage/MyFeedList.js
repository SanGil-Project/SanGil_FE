import React from "react";
import styled from "@emotion/styled";
import { Grid, Image, Text, Icon } from "../../elements/element";
import { useSelector, useDispatch } from "react-redux";
import { deleteFeedDB, feedLikeDB } from "../../redux/modules/feed";
import { actionCreators as handleActions } from "../../redux/modules/handle";
import { useNavigate } from "react-router";

import Card from "../card/Card";

const MyFeedList = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user?.userInfo);
  const [likeCnt, setLikeCnt] = React.useState(data.goodCnt);
  const [likeState, setLikeState] = React.useState(data.goodStatus);
  const dispatch = useDispatch();

  const like = (feedId) => {
    dispatch(handleActions.myfeedLikeDB(feedId));
    setLikeCnt((prev) => (likeState ? (prev -= 1) : (prev += 1)));
    setLikeState(!likeState);
  };

  const goDetail = () => {
    navigate(`/feeddetail/${data.feedId}`);
  };

  return (
    <React.Fragment>
      <Grid width="auto" margin="0 10px 0 0">
        <Grid hover _onClick={goDetail}>
          <Card
            width="150px"
            height="150px"
            margin="0"
            shadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
          >
            <Image
              width="150px"
              height="150px"
              borderRadius="10px"
              border="none"
              src={data.feedImgUrl}
            />
          </Card>
        </Grid>
        <Grid margin="4px" flexRow justify="left">
          <Grid width="auto" _onClick={() => like(data.feedId)}>
            <Icon
              fillOpacity={likeState ? "1" : "0.2"}
              type="mypageFeedLike"
              width="13px"
              height="12px"
              margin="0 auto"
            />
          </Grid>
          <Text margin="0 4px" size="12px" bold="500" color="#43CA3B">
            {likeCnt}
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
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

export default MyFeedList;
