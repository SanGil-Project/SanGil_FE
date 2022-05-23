import React from "react";
import styled from "styled-components";

import { Grid, Icon, Input, Text, Button } from "../elements/element";
// import { Header } from "../components/component";
import { useNavigate } from "react-router";
import { searchNameDB } from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const SearchModal = (props) => {
  const { onClose, selectMnt } = props;
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.tracker?.searchList);
  const [name, setName] = React.useState("");

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
        <Grid isFlex>
          <Grid
            height="55px"
            padding="15px 13px" 
            border="1px solid #D2D2D2"
            radius="12px"
            bg="#fff"
            isFlex
          >
            <Icon type="searchIcon" width="30px" height="37px" margin="0 auto" />
            <Input
              width="100%" border="none" padding="0" margin="0 5.5px"
              size="1.6rem"
              placeholder="산의 이름을 입력해주세요."
              _onChange={getName}
            ></Input>
          </Grid>    
          <Button margin="0 7px 0 19px" padding="0" border="none" width="auto" _onClick={()=>{onClose(false);}}>
            <Text margin="0" color="#6F6F6F">취소</Text>
          </Button> 
        </Grid>    
        <Grid>
          {searchData
            ? searchData.map((el, idx) => (
                <Grid
                  key={idx}
                  margin="21px 0 0"
                  isFlex
                  hover
                  _onClick={() => {selectMt(el)}}
                >
                  <Grid
                    flexRow
                    border="2px solid #43CA3B"
                    bg="#fff"
                    width="auto"
                    height="38px"
                    radius="30px"
                    padding="6px 15px"
                    margin="0 10px 0 0"
                  >
                    <Text margin="0" width="auto" size="14px" bold="600" color="#43CA3B">{searchData[idx].mountain}</Text>
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
      </Grid>

    </SearchModalContainer>
  );
};

const SearchModalContainer = styled.div`
  padding: 16px 16px 25px;
`;

export default SearchModal;
