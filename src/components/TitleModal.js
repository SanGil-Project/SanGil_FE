import React from "react";
import styled, { keyframes } from "styled-components";
import { Grid, Text, Button, Icon, Image } from "../elements/element";

const TitleModal = (props) => {
  const { type, onClose, modalState, contents, url } = props;

  const checkBtn = () => {
    onClose(false);
  };
  let bgImg = require("../assets/images/title_hint.png");

  if (type === "get") {
    bgImg = require("../assets/images/get_title.png");
  }

  if (type === "hint") {
    return (
      <React.Fragment>
      <Modal className="dateModal" modalState={modalState} bgImg={bgImg}>
        <div className="modal_container">
          <Grid flexColumn margin="0">
            <Image
              type="circle"
              width="147px"
              height="147px"
              margin="0 0 40px"
              borderRadius="100%"
              src={url}
            />
            <Text margin="0 auto 40px" color="#131313" bold="600" size="18px" align="center">
              {contents}
            </Text>
            <Button
              _onClick={checkBtn}
              width="50%"
              radius="4px"
              border="none"
              bgColor="#43CA3B"
            >
              <Text
                margin="0 auto"
                align
                color="white"
                bold="600"
                size="16px"
              >
                확인
              </Text>
            </Button>
          </Grid>
        </div>
      </Modal>
      </React.Fragment>
    );
  }

  if (type === "get") {
    return (
      <React.Fragment>
        <Modal className="dateModal" modalState={modalState} bgImg={bgImg}>
          <div className="modal_container">
            <Grid flexColumn margin="0">
              <Grid flexRow margin="0 0 48px">
                <Text margin="0" color="#131313" bold="600" size="18px" align="center">
                  타이틀을 획득했어요
                </Text>
                <Image
                  width="24px"
                  height="24px"
                  margin="0 0 5px 5px"
                  src={require("../assets/images/Congratulations.png")}
                />
              </Grid>
              <Image
                type="circle"
                width="155px"
                height="155px"
                margin="0 0 49px"
                borderRadius="100%"
                src={url}
              />
              <Button
                _onClick={checkBtn}
                width="50%"
                radius="4px"
                border="none"
                bgColor="#43CA3B"
              >
                <Text
                  margin="0 auto"
                  align
                  color="#fff"
                  bold="600"
                  size="16px"
                >
                  뱃지 획득 하기
                </Text>
              </Button>
            </Grid>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
};

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  padding: 30vh 10%;
  box-sizing: border-box;

  animation: ${(props) => (props.modalState ? FadeIn : FadeOut)} 0.2s ease-out
    alternate;
  .modal_container {
    background-image: url(${(props) => (props.bgImg)});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    border-radius: 12px;
    background-color: #fff;
    box-shadow: 1px 3px 10px rgba(69, 69, 69, 0.2);
    padding: 55px 10px 53px;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
  }
`;

export default TitleModal;
