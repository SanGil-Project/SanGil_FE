import React from "react";
import Modal from "react-modal";
import { Text, Image, Grid, Button } from "../elements/element";
import { useNavigate } from "react-router";

const EndModal = (props) => {
  const navigate = useNavigate();
  const {
    width,
    height,
    contentWidth,
    contentHeight,
    isOpen,
    mobile,
    margin,
    name,
  } = props;
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: mobile ? 0 : 425,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(00,00,00, 0.4)",
      zIndex: 10,
      width: width,
      height: height,
    },

    content: {
      position: "static",
      justifyContent: "center",
      background: "#F3F3F3",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "12px",
      outline: "none",
      width: contentWidth,
      height: contentHeight,
      padding: "0",
      boxSizing: "borderBox",
      boxShadow:
        "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
      border: "none",
      zIndex: 10,
      margin: margin,
    },
  };

  const nextTime = () => {
    navigate("/", { replace: true });
  };

  const goReview = () => {
    navigate(`/searchdetail/${name}`);
  };

  return (
      <Modal isOpen={isOpen} style={styles}>
        <Text size="1.4rem" align="center" margin="26px 0 0 0" bold="600">
          대충 화이팅 한다는 멘트
        </Text>
        <Grid
          maxWidth="320px"
          border="1px solid blue"
          height="157px"
          margin="10px auto 0 auto"
        >
          <Image
            maxWidth="320px"
            height="157px"
            objectFit="fill"
            margin="0 auto"
            src="http://cdn.iconsumer.or.kr/news/photo/202007/12408_15753_1231.jpg"
          />
        </Grid>
        <Grid width="210px" margin="20px 0 0 65px" height="24px" isFlex>
          <Text>총 거리</Text>
          <Text>소요 시간</Text>
        </Grid>
        <Grid width="262px" margin="20px 0 0 58px" height="24px" isFlex>
          <Text bold="500">
            <span style={{ fontWeight: "600", fontSize: "25px" }}>4.5</span> km
          </Text>
          <Text bold="500">
            <span style={{ fontWeight: "600", fontSize: "25px" }}>2</span>시간{" "}
            <span style={{ fontWeight: "600", fontSize: "25px" }}>20</span>분{" "}
            <span style={{ fontWeight: "600", fontSize: "25px" }}>20</span>초
          </Text>
        </Grid>
        <Text size="14px" align="center">
          A산의 난이도는 어떤가요?
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
        </Grid>
      </Modal>
  );
};

export default EndModal;
