import React, { useState, useRef } from 'react';
import styled from "styled-components";

import { Text, Grid } from "../elements/element";

const ScrollTime = () => {

  // const division = useRef(["오전", "오후"]);
  // const time = useRef(new Date());
  // const curHour = useRef(time.current.getHours() + 1);
  // const curMinute = useRef(time.current.getMinutes());
  // const [hour, setHour] = useState(curHour.current);
  // const [minute, setMinute] = useState(curMinute.current);
  const division = ["오전", "오후"];
  const hour = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const minute = ["00", "10", "20", "30", "40", "50"]; 

  const handleScroll = e => {
    // const [scrollHeight, scrollTop, clientHeight] = document.documentElement;
    // console.log(scrollHeight, scrollTop, clientHeight);
    console.log('adadas');
    console.log(e.target);
  };

  const makeScroll = (array, arrayName) => {
    console.log(array);
    return (
      <div className={arrayName} onScroll={handleScroll}>
        {array.map(e => (
          <Text margin="20px 0" size="24px">{e}</Text>
        ))}
      </div>
    );
  };

  // const handleScroll = (e) => {
  //   console.log(e.target);
  //   console.log(window.scrollTop());
  //   const name = e.target.className;
  //   if (name === "curHour") {
  //     setHour(hour + 1);
  //   } else if (name === "curMinute") {
  //     setMinute(minute + 1);
  //   }
  // }

  // const baseScroll = (array, arrayName) => {
  //   console.log(array);
  //   return (
  //     <div className={arrayName} onScroll={handleScroll}>
  //       {array.map((e)=>{
  //         return <div>{e}</div>
  //       })}
  //     </div>
  //   );
  // }
  // const makeDivisionScroll = () => {
  //   return (
  //     <div className="division" onScroll={handleScroll}>
  //       {division.current.map(e => (
  //         <div>{e}</div>
  //       ))}
  //     </div>
  //   );
  // };
  // const makeHourScroll = () => {
  //   return (
  //     <div className="curHour" onScroll={handleScroll}>
  //       <div>{hour - 1}</div>
  //       <div>{hour}</div>
  //       <div>{hour + 1}</div>
  //     </div>
  //   );
  // };
  // const makeMinuteScroll = () => {
  //   return (
  //     <div className="curMinute" onScroll={handleScroll}>
  //       <div>{minute - 1}</div>
  //       <div>{minute}</div>
  //       <div>{minute + 1}</div>
  //     </div>
  //   );
  // };

  return (
    <React.Fragment>
      <Modal className="modal">
          <div className="section">
            <div className="select-time" isFlex>
              {makeScroll(division, 'division')}
              {makeScroll(hour, 'hour')}
              {makeScroll(minute, 'minute')}
              {/* {makeDivisionScroll()}
              {makeHourScroll()}
              {makeMinuteScroll()} */}
            </div>
          </div>
        </Modal>
    </React.Fragment>
  );
}

const Modal = styled.div`
  background-color: orange;
  font-size: 24px;
  .select-time {
    height: 100px;
    width: 100%;
    margin-bottom: 20px;
    
    display: flex;
    padding: 40px;
    display: flex; 
    align-items: center; 
    justify-content: space-between;

    div {
        height: 200px;
        background-color: black;
        flex: 1;
        text-align: center;
        overflow-y: scroll;
      }
    }
  }
`;

export default ScrollTime; 