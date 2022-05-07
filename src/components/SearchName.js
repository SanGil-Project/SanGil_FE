import React from "react";
import Modal from "react-modal";
import { Input, Grid, Icon, Text } from "../elements/element";
import _ from "lodash";

const SearchName = (props) => {
  const {
    width,
    height,
    contentWidth,
    contentHeight,
    setGetName,
    getName,
    isOpen,
    mobile,
    margin,
  } = props;
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: mobile ? 0 : 425,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(00,00,00, 0.4)",
      zIndex: 10,
      width: width,
      height: height,
    },

    content: {
      position: "static",
      justifyContent: "center",
      background: "#F3F3F3",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "12px",
      outline: "none",
      width: contentWidth,
      height: contentHeight,
      padding: "0",
      boxSizing: "borderBox",
      boxShadow:
        "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
      border: "none",
      zIndex: 10,
      margin: margin,
    },
  };

  const getInput = React.useCallback(
    _.debounce((e) => {
      console.log(e.target.value);
      setGetName({ ...getName, name: e.target.value });
    }, 500),
    []
  );

  const closeModal = () => {
    setGetName({ ...getName, isOpen: false });
  };

  return (
    <Modal isOpen={isOpen} style={styles}>
      <Grid
        border="1px solid black"
        width="91.46%"
        height="52px"
        margin="16px auto 16px auto"
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
          _onChange={getInput}
        ></Input>
      </Grid>
      <Grid height="52px" margin="9px 0" isFlex hover _onClick={closeModal}>
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
    </Modal>
  );
};

export default SearchName;
