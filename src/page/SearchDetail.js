import React from "react";
import styled from "styled-components";
import { Grid, Text, Image, Input, Button } from "../elements/element";
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
  const token = sessionStorage.getItem("token");
  const userInfo = useSelector((state) => state.user.userInfo);
  const { mountainId } = useParams();
  const dispatch = useDispatch();
  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const [star, setStar] = React.useState([false, false, false, false, false]);
  const [comment, setComment] = React.useState();

  const [selected, setSelected] = React.useState(false);
  const mountain = useSelector((state) => state.mountain.mountainData);
  const show = (i) => {
    setSelected(i);
  };

  const cmt = React.useCallback(
    _.debounce((e) => {
      setComment(e.target.value);
    }, 500),
    [comment]
  );

  const sendComment = () => {
    dispatch(
      mountAction.addCommentDB(mountainId, {
        mountainComment: comment,
        star: star.filter(Boolean).length,
      })
    );
  };

  React.useEffect(() => {
    dispatch(mountAction.getDetailDB(mountainId, 1));
  }, []);

  return (
    <>
      <Desktop>
        <DetailContainer>
          <Header />
          <Grid height="74px" />
          <Grid overflowY="scroll" height="1080px">
            <Grid width="93.23%" height="48px" margin="0 auto" isFlex>
              <Text bold="400" size="30px" lineHeight="48px" width="200px">
                {mountain?.mountain}
              </Text>
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
                  <Grid width="93.23%" margin="0 auto 0 auto">
                    <Grid height="8px" border="4px solid #F2F3F6"></Grid>
                    <Grid
                      width="52%"
                      height="42px"
                      hover
                      isFlex
                      _onClick={() => show(idx)}
                    >
                      <Text
                        width="60px"
                        height="18px"
                        margin="11px auto 11px 25px"
                        size="1.8rem"
                        bold="600"
                        lineHeight="18px"
                      >
                        코스 {idx + 1}
                      </Text>
                      <Text
                        margin="0 auto"
                        size="1.8rem"
                        height="18px"
                        lineHeight="18px"
                      >
                        {el.courseTime} 코스
                      </Text>
                    </Grid>
                    {selected === idx ? <CourseCard data={el} /> : ""}
                  </Grid>
                </div>
              ))}

            <div>
              <Grid
                width="93.23%"
                height="8px"
                border="4px solid #F2F3F6"
                margin="0 auto"
              ></Grid>
              <Grid width="93.23%" margin="35px auto 0 auto" isFlex>
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
                    placeholder="댓글 작성"
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
            </div>
            {mountain?.commentDto.commentLists.map((el, idx) => {
              return <Comment key={idx} data={el} showIndex={el.star} />;
            })}
          </Grid>
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
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
export default SearchDetail;
