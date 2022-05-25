import React from "react";
import styled from "styled-components";
import _ from "lodash";

const HorizontalScroll = (props) => {
  return (
    <OuterBox>
      <InnerBox>{props.children}</InnerBox>
    </OuterBox>
  );
};

const OuterBox = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 4px;
    display: block;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c8c8ca;
    border-radius: 5px;
  }
`;

const InnerBox = styled.div`
  display: flex;
`;

export default HorizontalScroll;
