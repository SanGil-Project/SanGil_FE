import React from "react";
import { Grid, Icon, Input, Text } from "../elements/element";
import { Header } from "../components/component";
import { useNavigate } from "react-router";
import { searchNameDB } from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Desktop, Mobile } from "../shared/responsive";

const BeforeTracking = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchData = useSelector((state) => state.tracker?.searchList);
  const [name, setName] = React.useState();

  const getName = _.debounce((e) => {
    setName(e.target.value);
  }, 1000);

  React.useEffect(() => {
    if (name) {
      dispatch(searchNameDB(name, 1));
    }
  }, [name]);

  return (
    <>
      <Mobile>
        <Grid width="100vw" margin="0 auto">
          <Header />
          <Grid padding="97px 0 0 0">
            <Grid
              border="1px solid black"
              width="91.46%"
              height="52px"
              margin="0 auto 16px auto"
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
              />
            </Grid>
            {searchData
              ? searchData.map((el, idx) => (
                  <Grid
                    key={idx}
                    height="52px"
                    margin="9px 20px"
                    isFlex
                    hover
                    _onClick={() =>
                      navigate(
                        `/tracker/${searchData[idx].mountain}/${searchData[idx].mountain100Id}`,
                        {
                          replace: true,
                        }
                      )
                    }
                  >
                    <Grid
                      border="1px solid lightgreen"
                      bg="#fff"
                      maxWidth="136px"
                      height="38px"
                      textAlign="center"
                      fontSize="1.8rem"
                      lineHeight="38px"
                      radius="30px"
                      margin="7px 0 7px 10px"
                    >
                      {searchData[idx].mountain}
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
                        {searchData[idx].mountainAddress}
                      </Text>
                    </Grid>
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
      </Mobile>
      <Desktop>
        <Grid width="500px" margin="0 auto">
          <Header />
          <Grid padding="100px 0 0 0" height="1080px">
            <Grid
              border="1px solid black"
              width="91.46%"
              height="52px"
              margin="0 auto 16px auto"
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
            {searchData
              ? searchData.map((el, idx) => (
                  <Grid
                    key={idx}
                    height="52px"
                    margin="9px 0"
                    isFlex
                    hover
                    _onClick={() =>
                      navigate(
                        `/tracker/${searchData[idx].mountain}/${searchData[idx].mountain100Id}`,
                        {
                          replace: true,
                        }
                      )
                    }
                  >
                    <Grid
                      border="1px solid lightgreen"
                      bg="#fff"
                      maxWidth="136px"
                      height="38px"
                      textAlign="center"
                      fontSize="1.8rem"
                      lineHeight="38px"
                      radius="30px"
                      margin="7px 0 7px 10px"
                    >
                      {searchData[idx].mountain}
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
                        {searchData[idx].mountainAddress}
                      </Text>
                    </Grid>
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
      </Desktop>
    </>
  );
};

export default BeforeTracking;
