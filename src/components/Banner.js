import React from "react";
import styled from "styled-components";
import { Image } from "../elements/element";

const Banner = () => {
  return (
    <Container>
      <Inner></Inner>
    </Container>
  );
};

//전체를 감싸는 wrapper
//이미지 전체의 길이를 담당
const Container = styled.div`
  border: 1px solid blue;
  width: 200%;
  height: 100%;
`;

//하나의 이미지를 보여주는 구간
const Inner = styled.div`
  border: 1px solid black;
  width: 50%;
  height: 100%;
  display: flex;
`;

export default Banner;
