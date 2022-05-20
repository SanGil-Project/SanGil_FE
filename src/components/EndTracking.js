import React from "react";
import Modal from "react-modal";
import { Grid, Text, Image, Button } from "../elements/element";

import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const EndTracking = (props) => {
  const { name, isOpen, setIsOpen, time, distance } = props;
  const commentCheck = useSelector((state) => state.tracker.comment);
  const navigate = useNavigate();
  const nextTime = () => {
    navigate("/main", { replace: true });
  };

  const goReview = () => {
    navigate(`/searchdetail/${name}`);
    setIsOpen(false);
  };
  const goFeed = () => {
    navigate(`/feed`, { replace: true });
    setIsOpen(false);
  };

  const style = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(000, 000, 000, 0.45)",
      zIndex: 101,
    },
    content: {
      display: "flex",
      justifyContent: "center",
      background: "#fff",
      overflow: "auto",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      WebkitOverflowScrolling: "touch",
      borderRadius: "14px",
      outline: "none",
      zIndex: 10,
      maxWidth: "375px",
      height: "447px",
      margin: "220px auto 0 auto",
    },
  };

  return (
    <Modal isOpen={isOpen} style={style}>
      <Grid>
        <Text size="1.4rem" align="center" bold="600">
          대충 화이팅 한다는 멘트
        </Text>
        <Grid maxWidth="85.3%" height="157px" margin="10px auto 0 auto">
          <Image
            width="100%"
            height="157px"
            objectFit="cover"
            margin="0 auto"
            src="http://cdn.iconsumer.or.kr/news/photo/202007/12408_15753_1231.jpg"
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
            style={{ color: "#43CA3B", fontWeight: "600", fontSize: "1.4rem" }}
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
    </Modal>
  );
};
export default EndTracking;
