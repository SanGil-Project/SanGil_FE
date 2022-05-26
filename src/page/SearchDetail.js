import React from "react";
import styled from "styled-components";
import { Grid, Text, Image, Input, Button, Icon } from "../elements/element";
import { CourseCard, Menubar } from "../components/component";
import { actionCreators as mountAction } from "../redux/modules/mountain";
import _ from "lodash";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const SearchDetail = () => {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = React.useState(1);
  const { mountainId } = useParams();
  const dispatch = useDispatch();
  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const [selected, setSelected] = React.useState({ idx: 0, state: false });
  const mountain = useSelector((state) => state.mountain.mountainData);

  const show = (i) => {
    if (selected.state === false) {
      setSelected({ idx: i, state: true });
    } else {
      setSelected({ idx: i, state: false });
    }
  };
  const like = () => {
    dispatch(mountAction.likeDB(mountainId));
  };

  const goCmt = () => {
    navigate(`/detailcomment/${mountainId}`);
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
        <Grid overflowY="scroll" height="100vh" padding="74px 0 0 0">
          <Grid width="93.23%" height="48px" margin="0 auto" isFlex>
            <Grid
              width="35.26%"
              margin="0"
              height="48px"
              flex="flex"
            >
              <Text
                margin="0"
                bold="600"
                size="20px"
                lineHeight="48px"
                maxWidth="200px"
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
          </Grid>
          <Grid width="93.23%" height="20px" margin="0 auto" isFlex>
            <Text margin="0" height="18px" size="1.8rem" lineHeight="18px">
              {mountain?.mountainAddress}
            </Text>

            <Grid height="20px" width="100px" isFlex>
              <Grid width="44px" isFlex _onClick={goCmt}>
                <Icon width="20px" height="20px" type="comment" />
                <Text size="1.4rem" bold="400">
                  ({mountain?.commentDto.commentLists.length})
                </Text>
              </Grid>
              <Grid width="50px" isFlex>
                <Icon width="20px" height="20px" type="star" />
                <Text size="1.4rem" bold="400">
                  ({mountain?.starAvr})
                </Text>
              </Grid>
            </Grid>
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
                      color="#43ca3b"
                    >
                      코스{idx + 1}
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
          <Grid
            width="93.23%"
            height="8px"
            border="4px solid #F2F3F6"
            margin="0 auto"
          />
          <Grid width="340px" height="48px" margin="15px auto">
            <Button
              type="div"
              border="none"
              bgColor="#43CA3B"
              color="#fff"
              width="100%"
              height="48px"
              radius="4px"
              _onClick={goCmt}
            >
              댓글 보러가기
            </Button>
          </Grid>
        </Grid>
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
