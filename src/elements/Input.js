import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const Input = (props) => {
  const {
    width,
    height,
    name,
    multiLine,
    type,
    border,
    margin,
    maxWidth,
    padding,
    _onChange,
    placeholder,
    value,
    defaultValue,
    label,
    size,
    radius,
    bg,
    onSubmit,
    is_submit,
    display,
    gridWidth,
    disabled,
    dir,
    hover,
    textAlign,
    color,
  } = props;

  const styles = {
    width,
    size,
    height,
    border,
    margin,
    maxWidth,
    padding,
    radius,
    bg,
    display,
    gridWidth,
    dir,
    hover,
    textAlign,
    color,
  };

  if (multiLine) {
    return (
      <React.Fragment>
        <Grid>
          {label && <div>{label}</div>}
          <ElTextarea
            {...styles}
            rows={7}
            value={value}
            placeholder={placeholder}
            onChange={_onChange}
          ></ElTextarea>
        </Grid>
      </React.Fragment>
    );
  }

  if (defaultValue) {
    return (
      <Grid maxWidth={gridWidth} alignItems="center" flexRow>
        {label && <div>{label}</div>}
        <InfoInput
          {...styles}
          type={type}
          onChange={_onChange}
          defaultValue={defaultValue}
        />
      </Grid>
    );
  }
  return (
    <Grid maxWidth={gridWidth} alignItems="center" flexRow>
      {label && <div>{label}</div>}
      {is_submit ? (
        <InfoInput
          {...styles}
          type={type}
          onChange={_onChange}
          placeholder={placeholder}
          value={value}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        />
      ) : disabled ? (
        <InfoInput
          {...styles}
          type={type}
          value={value}
          disabled
          onChange={_onChange}
          placeholder={placeholder}
        />
      ) : value ? (
        <InfoInput
          {...styles}
          dir={dir}
          type={type}
          value={value}
          onChange={_onChange}
          placeholder={placeholder}
        />
      ) : (
        <InfoInput
          {...styles}
          type={type}
          onChange={_onChange}
          placeholder={placeholder}
        />
      )}
    </Grid>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  _onChange: () => {},
  onSubmit: () => {},
  value: "",
  is_submit: false,
  type: "text",
  border: "1px solid #212121",
  padding: "12px 4px",
  multiLine: false,
  dir: "ltr"
};

const InfoInput = styled.input`
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  font-size: ${(props) => (props.size ? `${props.size}` : `16px`)};
  outline: none;
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.color ? `color: ${props.color};` : null)}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : null)}
  ${(props) => (props.display ? `display: ${props.display};` : null)}
  ${(props) => props.hover ? `&:hover { cursor: pointer; };` : null}
  ${(props) => props.textAlign ? `text-align: ${props.textAlign};` : null}
`;

const ElTextarea = styled.textarea`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: ${(props) => props.border};
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : null)}
  outline: none;
  font-size: ${(props) => (props.size ? `${props.size}` : `16px`)};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : null)}
  resize: none;
`;

export default Input;
