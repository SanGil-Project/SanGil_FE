import React from "react";
import { Grid, Text, Image, Input, Button } from "../elements/element";
import {
  Header,
  CourseCard,
  Star,
  Comment,
  Menubar,
} from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import _ from "lodash";
import { useParams } from "react-router";

const SearchDetail = () => {
  const { name } = useParams();
  const [comment, setComment] = React.useState();
  const [selected, setSelected] = React.useState(false);

  const show = (i) => {
    setSelected(i);
  };

  const cmt = React.useCallback(
    _.debounce((e) => {
      setComment(e.target.value);
    }, 500),
    [comment]
  );
  const arr = [0, 1, 2, 3];

  return (
    <>
      <Mobile>
        <Grid border="1px solid black" width="100vw" margin="0 auto">
          <Header />
          <Grid
            margin="56px 0 0 0"
            padding="7px"
            overflowY="scroll"
            height="844px"
          >
            <Grid
              maxWidth="93.23%"
              height="48px"
              margin="40px auto 0 auto"
              isFlex
            >
              <Text bold="400" size="30px" lineHeight="48px" width="200px">
                {name}
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
            <Grid maxWidth="93.23%" height="20px" margin="24.5px auto 0 auto">
              <Text margin="0" height="18px" size="1.8rem" lineHeight="18px">
                위치: 내용내용내용내용내용
              </Text>
            </Grid>
            <Grid width="93.23%" height="34%" margin="0 auto">
              <Image
                width="100%"
                height="100%"
                margin="10px auto 0 auto"
                src="https://cdn.cashfeed.co.kr/attachments/ed4679c002.jpg"
                objectFit="scale-down"
              />
            </Grid>

            <div>
              <Grid maxWidth="93.23%" margin="60px auto 0 auto">
                {arr.map((cur, idx) => {
                  return (
                    <Grid
                      width="100%"
                      key={idx}
                      margin="0 0 40px 0"
                      hover
                      _onClick={() => show(idx)}
                    >
                      <Grid
                        border="1px solid green"
                        width="100px"
                        height="42px"
                        radius="30px"
                        isFlex
                      >
                        <Text
                          width="50px"
                          height="18px"
                          margin="11px auto 11px auto"
                          size="1.8rem"
                          bold="600"
                          lineHeight="18px"
                        >
                          코스{idx + 1}
                        </Text>
                      </Grid>
                      {selected === idx ? <CourseCard /> : ""}
                    </Grid>
                  );
                })}
              </Grid>
            </div>
            <div>
              <Grid maxWidth="93.23%" margin="35px auto 0 auto" isFlex>
                <Grid
                  border="1px solid #C4C4C4"
                  maxWidth="79.71%"
                  height="50px"
                  margin="0 0 0 7px"
                  radius="12px"
                  isFlex
                >
                  <Input
                    border="none"
                    width="92.12%"
                    margin="1px 0 1px 12px"
                    height="46px"
                    placeholder="댓글 작성"
                    _onChange={cmt}
                  />
                  <Star
                    width="63px"
                    minWidth="63px"
                    height="18px"
                    lineHeight="18px"
                    starMargin="0 1px"
                  />
                </Grid>
                <Button
                  border="1px solid black"
                  width="62px"
                  height="50px"
                  margin="0 1px"
                >
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
      </Mobile>

      <Desktop>
        <Grid border="1px solid black" width="414px" margin="0 auto">
          <Header />
          <Grid
            margin="56px 0 0 0"
            padding="7px"
            overflowY="scroll"
            height="1080px"
          >
            <Grid
              border="1px solid red"
              maxWidth="386px"
              height="48px"
              margin="40px auto 0 auto"
              isFlex
            >
              <Text bold="400" size="30px" lineHeight="48px" width="200px">
                {name}
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
                src="https://cdn.cashfeed.co.kr/attachments/ed4679c002.jpg"
              />
            </Grid>
            <div>
              <Grid maxWidth="386px" margin="60px auto 0 auto">
                {arr.map((cur, idx) => {
                  return (
                    <Grid
                      width="100px"
                      key={idx}
                      margin="0 0 40px 0"
                      hover
                      _onClick={() => show(idx)}
                    >
                      <Grid
                        border="1px solid green"
                        width="100px"
                        height="42px"
                        radius="30px"
                        isFlex
                      >
                        <Text
                          width="50px"
                          height="18px"
                          margin="11px auto 11px auto"
                          size="1.8rem"
                          bold="600"
                          lineHeight="18px"
                        >
                          코스{idx + 1}
                        </Text>
                      </Grid>
                      {selected === idx ? <CourseCard /> : ""}
                    </Grid>
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
                <Button
                  border="none"
                  maxWidth="50px"
                  height="50px"
                  margin="0 1px"
                >
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
      </Desktop>
    </>
  );
};

export default SearchDetail;
