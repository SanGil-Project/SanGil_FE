import React from "react";
import { Grid, Text } from "../elements/element";

const StopWatch = (props) => {
  const { time, setTime, size } = props;
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
        <span style={{ fontSize: size }}>{`${
          time.stopwatch.h < 10
            ? `0${time.stopwatch.h}:`
            : `${time.stopwatch.h}:`
        }`}</span>
        <span style={{ fontSize: size }}>{`${
          time.stopwatch.m < 10 ? `0` + time.stopwatch.m : time.stopwatch.m
        }:`}</span>

        <span style={{ fontSize: size }}>{`${
          time.stopwatch.s < 10 ? `0` + time.stopwatch.s : time.stopwatch.s
        }`}</span>
      </Grid>
    </div>
  );
};

export default StopWatch;
