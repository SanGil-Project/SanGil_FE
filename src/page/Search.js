import React, { useState, useRef } from "react";
import styled from "styled-components";

import { Desktop, Mobile } from "../shared/responsive";
import { Section, Menubar, FullMap, HorizontalScroll, Card, Header } from '../components/component';
import { Grid, Text, Icon, Button, Input } from '../elements/element';

const Search = (props) => {

  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const listRef = useRef([]);
  // const refs = useRef([]);
  // const listRef = (el)=>{refs.current.push(el)}
  // const listRef.current=[];
  
  let listIndex = 0;

  // 테스트용 DB
  const searchDefault = [
    {
      mountainId: 1,
      mountainName: "관악산",
      mountainAddress: "서울특별시 관악구, 경기도 안양시, 과천시",
      mountainImageUrl: "https://i.esdrop.com/d/f/bww1Enn4jz/6UAk4bqrIR.jpg",
      starAvr: 2,
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
      mountainImageUrl: "https://i.esdrop.com/d/f/bww1Enn4jz/qE7oRenYCM.jpg",
      starAvr: 5,
      lat: 36.1245832757118,
      lng: 127.32048346523955,
    },
    {
      mountainId: 3,
      mountainName: "도봉산",
      mountainAddress: "서울특별시 도봉구, 경기도 의정부시 호원동ㆍ양주시 장흥면",
      mountainImageUrl: "https://i.esdrop.com/d/f/56XbZ38FPP/LByHIjMi56.jpg",
      starAvr: 3,
      lat: 37.69877448301772,
      lng: 127.01551754244439,
    },
    {
      mountainId: 4,
      mountainName: "무등산",
      mountainAddress: "광주광역시 동구, 전라남도 담양군 남면ㆍ화순군 이서면",
      mountainImageUrl: "https://i.esdrop.com/d/f/56XbZ38FPP/kZqivY6WQ6.jpg",
      starAvr: 5,
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
      mountainImageUrl: "https://i.esdrop.com/d/f/Z1TUf3lv5V/7seNDu2F2V.jpg",
      starAvr: 4,
      lat: 37.65865511792133,
      lng: 126.97798851202528,
    },
    {
      mountainId: 6,
      mountainName: "설악산",
      mountainAddress: "강원도 속초시 설악동, 인제군 북면ㆍ인제읍, 양양군 서면ㆍ강현면",
      mountainImageUrl: "https://i.esdrop.com/d/f/JdarL6WQ6C/NUQTQDSyko.jpg",
      starAvr: 5,
      lat: 38.11910369918497,
      lng: 128.46556692416908,
    },
    {
      mountainId: 7,
      mountainName: "지리산",
      mountainAddress: "전라북도 남원시, 전라남도 구례군, 경상남도 하동군ㆍ산청군ㆍ함양군",
      mountainImageUrl: "https://i.esdrop.com/d/f/wiwzTggJsl/TZy5ZfJbew.jpg",
      starAvr: 3,
      lat: 35.33647697730838,
      lng: 127.73088249270722,
    },
    {
      mountainId: 8,
      mountainName: "치악산",
      mountainAddress: "강원도 원주시, 횡성군, 영월군",
      mountainImageUrl: "https://i.esdrop.com/d/f/JdarL6WQ6C/3h8W4auBfY.jpg",
      starAvr: 2,
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
      mountainImageUrl: "https://i.esdrop.com/d/f/JdarL6WQ6C/pZwcCpEn2q.jpg",
      starAvr: 4,
      lat: 37.098690435493154,
      lng: 128.9161386842309,
    },
    {
      mountainId: 10,
      mountainName: "한라산",
      mountainAddress: "제주특별자치도",
      mountainImageUrl: "https://i.esdrop.com/d/f/JdarL6WQ6C/OJ5Z7Hys11.jpg",
      starAvr: 5,
      lat: 33.36123811263156,
      lng: 126.52944767809313,
    },
  ];

  const searchDB = [
    {
      mountainId: 1,
      mountainName: "금강산",
      mountainAddress: "충남 서산시 팔봉면",
      mountainImageUrl: "https://i.esdrop.com/d/f/Z1TUf3lv5V/7seNDu2F2V.jpg",
      starAvr: 4,
      lat: 36.79559607432852,
      lng: 126.3947104288396,
    },
    {
      mountainId: 2,
      mountainName: "금강산",
      mountainAddress: "경기 안성시 금광면",
      mountainImageUrl: "https://i.esdrop.com/d/f/bww1Enn4jz/6UAk4bqrIR.jpg",
      starAvr: 5,
      lat: 36.98868150008423,
      lng: 127.32093234618237,
    },
    {
      mountainId: 3,
      mountainName: "금강산",
      mountainAddress: "강원도 금강군",
      mountainImageUrl: "https://i.esdrop.com/d/f/wiwzTggJsl/m3FC1MhwFX.jpg",
      starAvr: 3,
      lat: 38.65712661712974,
      lng: 128.09230261163586,
    },
  ];
  const [currentList, setCurrentList] = useState(0);

  const getIndex = (index) => {
    listIndex = index;
    console.log("자식한테 받은 index ::", index);
    console.log("ref index ::", listRef);
    listRef.current[index]?.scrollIntoView();
    setCurrentList(listRef.current[index]);
  }

  // console.log(currentList);
  // React.useEffect((listIndex) => {
  //   console.log("최종 index ::", listIndex);
  // }, [listIndex]);
  // const listFocus = useRef([]);

  const [searchKeyword, setSearchKeyword] = React.useState("");
  
  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  }
  const search = () => {
    if(searchKeyword==="") {
      window.alert("검색어를 입력해주세요!");
      return;
    }
    setSearchKeyword("");
  }

  return (
    <React.Fragment>
      <Mobile>
      <SearchContainer>
        <Header />
        <SearchWrap>
          <Grid padding="96px 14px 33px">
            <Grid bg="#fff" height="67px" border="1px solid #636363" radius="40px" padding="15px 13px" flexRow>
              <Icon type="searchIcon" width="37px" height="37px" margin="0 auto" />
              <Input 
                width="100%" border="none" padding="0" margin="0 5.5px"
                placeholder="어떤 산을 찾고 계신가요?" 
                _onChange={onChange}
                value={searchKeyword}
                onSubmit={search}
                is_submit
                />
              <Button border="none" width="50px" _onClick={search}>검색</Button>
            </Grid>
          </Grid>
          <Grid padding="0 14px" height="auto">
            <Text bold="600" size="20px" margin="0 0 24px" align="left">⛰ 지금 산길에서 핫한 산 TOP 10</Text>
            <FullMap data={searchDefault} getIndex={getIndex}/>
            {/* <hr/> */}
          </Grid>
          <Grid padding="15px 14px 100px" height="auto">
            {searchDefault.map((d, idx) => {
              return (
              <Grid 
                key={idx} 
                // ref={listRef.current[idx]}
                // ref={el => (listRef.current[idx] = el)}
                // ref={el => (listRef.current.push(el))}
                padding="10px 16px" margin="0 0 15px" height="auto" bg="#efefef" isFlex hover>
                <Grid isFlex width="auto">
                  <Grid bg="#fff" border="none" radius="12px" padding="6px 11px" width="auto" height="auto">
                    <Text margin="0" size="18px" nowrap>{d.mountainId}. {d.mountainName}</Text>
                  </Grid>
                  <Text size="16px" bold="400" margin="0 20px">{d.mountainAddress}</Text>
                </Grid>
                <Text size="16px" bold="400" margin="0" nowrap>평균 ⭐ {d.starAvr}</Text>
              </Grid>);
            })}
          </Grid>
        </SearchWrap>
        
        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor}/>
          </Grid>
        </MenubarContainer>

      </SearchContainer>
      </Mobile>
      <Desktop>
      <SearchContainer>
        <Header />
        <SearchWrap>
          <Grid padding="96px 14px 33px">
            <Grid bg="#fff" height="67px" border="1px solid #636363" radius="40px" padding="15px 13px" flexRow>
              <Icon type="searchIcon" width="37px" height="37px" margin="0 auto" />
              <Input 
                width="100%" border="none" padding="0" margin="0 5.5px"
                placeholder="어떤 산을 찾고 계신가요?" 
                _onChange={onChange}
                value={searchKeyword}
                onSubmit={search}
                is_submit
                />
              <Button border="none" width="50px" _onClick={search}>검색</Button>
            </Grid>
          </Grid>
          <Grid padding="0 14px" height="auto">
            <Text bold="600" size="20px" margin="0 0 24px" align="left">⛰ 지금 산길에서 핫한 산 TOP 10</Text>
            <FullMap data={searchDefault} getIndex={getIndex}/>
            {/* <hr/> */}
          </Grid>
          <Grid padding="15px 14px 100px" height="auto">
            {searchDefault.map((d, idx) => {
              return (
              <Grid 
                key={idx} 
                // ref={listRef.current[idx]}
                // ref={el => (listRef.current[idx] = el)}
                // ref={el => (listRef.current.push(el))}
                padding="10px 16px" margin="0 0 15px" height="auto" bg="#efefef" isFlex hover>
                <Grid isFlex width="auto">
                  <Grid bg="#fff" border="none" radius="12px" padding="6px 11px" width="auto" height="auto">
                    <Text margin="0" size="18px" nowrap>{d.mountainId}. {d.mountainName}</Text>
                  </Grid>
                  <Text size="16px" bold="400" margin="0 20px">{d.mountainAddress}</Text>
                </Grid>
                <Text size="16px" bold="400" margin="0" nowrap>평균 ⭐ {d.starAvr}</Text>
              </Grid>);
            })}
          </Grid>
        </SearchWrap>
        
        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <Menubar menuColor={menuColor}/>
          </Grid>
        </MenubarContainer>

      </SearchContainer>

      </Desktop>
    </React.Fragment>
  );
}

const SearchContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: auto;
  overflow: hidden;
`;

const SearchWrap = styled.div`
  // position: absolute;
  top: 64px;
  height:100%
  overflow-y: auto;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index : 10;
`;
export default Search;