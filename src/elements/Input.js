import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const Input = (props) => {
  const {
    width,
    height,
    name,
    type,
    border,
    margin,
    maxWidth,
    padding,
    _onChange,
    placeholder,
    label,
  } = props;
  const styles = { width, height, border, margin, maxWidth, padding };

  return (
    <Grid>
      {label && <div>{label}</div>}
      <InfoInput
        {...styles}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
      />
    </Grid>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  _onChange: () => {},
  type: "text",
  border: "1px solid #212121",
  padding: "12px 4px",
};

const InfoInput = styled.input`
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
`;

export default Input;
