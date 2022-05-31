import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Input, Button, ElInput } from "../elements/element";
import { Header, Star, Comment, Menubar } from "../components/component";
import { actionCreators as mountAction } from "../redux/modules/mountain";
import _ from "lodash";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const DetailCmt = () => {
  const [pageNum, setPageNum] = React.useState(1);
  const { mountainId } = useParams();
  const dispatch = useDispatch();
  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const [star, setStar] = React.useState([false, false, false, false, false]);
  const [comment, setComment] = React.useState();
  const [updateCmt, setUpdateCmt] = React.useState({
    content: "",
    mountainCommentId: 0,
    state: true,
  });
  const mountain = useSelector((state) => state.mountain.mountainData);
  const cmt = _.debounce((e) => {
    setComment(e.target.value);
  }, 500);

  const sendComment = () => {
    if (updateCmt.state) {
      if (comment === "" || !comment) {
        return alert("댓글을 입력해주세요");
      }
      if (star.filter(Boolean).length === 0) {
        return alert("별점을 선택해주세요");
      } else {
        dispatch(
          mountAction.addCommentDB(mountainId, {
            mountainComment: comment,
            star: star.filter(Boolean).length,
          })
        );
      }
      setComment("");
      setPageNum(mountain?.commentDto.totalPage);
    } else {
      if (comment === "" || !comment) {
        return alert("댓글을 입력해주세요");
      }
      dispatch(
        mountAction.updateCmtDB({
          mountainCommentId: updateCmt.mountainCommentId,
          mountainComment: comment,
        })
      );
      setUpdateCmt({ content: "", state: true, mountainCommentId: 0 });
      setComment("");
    }
  };

  const next = () => {
    if (mountain?.commentDto.totalPage >= pageNum) {
      setPageNum((prev) => prev + 1);
    } else {
      alert("마지막 댓글입니다");
    }
  };

  const prev = () => {
    if (mountain?.commentDto.currentPage !== 0) {
      setPageNum((prev) => prev - 1);
    }
  };

  React.useEffect(() => {
    if (
      !mountain?.commentDto.totalPage ||
      mountain?.commentDto.totalPage >= pageNum
    ) {
      dispatch(mountAction.getDetailDB(mountainId, pageNum));
    }
  }, [pageNum]);

  return (
    <>
      <DetailContainer>
        <Header />
        <Grid height="64px" />
        <Grid height="60px" margin="10px auto">
          {updateCmt.state ? (
            <Grid width="93.23%" margin="0 auto" isFlex>
              <Grid
                border="1px solid #C4C4C4"
                maxWidth="330px"
                height="50px"
                margin="0 0 0 7px"
                radius="12px"
                isFlex
              >
                <ElInput
                  width="70%"
                  height="46px"
                  size="1.6rem"
                  border="none"
                  value={comment || ""}
                  margin="1px 0 0 5px"
                  placeholder="댓글과 별점을 남겨보세요!"
                  _onChange={(e) => setComment(e.target.value)}
                />
                <Star
                  width="77px"
                  height="18px"
                  lineHeight="18px"
                  starMargin="0 1px"
                  setStar={setStar}
                />
              </Grid>
              <Button
                border="none"
                maxWidth="50px"
                height="50px"
                margin="0 1px"
                _onClick={sendComment}
              >
                등록
              </Button>
            </Grid>
          ) : (
            <Grid width="93.23%" margin="0 auto" isFlex>
              <Grid
                border="1px solid #C4C4C4"
                maxWidth="330px"
                height="50px"
                margin="0 0 0 7px"
                radius="12px"
                isFlex
              >
                <ElInput
                  width="70%"
                  height="46px"
                  size="1.6rem"
                  border="none"
                  margin="1px 0 0 5px"
                  _onChange={cmt}
                />
              </Grid>
              <Button
                border="none"
                maxWidth="50px"
                height="50px"
                margin="0 1px"
                _onClick={sendComment}
              >
                수정
              </Button>
            </Grid>
          )}
        </Grid>
        <div>
          <Grid>
            {mountain?.commentDto.commentLists.map((el, idx) => (
              <Comment
                key={idx}
                data={el}
                setUpdateCmt={setUpdateCmt}
                updateCmt={updateCmt.state}
              />
            ))}
            <Grid
              margin="0 auto"
              isFlex
              maxWidth={
                mountain?.commentDto.currentPage === 0 ||
                mountain?.commentDto.currentPage + 1 ===
                  mountain?.commentDto.totalPage
                  ? "40px"
                  : "90px"
              }
            >
              {mountain?.commentDto.currentPage !== 0 ? (
                <Button
                  border="none"
                  type="div"
                  bgColor="#43ca3b"
                  width="40px"
                  fontSize="1.2rem"
                  height="15px"
                  color="#fff"
                  radius="10px"
                  hover
                  _onClick={prev}
                >
                  이전
                </Button>
              ) : null}
              {mountain?.commentDto.totalPage === 0 ||
              mountain?.commentDto.currentPage + 1 ===
                mountain?.commentDto.totalPage ? null : (
                <Button
                  border="none"
                  type="div"
                  bgColor="#43ca3b"
                  width="40px"
                  fontSize="1.2rem"
                  height="15px"
                  color="#fff"
                  radius="10px"
                  hover
                  _onClick={next}
                >
                  다음
                </Button>
              )}
            </Grid>
          </Grid>
        </div>

        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor} />
          </Grid>
        </MenubarContainer>
      </DetailContainer>
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
export default DetailCmt;
