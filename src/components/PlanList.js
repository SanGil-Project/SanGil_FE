import React from "react";
import styled from "styled-components";

import { Grid, Icon, Text } from "../elements/element"
import TextCard from "./TextCard";

const PlanList = (props) => {
  const { userInfo } = props;

  // 테스트용
  const plans = [
    {
      title: "제목1",
      partyId: 1,
      createdAt: "2202-05-08",
      maxPeople: 4,
      curPeople: 2,
      partyDate: "2202-05-10",
      msg: true,
    },
    {
      title: "제목2",
      partyId: 2,
      createdAt: "2202-05-08",
      maxPeople: 5,
      curPeople: 3,
      partyDate: "2202-05-10",
      msg: true,
    },
    {
      title: "제목3",
      partyId: 3,
      createdAt: "2202-05-08",
      maxPeople: 6,
      curPeople: 6,
      partyDate: "2202-05-10",
      msg: true,
    },
    {
      title: "제목4",
      partyId: 4,
      createdAt: "2202-05-08",
      maxPeople: 8,
      curPeople: 2,
      partyDate: "2202-05-10",
      msg: true,
    },
    {
      title: "제목5",
      partyId: 5,
      createdAt: "2202-05-08",
      maxPeople: 10,
      curPeople: 10,
      partyDate: "2202-05-10",
      msg: false,
    },
  ];

  const planList = plans.filter((p) => p.msg === true);


  return (
    <React.Fragment>
      <Text bold="600" size="20px" margin="0 0 24px" align="left">🗓 {userInfo?.username}님의 산길 일정</Text>
      <Grid margin="0 0 30px">
        {planList?.map((p, idx)=>{
          return <TextCard key={idx} data={p}/>
        })}
      </Grid>
    </React.Fragment>
  );
}

export default PlanList;