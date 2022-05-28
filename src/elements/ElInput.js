import React from "react";
import styled from "styled-components";

const ElInput = (props) => {
  const {
    size,
    color,
    width,
    height,
    margin,
    radius,
    border,
    padding,
    type,
    value,
    textarea,
    _onChange,
    onKeyPress,
    placeholder,
  } = props;

  const styles = {
    size,
    color,
    width,
    height,
    margin,
    radius,
    border,
    padding,
  };

  if (textarea) {
    return (
      <TextArea
        {...styles}
        rows={7}
        value={value}
        placeholder={placeholder}
        onChange={_onChange}
      />
    );
  }

  return (
    <Input
      {...styles}
      type={type}
      value={value}
      onChange={_onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
    />
  );
};

const Input = styled.input`
  outline: none;
  box-sizing: border-box;
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  ${(props) => (props.color ? `color: ${props.color};` : null)}
  ${(props) => (props.size ? `font-size: ${props.size};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)}
`;

const TextArea = styled.textarea`
  resize: none;
  outline: none;
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  max-width: ${(props) => props.maxWidth};
  ${(props) => (props.size ? `font-size: ${props.size};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : null)}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)}
`;

export default ElInput;
