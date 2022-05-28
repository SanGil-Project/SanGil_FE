import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as partyActions } from "../../redux/modules/party";

import { Grid, Icon, Text, Image } from "../../elements/element";
import TextCard from "../card/TextCard";

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
      <Grid height="auto" flexRow justify="left" margin="0 0 24px">
        <Image
          width="24px"
          height="24px"
          src={require("../../assets/images/Plan.png")}
          margin="0 5px 0 0"
        />
        <Text
          bold="600"
          size="20px"
          color="#43CA3B"
          margin="0 5px 0 0"
          width="auto"
        >
          {userInfo?.nickname}
        </Text>
        <Text bold="600" size="20px" margin="0" align="left">
          님의 임박한 산길 일정
        </Text>
      </Grid>
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
