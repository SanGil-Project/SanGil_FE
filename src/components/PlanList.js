import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as partyActions } from "../redux/modules/party";

import { Grid, Icon, Text } from "../elements/element";
import TextCard from "./TextCard";

const PlanList = (props) => {
  const { userInfo } = props;
  const dispatch = useDispatch();

  const myPartyList = useSelector((state) => state?.party?.myPartyList);
  React.useEffect(() => {
    dispatch(partyActions.getMyPartyDB());
  }, []);

  // 완료되지 않은 모임만 보여주기
  const plans = myPartyList?.filter((p) => p.msg === "true");

  return (
    <React.Fragment>
      <Text bold="600" size="20px" margin="0 0 24px" align="left">
        🗓 {userInfo?.nickname}님의 산길 일정
      </Text>
      <div>
        <Grid margin="0 0 30px">
          {plans?.map((p, idx) => {
            return <TextCard key={idx} data={p} />;
          })}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default PlanList;
