import React from "react";
import { Star } from "../components/component";
import { Grid, Text, Button } from "../elements/element";
import { Desktop, Mobile } from "../shared/responsive";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mountAction } from "../redux/modules/mountain";

const Comment = (props) => {
  const { data, setUpdateCmt } = props;
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
      <Mobile>
        <div>
          <Grid margin="25px auto">
            <Grid
              width="93.23%"
              height="0"
              border="1px solid #DEDEDE"
              margin="5px auto"
            />
            <Grid
              maxWidth="93.23%"
              margin="23px auto 0 auto"
              height="18px"
              isFlex
            >
              <div>
                <Grid height="18px" lineHeight="18px" isFlex>
                  <Star
                    type="showStar"
                    width="77px"
                    starMargin="0 1px"
                    showIndex={data.star}
                  />
                  <Text
                    maxWidth="57%"
                    height="18px"
                    lineHeight="18px"
                    size="1.4rem"
                  >
                    [data.userTitle] {data.username}
                  </Text>
                </Grid>
              </div>
              <Text bold="500" size="1.4rem" lineHeight="18px">
                2022.05.03
              </Text>
            </Grid>
            <Grid maxWidth="93.23%" margin="12px 0 0 14px" height="18px" isFlex>
              <div>
                <Text size="1.8rem" bold="500" height="18px" lineHeight="18px">
                  타다가 천국행
                </Text>
              </div>
              <Grid border="1px solid red" width="44px" isFlex></Grid>
            </Grid>
          </Grid>
        </div>
      </Mobile>

      <Desktop>
        <div>
          <Grid margin="25px auto">
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
            <Grid
              maxWidth="93.23%"
              margin="12px auto 23px auto"
              height="18px"
              isFlex
            >
              <div>
                <Text size="1.8rem" bold="500" height="18px" lineHeight="18px">
                  {data.mountainComment}
                </Text>
              </div>
              <Grid width="64px" isFlex>
                {data.userId === userInfo.userId ? (
                  <>
                    {" "}
                    <Button
                      fontSize="1.2rem"
                      type="div"
                      width="30px"
                      height="18px"
                      color="#AEAEAE"
                      border="none"
                      _onClick={update}
                    >
                      수정
                    </Button>
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

        <div>
          <Grid margin="25px auto">
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
            <Grid
              maxWidth="93.23%"
              margin="12px auto 23px auto"
              height="18px"
              isFlex
            >
              <div>
                <Text size="1.8rem" bold="500" height="18px" lineHeight="18px">
                  {data.mountainComment}
                </Text>
              </div>
              <Grid width="64px" isFlex>
                {data.userId === userInfo.userId ? (
                  <>
                    {" "}
                    <Button
                      fontSize="1.2rem"
                      type="div"
                      width="30px"
                      height="18px"
                      color="#AEAEAE"
                      border="none"
                      _onClick={update}
                    >
                      수정
                    </Button>
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
      </Desktop>
    </>
  );
};

export default Comment;
