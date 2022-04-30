import React from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element"

const TextCard = (props) => {
  return (
    <React.Fragment>
      <CardContainer>
        <Grid isFlex>
          <Text margin="0" bold="600" size="14px">어디어디 산의 어디 코스</Text>
          <Text margin="0" bold="200" size="12px">4/4명</Text>
        </Grid>
        <Grid isFlex>
          <Text margin="0" bold="400" size="12px">00년 00월 00일</Text>
          <Text margin="0" bold="300" size="12px" color="#c4c4c4">자세한 내용 보기</Text>
        </Grid>
      </CardContainer>
    </React.Fragment>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 63px;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1); 
  padding: 14px 15px;
  margin-top: 10px; 
`;

export default TextCard;