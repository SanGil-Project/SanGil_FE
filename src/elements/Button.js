import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    width,
    height,
    margin,
    bgColor,
    color,
    border,
    radius,
    _onClick,
    children,
  } = props;
  const styles = { width, height, bgColor, color, border, margin, radius };

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
};

const Btn = styled.button`
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  border: ${(props) => props.border};
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
  color: ${(props) => props.color};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)}
  ${(props) => (props.bgColor ? `background-color: ${props.bgColor};` : null)}
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
