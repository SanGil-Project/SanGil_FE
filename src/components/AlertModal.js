import React from "react";
import styled, { keyframes } from "styled-components";
import { Grid, Text, Icon, Image, Button } from "../elements/element";

const AlertModal = (props) => {

  const { type, onClose, modalState, checkFunction, contents } = props;

  const cancelBtn = () => {
    onClose(false);
    return checkFunction(false);
  }
  const okBtn = () => {
    onClose(false);
    return checkFunction(true);
  }

  if (type === "choice") {
    return (
      <React.Fragment>
        <Modal className="dateModal" modalState={modalState}>
          <div className="modal_container">
            <Grid flexColumn margin="0 0 57px">
              <Text margin="0" color="#131313" bold="600" size="18px">{contents}</Text>
            </Grid>
            <Grid flexRow height="auto" padding="10px 20px">
              <Button _onClick={cancelBtn} margin="0 10px 0 0" radius="4px" border="none" bgColor="#E6E6E6">
                <Text margin="0 auto" align bold="400" size="16px">취소</Text>
              </Button>
              <Button _onClick={okBtn} radius="4px" border="none" bgColor="#43CA3B">
                <Text margin="0 auto" align color="white" bold="600" size="16px">확인</Text>
              </Button>
            </Grid>
          </div>
        </Modal>
      </React.Fragment>
    );
  }

  if (type === "check") {
    return (
      <React.Fragment>
        <Modal className="dateModal" modalState={modalState}>
          <div className="modal_container">
            <Grid flexColumn margin="0 0 57px">
              <Text margin="0" color="#131313" bold="600" size="18px">{contents}</Text>
            </Grid>
            <Grid flexRow height="auto" padding="10px 20px">
              <Button _onClick={okBtn} width="60%" radius="4px" border="none" bgColor="#43CA3B">
                <Text margin="0 auto" align color="white" bold="600" size="16px">확인</Text>
              </Button>
            </Grid>
          </div>
        </Modal>
      </React.Fragment>
    );
  }

}

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
  padding: 25vh 20px;
  box-sizing: border-box;
  
  animation: ${props => props.modalState ? FadeIn : FadeOut} 0.2s ease-out alternate;
  .modal_container {
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 1px 3px 10px rgba(69, 69, 69, 0.2);
    padding: 73px 26px 52px;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
  }

`;


export default AlertModal;