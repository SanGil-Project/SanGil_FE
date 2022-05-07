import React from "react";
import Grid from "../elements/Grid";

const Card = (props) => {
  const { width, height, margin, border, maxWidth, hover, _onClick } = props;
  return (
    <Grid
      border={border}
      width={width}
      height={height}
      margin={margin}
      maxWidth={maxWidth}
      hover={hover}
      _onClick={_onClick}
      radius="10px"
      shadow="0 4px 12px rgba(0, 0, 0, 0.1) "
    >
      {props.children}
    </Grid>
  );
};

export default Card;
