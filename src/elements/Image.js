import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, border, width, height, margin, type, onChange } = props;
  const styles = { width, height, margin, border };

  if (type === "circle") {
    return <CircleImg src={src} {...styles}></CircleImg>;
  }
  return <Img onChange={onChange} src={src} {...styles}></Img>;
};

Image.defaultProps = {
  border: "none",
  margin: false,
};

const Img = styled.img`
  ${(props) => (props.width ? `width: ${props.width};` : null)}
  ${(props) => (props.height ? `height: ${props.height};` : null)}
    ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  // object-fit: scale-down;
`;

const CircleImg = styled.img`
  ${(props) => (props.height ? `color: ${props.height};` : null)}
  ${(props) => (props.width ? `color: ${props.width};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  border-radius: 100%;
  object-fit: cover;
`;

export default Image;
