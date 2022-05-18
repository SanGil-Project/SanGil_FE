import React, { useState, useRef } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as handleActions } from '../redux/modules/handle';

import { Text, Grid } from "../elements/element";

const ScrollTime = () => {
  const dispatch = useDispatch();

  // const division = useRef(["오전", "오후"]);
  const time = useRef(new Date());
  // const curHour = useRef(time.current.getHours() + 1);
  const curHour = useRef(time.current.getHours());
  const curMinute = useRef(time.current.getMinutes());
  const showMinute = parseInt(curMinute.current / 10) * 10 + 10;
  const [selectTime, setSelectTime] = useState("오전");
  const [selectHour, setSelectHour] = useState(curHour.current);
  const [selectMinute, setSelectMinute] = useState(showMinute);

  console.log(selectHour, selectMinute, selectTime)

  const division = ["오전", "오후"];
  const hour = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const minute = ["00", "10", "20", "30", "40", "50"]; 

  const select = (e, arrayName) => {
    if (arrayName === "division") {
      setSelectTime(e)
      dispatch(handleActions.selectTimeDB(e, "division"))
    } else if(arrayName === "hour") {
      setSelectHour(e)
      dispatch(handleActions.selectTimeDB(e, "hour"))
    } else {
      setSelectMinute(e)
      dispatch(handleActions.selectTimeDB(e, "minute"))
    }
  };

  // React.useEffect(() => {
  //   if (selectTime) {
  //     dispatch(handleActions.selectTimeDB(selectTime));
  //   }
  // }, [selectTime, ]);

  const makeDivisionScroll = () => {
    return (
      <div className="division">
        {division.map((e,idx) => {
          const selectT = selectTime === e ? "#43CA3B" : "#000";
          return <Text key={idx} color={selectT} margin="20px 0" size="24px" _onClick={()=>{select(e, "division")}}>{e}</Text>
        })}
      </div>
    );
  };

  const makeHourScroll = () => {
    return (
      <div className="hour">
        {hour.map((e,idx) => {
          const selectH = selectHour === e ? "#43CA3B" : "#000";
          return <Text key={idx} color={selectH} margin="20px 0" size="24px" _onClick={()=>{select(e, "hour")}}>{e}</Text>
        })}
      </div>
    );
  };

  const makeMinuteScroll = () => {
    return (
      <div className="minute">
        {minute.map((e,idx) => {
          const selectM = selectMinute === e ? "#43CA3B" : "#000";
          return <Text key={idx} color={selectM} margin="20px 0" size="24px" _onClick={()=>{select(e, "minute")}}>{e}</Text>
        })}
      </div>
    );
  };


  return (
    <React.Fragment>
      <Modal className="modal">
          <div className="section">
            <div className="select-time">
              {makeDivisionScroll()}
              {makeHourScroll()}
              {makeMinuteScroll()}
            </div>
          </div>
        </Modal>
    </React.Fragment>
  );
}

const Modal = styled.div`
  // background-color: orange;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: none;
  border-top: 1px solid #ccc;
  background-color: #fff;
  font-size: 24px;
  .select-time {
    height: 200px;
    
    display: flex;
    padding: 40px 30px 30px;
    align-items: center; 
    justify-content: space-between;
    width: auto;

    div {
        display: flex;
        flex-direction: column;
        align-items: center; 

        height: 200px;
        padding: 10px;
        width: auto;
        // background-color: black;
        box-sizing: border-box;
        text-align: center;
        margin: 10px;
        flex: 1;
        text-align: center;
        overflow-y: scroll;
    }
    .division {
      justify-content: center;

    }
  }
`;

export default ScrollTime; 