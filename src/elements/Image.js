import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, border, width, height, margin, type, onChange } = props;
  const styles = { src, width, height, margin, border };

  if (type === "circle") {
    return <CircleImg src={src} {...styles}></CircleImg>;
  }
  if (type === "rectangle") {
    return (
      <React.Fragment>
        <AspectOutter>
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
};

const Img = styled.img`
  ${(props) => (props.width ? `width: ${props.width};` : null)}
  ${(props) => (props.height ? `height: ${props.height};` : null)}
    ${(props) =>
  props.margin ? `margin: ${props.margin};` : null}
    object-fit: scale-down;
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
  background-image: url('${(props) => props.src}');
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
