import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { Grid, Icon, Text } from "../elements/element"

const TextCard = (props) => {

  const { data } = props;
  const navigate = useNavigate();

  const moveDetail = (partyId) => {
    navigate(`/partydetail/${partyId}`, {state: {partyId: partyId}});
  }

  return (
    <React.Fragment>
      <CardContainer>
        <Grid _onClick={()=>{moveDetail(data.partyId)}} hover>
          <Grid isFlex height="auto" margin="0 0 4px">
            <Text margin="0" bold="600" size="14px">{data.title}</Text>
            <Text margin="0" bold="200" size="12px">{data.curPeople}/{data.maxPeople}명</Text>
          </Grid>
          <Grid isFlex height="auto">
            <Text margin="0" bold="400" size="12px">{data.partyDate}</Text>
            <Text margin="0" bold="300" size="12px" color="#c4c4c4">자세한 내용 보기</Text>
          </Grid>
        </Grid>
      </CardContainer>
    </React.Fragment>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1); 
  padding: 14px 15px;
  margin-top: 10px; 
`;

export default TextCard;