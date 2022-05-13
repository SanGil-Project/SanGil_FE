import { el } from "date-fns/locale";
import React from "react";
import { Grid, Text } from "../elements/element";
import { Desktop, Mobile } from "../shared/responsive";

const CourseCard = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <>
      <Desktop>
        <Grid
          padding="1px 0 0 0"
          width="100%"
          height="210px"
          margin="18px auto 0 auto"
          radius="12px"
        >
          <Grid margin="20px 0 0 0" height="70px" isFlex>
            <Grid
              border="0.5px solid #ADADAD"
              width="50px"
              height="26px"
              lineHeight="26px"
              radius="12px"
              margin="0 0 0 25px"
              fontSize="1.6rem"
              textAlign="center"
            >
              코스
            </Grid>
            <Text width="84%" margin="0 0 0 8px">{data.course}</Text>
          </Grid>
          <Grid height="70px" isFlex>
            <Grid
              border="0.5px solid #ADADAD"
              width="80px"
              height="26px"
              lineHeight="26px"
              radius="12px"
              margin="0 0 0 25px"
              fontSize="1.6rem"
              textAlign="center"
            >
              소요시간
            </Grid>
            <Text size="1.6rem" width="75%" margin="0 0 0 8px">
              {data.courseTime}
            </Text>
          </Grid>
        </Grid>
      </Desktop>
    </>
  );
};

export default CourseCard;
