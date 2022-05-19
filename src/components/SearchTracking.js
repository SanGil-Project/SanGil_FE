import React from "react";
import Modal from "react-modal";
import { Grid, Icon, Input, Text } from "../elements/element";
import { useNavigate } from "react-router";
import { searchNameDB } from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Desktop, Mobile } from "../shared/responsive";

const SearchTracking = (props) => {
  const { name, setName, setMountainId } = props;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(true);
  const searchData = useSelector((state) => state.tracker?.searchList);

  const getName = _.debounce((e) => {
    setName(e.target.value);
  }, 1000);

  const select = (el) => {
    setMountainId(el.mountainId);
    setIsOpen(false);
    setName(el.mountain);
  };

  React.useEffect(() => {
    if (name) {
      dispatch(searchNameDB(name, 1));
    }
  }, [name]);

  const style = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(000, 000, 000, 0.45)",
      zIndex: 101,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      background: "#fff",
      overflow: "auto",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
      maxWidth: "375px",
      height: "447px",
      margin: "220px auto 0 auto",
    },
  };

  return (
    <Modal isOpen={isOpen} style={style}>
      <Grid>
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
                _onClick={() => select(el)}
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
    </Modal>
  );
};

export default SearchTracking;
