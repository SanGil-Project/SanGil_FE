import React from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element"
import TextCard from "./TextCard";

const PlanList = (props) => {

  // 테스트용
  const planList = [
    {
      title: "제목",
      createdAt: "00월 00일",
      maxPeople: 4,
      curPeople: 2,
      partyDate: "00년 00월 00일",
    },
    {
      title: "제목",
      createdAt: "00월 00일",
      maxPeople: 4,
      curPeople: 2,
      partyDate: "00년 00월 00일",
    },
    {
      title: "제목",
      createdAt: "00월 00일",
      maxPeople: 4,
      curPeople: 2,
      partyDate: "00년 00월 00일",
    },
    {
      title: "제목",
      createdAt: "00월 00일",
      maxPeople: 4,
      curPeople: 2,
      partyDate: "00년 00월 00일",
    },
  ];

  return (
    <React.Fragment>
      <Text bold="600" size="20px" margin="0 0 24px" align="left">🗓 가나다라마바사아자차 님의 산길 일정</Text>
      <Grid margin="0 0 30px">
        {planList?.map((p, idx)=>{
          return <TextCard key={idx} data={p}/>
        })}
      </Grid>
    </React.Fragment>
  );
}

export default PlanList;