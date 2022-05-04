import React from "react";
import { Grid, Text, Image, Input, Button } from "../elements/element";
import {
  Header,
  CourseCard,
  Star,
  Comment,
  Menubar,
} from "../components/component";
import _ from "lodash";

const SearchDetail = () => {
  const [comment, setComment] = React.useState();
  const cmt = React.useCallback(
    _.debounce((e) => {
      setComment(e.target.value);
    }, 500),
    [comment]
  );
  const arr = [0, 1, 2, 3];

  return (
    <Grid border="1px solid black" width="414px" margin="0 auto">
      <Header />
      <Grid padding="7px" overflowY="scroll" height="844px">
        <Grid
          border="1px solid red"
          maxWidth="386px"
          height="48px"
          margin="40px auto 0 auto"
          isFlex
        >
          <Text bold="400" size="30px" lineHeight="48px" width="200px">
            산이름
          </Text>
          <Grid
            border="1px solid black"
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
        <Grid
          border="1px solid blue"
          maxWidth="386px"
          height="20px"
          margin="24.5px auto 0 auto"
        >
          <Text margin="0" height="18px" size="1.8rem" lineHeight="18px">
            위치: 내용내용내용내용내용
          </Text>
        </Grid>
        <Grid width="386px" height="287px">
          <Image
            width="386px"
            height="287px"
            margin="35px auto 0 auto"
            src="https://www.theguru.co.kr/data/photos/20210937/art_16316071303022_bf8378.jpg"
          />
        </Grid>
        <div>
          <Grid
            border="1px solid green"
            maxWidth="386px"
            margin="60px auto 0 auto"
          >
            {arr.map((cur, idx) => {
              return (
                <div>
                  <Grid key={idx} margin="0 auto 40px auto">
                    <Grid
                      border="1px solid black"
                      maxWidth="385px"
                      height="42px"
                      radius="30px"
                      isFlex
                    >
                      <Text
                        width="44px"
                        height="18px"
                        margin="11px 0 11px 18px"
                        size="1.8rem"
                        bold="600"
                        lineHeight="18px"
                      >
                        코스1
                      </Text>
                      <Text height="18px">연주대연주대 코스코스코스</Text>
                    </Grid>
                    <CourseCard />
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </div>
        <div>
          <Grid margin="35px auto 0 auto" isFlex>
            <Grid
              border="1px solid #C4C4C4"
              maxWidth="330px"
              height="50px"
              margin="0 0 0 7px"
              radius="12px"
              isFlex
            >
              <Input
                border="none"
                margin="1px 0 1px 12px"
                height="46px"
                placeholder="댓글 작성"
                _onChange={cmt}
              />
              <Star
                width="77px"
                height="18px"
                lineHeight="18px"
                starMargin="0 1px"
              />
            </Grid>
            <Button border="none" maxWidth="50px" height="50px" margin="0 1px">
              등록
            </Button>
          </Grid>
        </div>
        {arr.map((el, idx) => {
          return <Comment key={idx} />;
        })}
      </Grid>
      <Menubar />
    </Grid>
  );
};

export default SearchDetail;
