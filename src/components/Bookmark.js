import React, { useState, useRef } from 'react';
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as partyActions } from "../redux/modules/party";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Icon, Text, Image } from "../elements/element";
import TextCard from "./TextCard";

const Bookmark = (props) => {
  const { userInfo } = props;
  const dispatch = useDispatch();

  // const myPartyList = useSelector((state) => state?.party?.myPartyList);
  const myBookmarkData = useSelector((state) => state?.user?.bookmarkList);
  const myBookmarkList = myBookmarkData?.bookMarkResponseDtos;
  const currentPage = myBookmarkData?.currentPage;
  const totalPage = myBookmarkData?.totalPage;

  console.log(currentPage, totalPage);
  
  const [curPage, setCurPage] = useState(1);
  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);

  // observer 적용
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          console.log(totalPage)
          setCurPage((pre) => pre + 1);
        }
      },
      { threshold: 0.25, rootMargin: '80px' },
    );
    console.log(curPage);
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
        dispatch(userActions.myBookmarkDB(curPage, position.coords.latitude, position.coords.longitude));
      });
    }
  }, [curPage]);

  const bookmark = (d) => {
    dispatch(userActions.chagebookmarkDB(d.mountainId));
    console.log(d)
  }

  return (
    <React.Fragment>
      <Grid padding="0 0 50px">
        <Grid height="auto" flexRow justify="left" margin="0 0 24px" >
          <Image
            width="24px"
            height="24px"
            src={require("../assets/images/Bookmark.png")}
            margin="0 5px 0 0"
          />
          <Text bold="600" size="20px" margin="0" align="left">
            찜한 산길
          </Text>
        </Grid>
        <div>
          <Grid margin="0 0 30px">
            {myBookmarkList?.map((b, idx) => {
              const star = b.starAvr ? b.starAvr : "0.0";
              return (
                <Grid key={idx} margin="0 0 10px" padding="7px 14px 7px 0" bg="#fff" radius="10px" shadow="0px 1px 4px rgba(0, 0, 0, 0.1)" flexRow>
                  <Grid 
                    width="auto" 
                    _onClick={() => {bookmark(b)}}>
                    <Icon 
                      type="mypageBook" 
                      width="48px" 
                      height="48px" 
                      margin="0 auto" 
                      fill="#43CA3B"
                      fillOpacity="1" /> 
                    {/* <Icon
                      type="like"
                      width="18px"
                      margin="0 0 -190px 355px"
                      stroke
                      fillOpacity={mountain && mountain[0]?.bookmark ? "1" : "0.2"}
                      fill={mountain && mountain[0]?.bookmark ? "#43CA3B" : "#959595"}
                      _onClick={() => {
                        bookmark(mountain[0]?.mountainId, "mountain");
                      }}
                    /> */}
                  </Grid>
                  <Grid flexColumn alignItems="left">
                    <Text margin="0" size="14px" bold="600" color="#000">{b.mountainName}</Text>
                    <Grid isFlex>
                      <Text margin="0" size="14px" bold="500" color="#000">{b.distance}km</Text>
                      <Grid flexRow width="auto" margin="4px 0 0">
                        <Icon width="11.5px" height="11.5px" type="searchStar" />
                        <Text margin="0 0 0 5px" size="14px" bold="500" color="#000">{star}</Text>
                      </Grid>
                    </Grid>

                  </Grid>

                </Grid>
              )
            })}
            {totalPage > curPage ? <div ref={setBottom}></div> : null}
          </Grid>
        </div>
      </Grid>



            {/* <Grid padding="35px 14px 70px" height="auto">
              <Grid
                // border="1px solid green"
                margin="0 auto 60px auto"
                height="238px"
              >
                <Text
                  width="350px"
                  height="24px"
                  margin="0 7px 24px 0"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  ❤️ 정복해야할 산길
                </Text>
                <HorizontalScroll>
                  {myBookmarkList?.map((cur, idx) => {
                    // const distance = cur.distance.toFixed(2);
                    return (<Grid key={idx} width="auto" margin="0 10px 0 0" _onClick={()=>{moveMountDetail(cur.mountainId)}} hover>
                      <Card
                        width="194px"
                        height="120px"
                        margin="0"
                      >
                        <Image
                          width="194px"
                          height="120px"
                          borderRadius="10px"
                          border="none"
                          src={cur.mountainImageUrl}
                        />
                      </Card>
                      <Text margin="8px 0" bold="600" size="14px">
                        {cur.mountainName} ({cur.mountainAddress})
                      </Text>
                      <Grid isFlex>
                        <Grid margin="0 4px 0 0" flexRow justify="left">
                          <Icon type="mypageBookStar" width="13px" height="12px" margin="0 auto"/>
                          <Text bold="300" size="12px" margin="0 4px">{cur.starAvr}</Text>
                        </Grid>
                        <Text bold="500" size="12px" color="#43CA3B" margin="0">
                          {cur.distance}km
                        </Text>
                      </Grid>
                    </Grid>)
                  })}
                </HorizontalScroll>
              </Grid>
            </Grid> */}
    </React.Fragment>
  );
};

export default Bookmark;
