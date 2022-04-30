import styled from "styled-components";

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
    display: none;
  }
`;

const InnerBox = styled.div`
  display: flex;
`;

export default HorizontalScroll;
