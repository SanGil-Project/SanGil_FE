import React from "react";
import { Grid, Text } from "../elements/element";
import styled from "styled-components";

const StopWatch = (props) => {
  const { time, setTime, size, color } = props;
  const curTime = React.useRef();

  React.useEffect(() => {
    if (time.isStart === true) {
      curTime.current = setTimeout(() => {
        setTime({
          ...time,
          stopwatch: { ...time.stopwatch, s: time.stopwatch.s + 1 },
        });
        if (time.stopwatch.s === 59) {
          setTime({
            ...time,
            stopwatch: { ...time.stopwatch, m: time.stopwatch.m + 1, s: 0 },
          });
        }
        if (time.stopwatch.m === 59 && time.stopwatch.s === 59) {
          setTime({
            ...time,
            stopwatch: { h: time.stopwatch.h + 1, m: 0, s: 0 },
          });
        }
      }, 1000);
      return () => clearTimeout(curTime.current);
    }
  }, [time]);

  return (
    <div>
      <Grid>
        <span style={{ fontSize: size, color }}>
          {`${
            time.stopwatch.h < 10
              ? `0${time.stopwatch.h}`
              : `${time.stopwatch.h}`
          }`}
        </span>
        <Letter>시간</Letter>
        {` `}
        <span style={{ fontSize: size, color }}>
          {`${
            time.stopwatch.m < 10 ? `0` + time.stopwatch.m : time.stopwatch.m
          }`}
        </span>
        <Letter>분</Letter>
        {` `}
        <span style={{ fontSize: size, color }}>
          {`${
            time.stopwatch.s < 10 ? `0` + time.stopwatch.s : time.stopwatch.s
          }`}
        </span>
        <Letter>초</Letter>
      </Grid>
    </div>
  );
};

const Letter = styled.span`
  fontsize: 1.4rem;
`;

export default StopWatch;
