import React from "react";
import { BsStarFill } from "react-icons/bs";
import { Grid } from "../elements/element";

const Star = (props) => {
  const {
    border,
    width,
    height,
    lineHeight,
    starMargin,
    margin,
    type,
    showIndex,
  } = props;

  const starArr = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  React.useEffect(() => {
    if (type === "showStar") {
      let clickStates = [...clicked];
      for (let i = 0; i < 5; i++) {
        clickStates[i] = i <= parseInt(showIndex) - 1 ? true : false;
      }
      setClicked(clickStates);
    }
  }, []);

  const selectStar = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  if (type === "showStar") {
    return (
      <Grid
        border={border}
        width={width}
        height={height}
        lineHeight={lineHeight}
        margin={margin}
      >
        {starArr.map((el, idx) => {
          return (
            <BsStarFill
              key={idx}
              fill={clicked[idx] ? "green" : "black"}
              style={{ margin: starMargin }}
            />
          );
        })}
      </Grid>
    );
  }

  return (
    <Grid
      border={border}
      width={width}
      height={height}
      lineHeight={lineHeight}
      margin={margin}
    >
      {starArr.map((el, idx) => {
        return (
          <BsStarFill
            key={idx}
            fill={clicked[idx] ? "green" : "black"}
            onClick={() => selectStar(el)}
            style={{ margin: starMargin }}
          />
        );
      })}
    </Grid>
  );
};

export default Star;
