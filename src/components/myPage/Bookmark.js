import React, { useState, useRef } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { actionCreators as partyActions } from "../../redux/modules/party";
import { actionCreators as userActions } from "../../redux/modules/user";

import { Grid, Icon, Text, Image } from "../../elements/element";
import TextCard from "../card/TextCard";

const Bookmark = (props) => {
  const { userInfo } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const myPartyList = useSelector((state) => state?.party?.myPartyList);
  const myBookmarkData = useSelector((state) => state?.user?.bookmarkList);
  const myBookmarkList = myBookmarkData?.bookMarkResponseDtos;
  const currentPage = myBookmarkData?.currentPage;
  const totalPage = myBookmarkData?.totalPage;

  const [curPage, setCurPage] = useState(1);
  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);

  // observer 적용
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurPage((pre) => pre + 1);
        }
      },
      { threshold: 0.25, rootMargin: "80px" }
    );
    bottomObserver.current = observer;
  }, []);

  React.useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          userActions.myBookmarkDB(
            curPage,
            position.coords.latitude,
            position.coords.longitude
          )
        );
      });
    }
  }, [curPage]);

  const bookmark = (d) => {
    dispatch(userActions.chagebookmarkDB(d.mountainId));
  };
  const goDetail = (mountainId) => {
    navigate(`/searchdetail/${mountainId}`);
  };

  return (
    <React.Fragment>
      <Grid padding="0 0 50px">
        <Grid height="auto" flexRow justify="left" margin="0 0 24px">
          <Image
            width="24px"
            height="24px"
            src={require("../../assets/images/Bookmark.png")}
            margin="0 5px 0 0"
          />
          <Text bold="600" size="20px" margin="0" align="left">
            찜한 산길과 나와의 거리
          </Text>
        </Grid>
        <div>
          <Grid margin="0 0 30px">
            {myBookmarkList?.map((b, idx) => {
              const star = b.starAvr ? b.starAvr : "0.0";
              const distance = b.distance.toFixed(2);
              return (
                <Grid
                  hover
                  key={idx}
                  margin="0 0 10px"
                  padding="7px 14px 7px 0"
                  bg="#fff"
                  radius="10px"
                  shadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
                  flexRow
                >
                  <Grid
                    width="auto"
                    _onClick={() => {
                      bookmark(b);
                    }}
                  >
                    <Icon
                      type="mypageBook"
                      width="48px"
                      height="48px"
                      margin="0 auto"
                      fill="#43CA3B"
                      fillOpacity="1"
                    />
                  </Grid>
                  <Grid
                    flexColumn
                    alignItems="left"
                    _onClick={() => {
                      goDetail(b.mountainId);
                    }}
                  >
                    <Grid flexRow justify="left">
                      <Text margin="0" size="14px" bold="600" color="#000">
                        {b.mountain}
                      </Text>
                      <Text margin="0 5px" size="14px" bold="600" color="#000">
                        ({b.mountainAddress})
                      </Text>
                    </Grid>
                    <Grid isFlex>
                      <Text margin="0" size="14px" bold="500" color="#000">
                        {distance}km
                      </Text>
                      <Grid flexRow width="auto" margin="4px 0 0">
                        <Icon
                          width="11.5px"
                          height="11.5px"
                          type="searchStar"
                        />
                        <Text
                          margin="0 0 0 5px"
                          size="14px"
                          bold="500"
                          color="#000"
                        >
                          {star}
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            {totalPage > curPage ? <div ref={setBottom}></div> : null}
          </Grid>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default Bookmark;
