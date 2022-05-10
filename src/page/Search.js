import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

import { actionCreators as mountActions } from '../redux/modules/mountain';
import { searchNameDB } from "../redux/modules/tracker";
import { Desktop, Mobile } from "../shared/responsive";
import { Section, Menubar, FullMap, HorizontalScroll, Card, Header } from '../components/component';
import { Grid, Text, Icon, Button, Input } from '../elements/element';

const Search = (props) => {
  const dispatch = useDispatch();

  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const mountainList = useSelector((state) => state?.mountain?.mountainList);
  const searchData = useSelector((state) => state?.tracker?.searchList);
  const listRef = useRef([]);
  // const refs = useRef([]);
  // const listRef = (el)=>{refs.current.push(el)}
  // const listRef.current=[];
  
  let listIndex = 0;

  const [currentList, setCurrentList] = useState(0);

  const getIndex = (index) => {
    listIndex = index;
    console.log("자식한테 받은 index ::", index);
    console.log("ref index ::", listRef);
    listRef.current[index]?.scrollIntoView();
    setCurrentList(listRef.current[index]);
  }

  React.useEffect(() => {
    dispatch(mountActions.getTopMntDB());
  }, []);

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
    dispatch(searchNameDB(searchKeyword, 1));
    // setSearchKeyword("");
  }
  const data = searchData ? searchData : mountainList;

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
            { !searchData && <Text bold="600" size="20px" margin="0 0 24px" align="left">⛰ 지금 산길에서 핫한 산 TOP 10</Text>}
            <FullMap data={data} getIndex={getIndex}/>
            {/* <hr/> */}
          </Grid>
          <Grid padding="15px 14px 100px" height="auto">
            {data?.map((d, idx) => {
              return (
              <Grid 
                key={idx} 
                // ref={listRef.current[idx]}
                // ref={el => (listRef.current[idx] = el)}
                // ref={el => (listRef.current.push(el))}
                padding="10px 16px" margin="0 0 15px" height="auto" bg="#efefef" isFlex hover>
                <Grid isFlex width="auto">
                  <Grid bg="#fff" border="none" radius="12px" padding="6px 11px" width="auto" height="auto">
                    <Text margin="0" size="18px" nowrap>{idx+1}. {d.mountain}</Text>
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
            { !searchData && <Text bold="600" size="20px" margin="0 0 24px" align="left">⛰ 지금 산길에서 핫한 산 TOP 10</Text>}
            <FullMap data={data} getIndex={getIndex}/>
            {/* <hr/> */}
          </Grid>
          <Grid padding="15px 14px 100px" height="auto">
            {data?.map((d, idx) => {
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