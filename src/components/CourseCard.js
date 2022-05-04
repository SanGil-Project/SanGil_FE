import React from "react";
import {Grid,Text} from "../elements/element"

const CourseCard = () => {
  return (
    <Grid
      padding="1px 0 0 0"
      width="384px"
      height="210px"
      margin="0 auto"
      bg="#E2E2E2"
    >
      <Text bold="600" size="1.6rem" lineHeight="18px" margin="15px 7px">
        [천국 직행 코스]
      </Text>
      <div>
        <Grid margin="0 0 17px 19px" width="364px" isFlex>
          <Grid
            width="50px"
            height="26px"
            border="1px solid black"
            radius="12px"
            lineHeight="24px"
            size="1.6rem"
            textAlign
            bg="#fff"
          >
            코스
          </Grid>
          <Text
            size="1.6rem"
            margin="0"
            maxWidth="304px"
            wordBreak="break-word"
            bold="500"
          >
            서울대입구역 - 제2야영장 - 백년암수 - 쌍생수 - 장군봉 - 연주대
          </Text>
        </Grid>
        <Grid margin="0 0 18px 19px" maxWidth="130px" isFlex>
          <Grid
            width="50px"
            height="26px"
            border="1px solid black"
            radius="12px"
            lineHeight="24px"
            size="1.6rem"
            textAlign
            bg="#fff"
          >
            거리
          </Grid>
          <Text
            size="1.6rem"
            margin="0"
            maxWidth="80px"
            wordBreak="break-word"
            bold="500"
          >
            3055.5km
          </Text>
        </Grid>
        <Grid margin="0 0 0 19px" maxWidth="154px" isFlex>
          <Grid
            width="80px"
            height="26px"
            border="1px solid black"
            radius="12px"
            lineHeight="24px"
            size="1.6rem"
            textAlign
            bg="#fff"
          >
            소요시간
          </Grid>
          <Text
            size="1.6rem"
            margin="0"
            maxWidth="120px"
            wordBreak="break-word"
            bold="500"
          >
            1500시간
          </Text>
        </Grid>
      </div>
    </Grid>
  );
};

export default CourseCard;
