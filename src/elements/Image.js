import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const {
    src,
    border,
    borderRadius,
    width,
    height,
    margin,
    type,
    onChange,
    objectFit,
  } = props;
  const styles = {
    src,
    width,
    height,
    margin,
    border,
    borderRadius,
    objectFit,
  };

  if (type === "circle") {
    return <CircleImg src={src} {...styles}></CircleImg>;
  }
  if (type === "rectangle") {
    return (
      <React.Fragment>
        <AspectOutter >
          <AspectInner {...styles}></AspectInner>
        </AspectOutter>
      </React.Fragment>
    );
  }
  return <Img onChange={onChange} src={src} {...styles}></Img>;
};

Image.defaultProps = {
  border: "none",
  margin: false,
  borderRadius: false,
  objectFit: "cover",
};

const Img = styled.img`
border:1px solid red;
  ${(props) => (props.width ? `width: ${props.width};` : null)}
  ${(props) => (props.height ? `height: ${props.height};` : null)}
  ${(props) =>
    props.borderRadius ? `border-radius: ${props.borderRadius};` : null}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  object-fit:${(props) => `${props.objectFit}`};
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 150px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

const CircleImg = styled.img`
  ${(props) => (props.height ? `height: ${props.height};` : null)}
  ${(props) => (props.width ? `width: ${props.width};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  border-radius: 100%;
  object-fit: cover;
`;

export default Image;
