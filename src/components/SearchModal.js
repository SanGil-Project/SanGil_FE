import React from "react";
import styled from "styled-components";

import { Grid, Icon, Input, Text, Button } from "../elements/element";
// import { Header } from "../components/component";
import { useNavigate } from "react-router";
import { searchNameDB } from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const SearchModal = (props) => {
  // selectMnt={selectMnt}/>
  const { onClose, selectMnt } = props;
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.tracker?.searchList);
  console.log(searchData);
  const [name, setName] = React.useState();

  const getName = _.debounce((e) => {
    setName(e.target.value);
  }, 1000);

  React.useEffect(() => {
    if (name) {
      dispatch(searchNameDB(name, 1));
    }
  }, [name]);

  const selectMt = (data) => {
    props.selectMnt(data);
    onClose(false);
  }

  return (
    <SearchModalContainer>
      <Grid>         
        <Grid>
          {searchData
            ? searchData.map((el, idx) => (
                <Grid
                  key={idx}
                  margin="18px 10px"
                  isFlex
                  hover
                  _onClick={() => {selectMt(el)}}
                >
                  <Grid
                    border="1px solid #636363"
                    bg="#fff"
                    width="auto"
                    height="38px"
                    textAlign="center"
                    radius="30px"
                    padding="10px 20px"
                    margin="0 16px 0 0"
                  >
                    <Text margin="0" width="auto">{searchData[idx].mountain}</Text>
                  </Grid>
                  <Grid height="23px">
                    <Text
                      margin="0"
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
        <Grid
          height="55px"
          padding="15px 13px" 
          border="1px solid #636363"
          radius="40px"
          bg="#fff"
          isFlex
        >
          <Icon type="searchIcon" width="30px" height="37px" margin="0 auto" />
          <Input
            width="100%" border="none" padding="0" margin="0 5.5px"
            size="1.6rem"
            placeholder="어떤 산을 찾고 계신가요?"
            _onChange={getName}
          ></Input>
          <Button border="none" width="50px" _onClick={()=>{onClose(false);}}>취소</Button>
        </Grid>
      </Grid>

    </SearchModalContainer>
  );
};

const SearchModalContainer = styled.div`
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: #eee;
  padding: 10px
`;

export default SearchModal;
