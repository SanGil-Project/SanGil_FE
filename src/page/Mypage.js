import React, { useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { useSelector } from "react-redux";

import { PlanList, Menubar, FullMap, HorizontalScroll, Card, Header, MypageModal } from '../components/component';
import { Grid, Text, Icon, Image } from '../elements/element';

const Mypage = (props) => {

  const userInfo = useSelector((state) => state.user.userInfo);
  const menuColor = [false, false, false, false, true]; // 메뉴바 색

  console.log(userInfo)
  const num = [2, 3, 4, 5];
  // 테스트용 DB
  const myMountList = [
    {
      mountainId: 1,
      mountainName: "관악산",
      mountainAddress: "서울특별시 관악구, 경기도 안양시, 과천시",
      distance: "2.5km",
      time: "2시간 20분 20초",
      lat: 37.44446410184117,
      lng: 126.96388893953335,
      // latlng: {
      //   lat: 36.79559607432852,
      //   lng: 126.3947104288396,
      // },
    },
    {
      mountainId: 2,
      mountainName: "대둔산",
      mountainAddress: "충청남도 논산시 벌곡면ㆍ금산군 진산면, 전라북도 완주군 운주면",
      distance: "1.5km",
      time: "1시간 45분 45초",
      lat: 36.1245832757118,
      lng: 127.32048346523955,
    },
    {
      mountainId: 3,
      mountainName: "도봉산",
      mountainAddress: "서울특별시 도봉구, 경기도 의정부시 호원동ㆍ양주시 장흥면",
      distance: "4.5km",
      time: "4시간 13분 45초",
      lat: 37.69877448301772,
      lng: 127.01551754244439,
    },
    {
      mountainId: 4,
      mountainName: "무등산",
      mountainAddress: "광주광역시 동구, 전라남도 담양군 남면ㆍ화순군 이서면",
      distance: "4km",
      time: "3시간 13분 45초",
      lat: 35.12435880520678,
      lng: 127.0091717110001,
      // latlng: {
      //   lat: 36.79559607432852,
      //   lng: 126.3947104288396,
      // },
    },
    {
      mountainId: 5,
      mountainName: "북한산",
      mountainAddress: "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구, 경기도 고양시ㆍ양주시",
      distance: "3.4km",
      time: "3시간 05분 20초",
      lat: 37.65865511792133,
      lng: 126.97798851202528,
    },
    {
      mountainId: 6,
      mountainName: "설악산",
      mountainAddress: "강원도 속초시 설악동, 인제군 북면ㆍ인제읍, 양양군 서면ㆍ강현면",
      distance: "19.3km",
      time: "11시간 40분 20초",
      lat: 38.11910369918497,
      lng: 128.46556692416908,
    },
    {
      mountainId: 7,
      mountainName: "지리산",
      mountainAddress: "전라북도 남원시, 전라남도 구례군, 경상남도 하동군ㆍ산청군ㆍ함양군",
      distance: "12.4km",
      time: "9시간 00분 45초",
      lat: 35.33647697730838,
      lng: 127.73088249270722,
    },
    {
      mountainId: 8,
      mountainName: "치악산",
      mountainAddress: "강원도 원주시, 횡성군, 영월군",
      distance: "2.8km",
      time: "1시간 43분 45초",
      lat: 37.365054086052716,
      lng: 128.0557379915449,
      // latlng: {
      //   lat: 36.79559607432852,
      //   lng: 126.3947104288396,
      // },
    },
    {
      mountainId: 9,
      mountainName: "태백산",
      mountainAddress: "강원도 태백시, 경상북도 봉화군 석포면",
      distance: "10.42km",
      time: "5시간 13분 45초",
      lat: 37.098690435493154,
      lng: 128.9161386842309,
    },
    {
      mountainId: 10,
      mountainName: "한라산",
      mountainAddress: "제주특별자치도",
      distance: "15km",
      time: "10시간 13분 45초",
      lat: 33.36123811263156,
      lng: 126.52944767809313,
    },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // console.log(positions);

  return (
    <React.Fragment>
        <MypageContainer>
          <Header />
          <MypageWrap>
            <Grid bg="#979797" padding="96px 14px 35px" height="auto">
              <MypageModal/>
            </Grid>
            <Grid bg="#D2D2D2" padding="27px 14px 28px" height="312px" overflowY="scroll">
              <PlanList/>
            </Grid>
            <Grid padding="36px 14px 25px" height="auto">
              <Text bold="600" size="20px" margin="0 0 24px" align="left">🚩 정복한 산길</Text>
              <FullMap data={myMountList} /> {/* 지도에 마커 찍어야하는 정보 객체 전달 : 여기서 보낼지, FullMap에서 보낼지.. */}
            </Grid> 
            <Grid padding="35px 14px 70px" height="auto">
            <Grid
                // border="1px solid green"
                margin="0 auto 60px auto"
                height="238px"
              >
                <Text
                  width="350px"
                  height="24px"
                  margin="0 7px 24px 7px"
                  bold="600"
                  size="2rem"
                  lineHeight="24px"
                >
                  ❤️ 정복해야할 산길
                </Text>
                <HorizontalScroll>
                  {num.map((cur, idx) => (
                    <div key={idx}>
                      <Card width="194px" height="120px" margin="10px 7px 8px 7px">
                        <Icon
                          type="like"
                          width="18px"
                          height="18px"
                          margin="0 0 -103px 163px"
                        />
                      </Card>
                      <Text
                        margin="8px 0 0 7px"
                        bold='600'
                        size="1.4rem"
                      >
                        어디어디 산의 어디 코스
                      </Text>

                      <Grid
                        height="20px"
                        isFlex
                        width="194px"
                        margin="8px 7px 0 7px"
                      >
                        <Text bold="300" size="1.2rem">매우 좋음 5.0</Text>
                        <Text bold="400" size="1.2px">100.800km</Text>
                      </Grid>
                    </div>
                  ))}
                </HorizontalScroll>
              </Grid>
            </Grid>
          </MypageWrap>
          
          <MenubarContainer>
            <Grid height="88px" minWidth="414px" maxWidth="800px" margin="auto">
              <Menubar menuColor={menuColor}/>
            </Grid>
          </MenubarContainer>

        </MypageContainer>

      
        
      
    </React.Fragment> 
  );
};

const MypageContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  min-width: 414px;
  max-width: 800px;
  margin: auto;
`;

const MypageWrap = styled.div`
  // position: relative;
  top: 64px;
  height:100%
  // overflow-y: auto;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;


export default Mypage;
