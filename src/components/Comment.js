import React from "react";
import { Star } from "../components/component";
import { Grid, Text, Button } from "../elements/element";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mountAction } from "../redux/modules/mountain";

const Comment = (props) => {
  const { data, setUpdateCmt, updateCmt } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const deleteCmt = () => {
    if (window.confirm("해당 댓글을 정말 삭제하시겠습니까?") === true) {
      dispatch(mountAction.deleteCmtDB(data.mountainCommentId));
    }
  };

  const update = () => {
    setUpdateCmt({
      content: data.mountainComment,
      state: false,
      mountainCommentId: data.mountainCommentId,
    });
  };

  return (
    <>
      <div>
        <Grid margin="25px auto 0 auto">
          <Grid maxWidth="93.23%" margin="0 auto 0 auto" height="18px" isFlex>
            <div>
              <Grid height="18px" lineHeight="18px" isFlex>
                <Star
                  type="showStar"
                  width="77px"
                  starMargin="0 1px"
                  showIndex={data.star}
                />
                <Text
                  maxWidth="220px"
                  height="18px"
                  lineHeight="18px"
                  size="1.4rem"
                >
                  [{data.userTitle}] {data.nickname}
                </Text>
              </Grid>
            </div>
            <Text bold="500" size="1.4rem" lineHeight="18px">
              {data?.createdAt?.split("T")[0]}
            </Text>
          </Grid>
          <Grid maxWidth="93.23%" margin="0 auto" isFlex>
            <Text
              width="84%"
              size="1.8rem"
              bold="500"
              lineHeight="18px"
              wordBreak="break-all"
            >
              {data.mountainComment}
            </Text>

            <Grid width="64px" isFlex>
              {data.userId === userInfo.userId ? (
                <>
                  <Button
                    fontSize="1.2rem"
                    type="div"
                    width="30px"
                    height="18px"
                    color="#AEAEAE"
                    border="none"
                    // _onClick={update}
                  >
                    수정
                  </Button>
                  {updateCmt ? (
                    <Button
                      fontSize="1.2rem"
                      type="div"
                      width="30px"
                      height="18px"
                      color="#AEAEAE"
                      border="none"
                      _onClick={deleteCmt}
                    >
                      삭제
                    </Button>
                  ) : null}
                </>
              ) : null}
            </Grid>
          </Grid>
          <Grid
            width="93.23%"
            height="0"
            border="1px solid #DEDEDE"
            margin="5px auto"
          />
        </Grid>
      </div>
    </>
  );
};

export default Comment;
