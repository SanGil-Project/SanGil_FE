import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    width,
    maxWidth,
    height,
    margin,
    bgColor,
    color,
    border,
    radius,
    fontSize,
    _onClick,
    children,
    padding,
    position,
    zIndex,
    type,
    shadow,
    top,
    left,
  } = props;
  const styles = {
    width,
    maxWidth,
    height,
    bgColor,
    color,
    border,
    margin,
    radius,
    fontSize,
    padding,
    position,
    zIndex,
    type,
    shadow,
    top,
    left,
  };

  if (type === "div") {
    return (
      <DivBtn onClick={_onClick} {...styles}>
        {children}
      </DivBtn>
    );
  }

  return (
    <Btn onClick={_onClick} {...styles}>
      {children}
    </Btn>
  );
};
Button.defaultProps = {
  children: null,
  _onClick: () => {},
  width: "100%",
  height: "45px",
  bgColor: "transparent",
  color: "#212121",
  border: "1px solid #212121",
  margin: false,
  padding: false,
  fontSize: "16px",
};

const Btn = styled.button`
  width: ${(props) => `${props.width}`};
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : null)}
  height: ${(props) => `${props.height}`};
  border: ${(props) => `${props.border}`};
  outline: none;
  box-sizing: border-box;
  font-size: ${(props) => `${props.fontSize}`};
  color: ${(props) => props.color};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.padding ? `padding: ${props.padding};` : null)}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)}
  ${(props) => (props.bgColor ? `background-color: ${props.bgColor};` : null)}
  ${(props) => (props.position ? `position: ${props.position};` : null)}
  ${(props) => (props.zIndex ? `z-index: ${props.zIndex};` : null)}
  ${(props) => (props.shadow ? `box-shadow: ${props.shadow};` : null)}
  &:hover {
    cursor: pointer;
  }
`;

const DivBtn = styled.div`
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  border: ${(props) => `${props.border}`};
  box-sizing: border-box;
  font-size: ${(props) => `${props.fontSize}`};
  color: ${(props) => props.color};
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)};
  ${(props) => (props.bgColor ? `background-color: ${props.bgColor};` : null)}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)}
  ${(props) => (props.zIndex ? `z-index: ${props.zIndex};` : null)}
  ${(props) => (props.position ? `position: ${props.position};` : null)}
  ${(props) => (props.top ? `top: ${props.top};` : null)}
  ${(props) => (props.left ? `left: ${props.left};` : null)}
  line-height: ${(props) => `${props.height}`};
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
