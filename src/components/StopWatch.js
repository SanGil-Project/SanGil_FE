import React from "react";
import { Grid, Text } from "../elements/element";

const StopWatch = (props) => {
  const { time, setTime, size } = props;
  const curTime = React.useRef();

  React.useEffect(() => {
    if (time.isStart === true) {
      curTime.current = setTimeout(() => {
        setTime({ ...time, s: time.s + 1 });
        if (time.s === 59) {
          setTime({ ...time, m: time.m + 1, s: 0 });
        }
        if (time.m === 59 && time.s === 59) {
          setTime({ ...time, h: time.h + 1, m: 0, s: 0 });
        }
      }, 1000);
      return () => clearTimeout(curTime.current);
    }
  }, [time]);

  return (
    <div>
      <Grid>
        <span style={{ fontSize: size }}>{`${
          time.h < 10 ? `0${time.h}:` : `${time.h}:`
        }`}</span>
        <span style={{ fontSize: size }}>{`${
          time.m < 10 ? `0` + time.m : time.m
        }:`}</span>

        <span style={{ fontSize: size }}>{`${
          time.s < 10 ? `0` + time.s : time.s
        }`}</span>
      </Grid>
    </div>
  );
};

export default StopWatch;
