import React from "react";
import styled from "styled-components";
import { Grid, Text, Image, Input, Button, Icon } from "../elements/element";
import {
  Header,
  CourseCard,
  Star,
  Comment,
  Menubar,
} from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import { actionCreators as mountAction } from "../redux/modules/mountain";
import _ from "lodash";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const SearchDetail = () => {
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
  const [selected, setSelected] = React.useState({ idx: 0, state: false });
  // const mountain = useSelector((state) => state.mountain.mountainData);

  const show = (i) => {
    if (selected.state === false) {
      setSelected({ idx: i, state: true });
    } else {
      setSelected({ idx: i, state: false });
    }
  };

  const cmt = React.useCallback(
    _.debounce((e) => {
      setComment(e.target.value);
    }, 500),
    [comment]
  );

  const sendComment = () => {
    if (updateCmt.state) {
      dispatch(
        mountAction.addCommentDB(mountainId, {
          mountainComment: comment,
          star: star.filter(Boolean).length,
        })
      );
      setComment("");
      setPageNum(mountain?.commentDto.totalPage);
    } else {
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

  const like = () => {
    dispatch(mountAction.likeDB(mountainId));
  };

  // React.useEffect(() => {
  //   if (
  //     !mountain?.commentDto.totalPage ||
  //     mountain?.commentDto.totalPage >= pageNum
  //   ) {
  //     dispatch(mountAction.getDetailDB(mountainId, pageNum));
  //   }
  // }, [pageNum]);

  const mountain = {
    courseLists: [
      {
        courseTime: "4시간",
        course: "호랑이-펭귄-사자-토끼-고양이-강아지-천누리",
      },
      {
        courseTime: "4시간 40분",
        course: "호랑이-펭귄-사자-토끼-고양이-강아지-천누리",
      },
    ],
  };

  return (
    <>
      <Desktop>
        <DetailContainer>
          <Header />
          <Grid height="74px" />
          <Grid overflowY="scroll" height="100vh">
            <Grid width="93.23%" height="48px" margin="0 auto" isFlex>
              <Grid width="30.26%" margin="0" height="48px" flex="flex">
                <Text
                  margin="0"
                  bold="400"
                  size="30px"
                  lineHeight="48px"
                  maxWidth="100px"
                >
                  {mountain?.mountain}
                </Text>
                <Icon
                  type="like"
                  width="18px"
                  margin="0 10px"
                  _onClick={like}
                  fill={mountain?.bookmark ? "#43ca3b" : "#c4c4c4"}
                />
              </Grid>
              <Grid
                width="90px"
                height="40px"
                margin="4px 0"
                fontSize="1.6rem"
                textAlign
                lineHeight="40px"
                bg="#C4C4C4"
              >
                날씨
              </Grid>
            </Grid>
            <Grid width="93.23%" height="20px" margin="24.5px auto 0 auto">
              <Text margin="0" height="18px" size="1.8rem" lineHeight="18px">
                위치: {mountain?.mountainAddress}
              </Text>
            </Grid>
            <Grid width="93.23%" height="26.57%" margin="25px auto 20px auto">
              <Image
                width="100%"
                height="100%"
                src={mountain?.mountainImgUrl}
                objectFit="fill"
                borderRadius="12px"
              />
            </Grid>

            {mountain &&
              mountain.courseLists.map((el, idx) => (
                <div key={idx}>
                  <Grid width="93.23%" margin="0 auto">
                    <Grid height="8px" border="4px solid #F2F3F6"></Grid>
                    <Grid
                      bg={
                        selected.idx === idx && selected.state
                          ? "#FFFFFF"
                          : "#F5FCF4"
                      }
                      height="42px"
                      hover
                      flex="flex"
                      _onClick={() => show(idx)}
                    >
                      <Text
                        width="60px"
                        height="18px"
                        margin="11px 15px 11px 25px"
                        size="1.8rem"
                        bold="600"
                        lineHeight="18px"
                      >
                        코스 {idx + 1}
                      </Text>
                      <Text size="1.8rem" height="18px" lineHeight="18px">
                        {el.courseTime} 코스
                      </Text>
                    </Grid>
                    {selected.idx === idx && selected.state ? (
                      <Grid height="1px" border="0.5px solid #F2F3F6"></Grid>
                    ) : null}
                    {selected.idx === idx && selected.state ? (
                      <CourseCard data={el} />
                    ) : (
                      ""
                    )}
                  </Grid>
                </div>
              ))}

            <div>
              <Grid
                width="93.23%"
                height="8px"
                border="4px solid #F2F3F6"
                margin="0 auto"
              />
              {updateCmt.state ? (
                <Grid width="93.23%" margin="23px auto 0 auto" isFlex>
                  <Grid
                    border="1px solid #C4C4C4"
                    maxWidth="330px"
                    height="50px"
                    margin="0 0 0 7px"
                    radius="12px"
                    isFlex
                  >
                    <Input
                      gridWidth="230px"
                      border="none"
                      margin="1px 0"
                      height="46px"
                      placeholder="댓글과 별점을 남겨보세요!"
                      _onChange={cmt}
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
                <Grid width="93.23%" margin="23px auto 0 auto" isFlex>
                  <Grid
                    border="1px solid #C4C4C4"
                    maxWidth="330px"
                    height="50px"
                    margin="0 0 0 7px"
                    radius="12px"
                    isFlex
                  >
                    <Input
                      gridWidth="230px"
                      border="none"
                      margin="1px 100px 0 0"
                      height="46px"
                      defaultValue={updateCmt.content}
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
            </div>
            <div>
              {/* <Grid>
                {mountain?.commentDto.commentLists.map((el, idx) => {
                  return (
                    <Comment
                      key={idx}
                      data={el}
                      setUpdateCmt={setUpdateCmt}
                      updateCmt={updateCmt.state}
                    />
                  );
                })}
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
              </Grid> */}
            </div>
          </Grid>

          <Grid height="88px" />
          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </DetailContainer>
      </Desktop>
    </>
  );
};

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  // min-width: 414px;
  max-width: 500px;
  margin: auto;
  background-color: #fff;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
export default SearchDetail;
