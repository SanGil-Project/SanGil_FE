import React from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element"
import TextCard from "./TextCard";

const Section = (props) => {
  return (
    <React.Fragment>
      <Text bold="600" size="20px" margin="0 0 24px" align="left">🗓 가나다라마바사아자차 님의 산길 일정</Text>
      <Grid>
        <TextCard />
        <TextCard />
      </Grid>
    </React.Fragment>
  );
}

export default Section;