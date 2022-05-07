import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    children,
    bold,
    color,
    size,
    margin,
    align,
    width,
    height,
    lineHeight,
    maxWidth,
    wordBreak,
    textOverflow,
  } = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    align: align,
    width,
    height,
    lineHeight,
    maxWidth,
    wordBreak,
    textOverflow,
  };
  return (
    <React.Fragment>
      <P {...styles}>{children}</P>
    </React.Fragment>
  );
};

Text.defaultProps = {
  children: null,
  bold: "400",
  color: "#222831",
  size: "16px",
  margin: false,
  align: "start",
};

const P = styled.p`
  ${(props) =>
    props.wordBreak ? `word-break: ${props.wordBreak};` : `keep-all;`}
  white-space: normal;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  text-align: ${(props) => props.align};
  ${(props) => (props.width ? `width: ${props.width};` : null)}
  ${(props) => (props.height ? `height: ${props.height};` : null)}
  ${(props) => (props.lineHeight ? `line-height: ${props.lineHeight};` : null)}
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : null)}
  ${(props) =>
    props.textOverflow
      ? `text-overflow: ${props.textOverflow}; overflow:hidden; white-space:nowrap;`
      : null}
`;

export default Text;
