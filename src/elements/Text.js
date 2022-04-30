import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { children, bold, color, size, margin, align,} = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    align: align,
  };
  return (
    <React.Fragment>
      <P {...styles}>{children}</P>
    </React.Fragment>
  );
}

Text.defaultProps = {
  children: null,
  bold: "400",
  color: '#222831',
  size: '16px',
  margin: false,
  align: 'center',
};

const P = styled.p`
  word-break: keep-all;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  text-align: ${(props) => props.align};
`;

export default Text;