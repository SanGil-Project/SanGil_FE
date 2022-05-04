import React from "react";
import styled from "styled-components";

import { Section, Menubar, FullMap, HorizontalScroll, Card, Header } from '../components/component';
import { Grid, Text, Icon, Button } from '../elements/element';

const Search = (props) => {

  const searchDB = [
    {
      id: "A",
      title: "금강산",
      addr: "충남 서산시 팔봉면",
      img: "https://i.esdrop.com/d/f/Z1TUf3lv5V/7seNDu2F2V.jpg",
      info: "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내...",
      latlng: {
        lat: 36.79559607432852,
        lng: 126.3947104288396,
      },
    },
    {
      id: "B",
      title: "금강산",
      addr: "경기 안성시 금광면",
      img: "https://i.esdrop.com/d/f/bww1Enn4jz/6UAk4bqrIR.jpg",
      info: "어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구어쩌구...",
      latlng: {
        lat: 36.98868150008423,
        lng: 127.32093234618237 ,
      },
    },
    {
      id: "C",
      title: "금강산",
      addr: "강원도 금강군",
      img: "https://i.esdrop.com/d/f/wiwzTggJsl/m3FC1MhwFX.jpg",
      info: "저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구저쩌구...",
      latlng: {
        lat: 38.65712661712974,
        lng: 128.09230261163586,
      },
    },
  ];

  return (
    <React.Fragment>
      <SearchContainer>
        <Header />
        <SearchWrap>
          <Grid padding="96px 14px 0px" height="auto">
            <FullMap data={searchDB} />
            <hr/>
          </Grid>
          <Grid padding="25px 14px 100px" height="auto">
            {searchDB.map((d, idx) => {
              return (
              <Grid key={idx} padding="17px 16px 22px" margin="0 0 26px" height="132px" bg="#efefef">
                <Button bgColor="#fff" border="none" radius="12px" padding="6px 11px" width="auto" height="auto">
                  <Text margin="0" size="18px">{d.id} {d.title}</Text>
                </Button>
                <Text size="16px" bold="400">{d.info}</Text>
              </Grid>);
            })}
          </Grid>
        </SearchWrap>
        
        <MenubarContainer>
          <Grid height="88px" minWidth="414px" maxWidth="800px" margin="auto">
            <Menubar/>
          </Grid>
        </MenubarContainer>

      </SearchContainer>
    </React.Fragment>
  );
}

const SearchContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  min-width: 414px;
  max-width: 800px;
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