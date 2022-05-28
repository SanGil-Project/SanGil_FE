import React from "react";
import Grid from "../elements/Grid";

const Card = (props) => {
  const {
    width,
    height,
    margin,
    border,
    maxWidth,
    hover,
    _onClick,
    shadow,
    padding,
    bgImg,
    bgSize,
  } = props;
  return (
    <Grid
      border={border}
      width={width}
      height={height}
      margin={margin}
      maxWidth={maxWidth}
      hover={hover}
      _onClick={_onClick}
      padding={padding}
      radius="10px"
      shadow={shadow ? shadow : "0 4px 12px rgba(0, 0, 0, 0.1) "}
      bgImg={bgImg}
      bgSize={bgSize}
    >
      {props.children}
    </Grid>
  );
};

export default Card;
