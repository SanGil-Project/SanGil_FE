import React from "react";
import { Grid, Text, Image, Button } from "../elements/element";
import { Header } from "../components/component";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const EndTracking = () => {
  const { name } = useParams();
  const commentCheck = useSelector((state) => state.tracker.comment);
  const navigateState = useLocation().state;
  console.log(navigateState);
  const navigate = useNavigate();
  const nextTime = () => {
    navigate("/", { replace: true });
  };

  const goReview = () => {
    navigate(`/searchdetail/${name}`);
  };
  const goFeed = () => {
    navigate(`/feed`, { replace: true });
  };

  return (
    <Grid border="1px solid black" width="414px" margin="0 auto">
      <Header />
      <Grid padding="100px 0 0 0" height="1080px">
        <Text size="1.4rem" align="center" bold="600">
          대충 화이팅 한다는 멘트
        </Text>
        <Grid maxWidth="320px" height="157px" margin="10px auto 0 auto">
          <Image
            width="320px"
            height="157px"
            objectFit="cover"
            margin="0 auto"
            src="http://cdn.iconsumer.or.kr/news/photo/202007/12408_15753_1231.jpg"
          />
        </Grid>
        <Grid width="210px" margin="20px 0 0 95px" height="24px" isFlex>
          <Text>총 거리</Text>
          <Text>소요 시간</Text>
        </Grid>
        <Grid width="242px" margin="20px 0 0 98px" height="24px" isFlex>
          <Text bold="500">
            <span style={{ fontWeight: "600", fontSize: "25px" }}>
              {navigateState?.distance}
            </span>
            km
          </Text>
          <Text bold="500">
            <span style={{ fontWeight: "600", fontSize: "25px" }}>
              {navigateState?.time.h}
            </span>
            시간{" "}
            <span style={{ fontWeight: "600", fontSize: "25px" }}>
              {navigateState?.time.m}
            </span>
            분{" "}
            <span style={{ fontWeight: "600", fontSize: "25px" }}>
              {navigateState?.time.s}
            </span>
            초
          </Text>
        </Grid>
        <Text size="14px" align="center">
          {name}의 난이도는 어떤가요?
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
            >
              인증사진 남기기
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EndTracking;
