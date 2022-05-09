import React from "react";
import { Grid, Icon, Input, Text } from "../elements/element";
import { Header } from "../components/component";
import { useNavigate } from "react-router";
import _ from "lodash";

const BeforeTracking = (props) => {
  const navigate = useNavigate();
  const [name, setName] = React.useState();

  const getName = React.useCallback(
    _.debounce((e) => setName(e.target.value), 500),
    []
  );

  return (
    <Grid border="1px solid black" width="414px" margin="0 auto">
      <Header />
      <Grid height="1080px">
        <Grid
          border="1px solid black"
          width="91.46%"
          height="52px"
          margin="96px auto 16px auto"
          radius="40px"
          bg="#ffffff"
          isFlex
        >
          <Icon type="find" width="30px" height="36px" margin="0 14px" />
          <Input
            border="none"
            width="78.71%"
            height="50px"
            size="1.6rem"
            placeholder="어떤 산을 찾고 계신가요?"
            _onChange={getName}
          ></Input>
        </Grid>
        <Grid
          height="52px"
          margin="9px 0"
          isFlex
          hover
          _onClick={() => navigate(`/tracker/${name}`, { replace: true })}
        >
          <Grid
            bg="#fff"
            maxWidth="96px"
            height="38px"
            textAlign="center"
            fontSize="1.8rem"
            lineHeight="38px"
            radius="30px"
            margin="7px 0 7px 10px"
          >
            관악산
          </Grid>
          <Grid height="23px">
            <Text
              maxWidth="250px"
              height="23px"
              margin="0 0 0 10px"
              textOverflow="ellipsis"
              size="1.6rem"
              lineHeight="23px"
            >
              충청남도 서산시 예천동
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BeforeTracking;
