import React from "react";
import { Grid, Text, Icon } from "../elements/element";
import { Desktop, Mobile } from "../shared/responsive";

const CourseCard = (props) => {
  const { data } = props;
  return (
    <>
      <Grid
        padding="1px 0 0 0"
        width="100%"
        height="180px"
        margin="0 auto 0 auto"
        radius="12px"
      >
        <Grid width="420px" margin="20px 0 0 25px" height="70px" flex="flex">
          <Icon width="20px" height="20px" type="course" />
          <Text width="90%" margin="0 0 0 8px">
            {data.course}
          </Text>
        </Grid>
        <Grid height="20px" width="150px" margin="0 25px" flex="flex">
          <Icon width="20px" height="20px" type="clock" />
          <Text size="1.6rem" width="75%" margin="0 0 0 8px">
            {data.courseTime}
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

export default CourseCard;
