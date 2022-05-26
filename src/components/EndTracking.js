import React from "react";
import { Grid, Text, Image, Button } from "../elements/element";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const EndTracking = (props) => {
  const {
    name,
    endOpen,
    setEndOpen,
    time,
    setTime,
    setDistance,
    distance,
    mountainId,
    mountainImg,
  } = props;
  const commentCheck = useSelector((state) => state.tracker.comment);
  const navigate = useNavigate();
  const nextTime = () => {
    navigate("/main", { replace: true });
  };

  const goReview = () => {
    navigate(`/searchdetail/${mountainId}`);
    setTime({
      stopwatch: { s: 0, m: 0, h: 0 },
      isStart: false,
    });
    setDistance({ distanceM: 0.0, distanceK: 0.0 });
    setEndOpen(false);
  };
  const goFeed = () => {
    navigate(`/feed`, { replace: true });
    setTime({
      stopwatch: { s: 0, m: 0, h: 0 },
      isStart: false,
    });
    setDistance({ distanceM: 0.0, distanceK: 0.0 });
    setEndOpen(false);
  };

  return (
    <Modal endOpen={endOpen}>
      <div className="modal_container" style={{ height: "500px" }}>
        <Grid height="100%" padding="8% 0">
          <Text size="1.4rem" align="center" bold="600">
            대충 화이팅 한다는 멘트
          </Text>
          <Grid maxWidth="85.3%" height="157px" margin="10px auto 0 auto">
            <Image
              width="100%"
              height="157px"
              objectFit="cover"
              margin="0 auto"
              src={mountainImg}
            />
          </Grid>
          <Grid width="78.3%" margin="20px auto 0 auto" height="75px" isFlex>
            <Grid width="100px">
              <Text margin="0" align="center">
                총 거리
              </Text>
              <Text bold="500" align="center">
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    color: "#43CA3B",
                  }}
                >
                  {distance}
                </span>
                {` km`}
              </Text>
            </Grid>
            <Grid width="180px">
              <Text margin="0" align="center">
                소요 시간
              </Text>
              <Text bold="500" align="center">
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    color: "#43CA3B",
                  }}
                >
                  {time.h}
                </span>
                시간{" "}
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    color: "#43CA3B",
                  }}
                >
                  {time.m}
                </span>
                분{" "}
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    color: "#43CA3B",
                  }}
                >
                  {time.s}
                </span>
                초
              </Text>
            </Grid>
          </Grid>
          <Text size="14px" align="center">
            <span
              style={{
                color: "#43CA3B",
                fontWeight: "600",
                fontSize: "1.4rem",
              }}
            >
              {name}
            </span>
            의 난이도는 어떤가요?
          </Text>
          <Text size="14px" align="center" margin="-16px 0 0 0">
            리뷰 남기기를 통해 리뷰를 남겨주세요!
          </Text>
          <Grid width="323px" height="42px" margin="16px auto" isFlex>
            <Button
              border="none"
              type="div"
              width="48.9%"
              height="42px"
              bgColor="#6F6F6F"
              color="#fff"
              radius="30px"
              _onClick={nextTime}
            >
              다음에요
            </Button>
            {!commentCheck ? (
              <Button
                border="none"
                type="div"
                width="48.9%"
                height="42px"
                color="#fff"
                bgColor="black"
                radius="30px"
                _onClick={goReview}
              >
                리뷰 남기기
              </Button>
            ) : (
              <Button
                border="none"
                type="div"
                width="48.9%"
                height="42px"
                color="#fff"
                bgColor="black"
                radius="30px"
                _onClick={goFeed}
              >
                인증사진 남기기
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  padding: 25vh 20px;
  box-sizing: border-box;

  animation: ${(props) => (props.modalState ? FadeIn : FadeOut)} 0.2s ease-out
    alternate;
  .modal_container {
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 1px 3px 10px rgba(69, 69, 69, 0.2);
    // padding: 30px 0;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
  }
`;
export default EndTracking;
