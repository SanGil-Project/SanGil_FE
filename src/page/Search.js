import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as mountActions } from "../redux/modules/mountain";
import { searchNameDB } from "../redux/modules/tracker";
import { Desktop, Mobile } from "../shared/responsive";
import {
  Section,
  Menubar,
  FullMap,
  HorizontalScroll,
  Card,
  Header,
} from "../components/component";
import { Grid, Text, Icon, Button, Input } from "../elements/element";
import { useNavigate } from "react-router";

const Search = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const mountainList = useSelector((state) => state?.mountain?.mountainList);
  const searchData = useSelector((state) => state?.tracker?.searchList);
  const selectMarker = useSelector((state) => state?.handle?.selectMarker?.index);
  const listRef = useRef([]);

  let listIndex = 0;

  const [currentList, setCurrentList] = useState(0);

  React.useEffect(() => {
    if (selectMarker !== "undefined") {
      listRef.current[selectMarker]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectMarker]);

  React.useEffect(() => {
    dispatch(mountActions.getTopMntDB());
  }, []);

  const [searchKeyword, setSearchKeyword] = React.useState("");

  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const search = () => {
    if (searchKeyword === "") {
      window.alert("검색어를 입력해주세요!");
      return;
    }
    dispatch(searchNameDB(searchKeyword, 1));
    // setSearchKeyword("");
  };

  const cancel = () => {
    setSearchKeyword("")
  }
  const goDetail = (mountainId) => {
    console.log(mountainId);
    navigate(`/searchdetail/${mountainId}`);
  };
  const data = searchData ? searchData : mountainList;

  return (
    <React.Fragment>
      <Mobile>
        <SearchContainer>
          <Header />
          <SearchWrap>
            <SearchInput>
            {/* <SearchInput padding="82px 14px 18px" bg="#fff"> */}
              <Grid
                bg="#F2F3F6"
                height="50px"
                border="1px solid #F2F3F6"
                radius="12px"
                padding="15px 13px"
                flexRow
              >
                <Icon
                  type="searchIcon"
                  width="37px"
                  height="37px"
                  margin="0 auto"
                />
                <Input
                  bg="#F2F3F6"
                  width="100%"
                  border="none"
                  padding="0"
                  margin="0 5.5px"
                  placeholder="어떤 산을 찾고 계신가요?"
                  _onChange={onChange}
                  value={searchKeyword}
                  onSubmit={search}
                  is_submit
                />
                <Button border="none" width="50px" _onClick={cancel}>
                  <Text size="16px" bold="500" margin="0" color="#959595">취소</Text>
                </Button>
              </Grid>
            </SearchInput>
            <Grid padding="160px 14px 11.5px" height="auto" bg="#fff" margin="0">
              {!searchData && (
                <Text bold="600" size="20px" margin="0 0 12px" align="left">
                  ⛰ 100대 명산 중 10개의 산을 랜덤으로 확인해보세요
                </Text>
              )}
              { searchData ? 
                <Grid padding="0 26px 15px">
                  <FullMap data={data} size="500px"/>
                </Grid> : 
                <FullMap data={data}/>}
            </Grid>
            <Grid padding="14px 14px 100px" height="auto">
              {data?.map((d, idx) => {
                const star = d.starAvr==="n" ? "0" : d.starAvr;
                return (
                  <div key={idx} ref={el => (listRef.current[idx] = el)}>
                  <Grid
                    bg="#fff"
                    shadow= "0px 1px 4px rgba(0, 0, 0, 0.1)"
                    padding="20px 12px"
                    margin="0 0 14px"
                    height="144px"
                    radius="10px"
                    border={selectMarker === idx ? "2px solid #43CA3B" : null}
                    flexColumn
                    alignItems="left"
                    hover
                    _onClick={()=>{goDetail(d.mountainId)}}
                  > 
                    <Grid padding="0 0 24px" flexRow justify="left">
                      <Icon type="searchMnt" width="24px" height="18px" margin="0 auto"/>
                      <div key={idx} ref={el => (listRef.current[idx] = el)}>
                      <Text margin="0 10px" size="18px" bold="500" nowrap>
                        {d.mountain}
                      </Text>
                      </div>
                    </Grid>
                    <Grid padding="0 0 24px" flexRow justify="left">
                      <Icon type="searchAddr" width="24px" height="21px" margin="0 auto"/>
                      <Text margin="0 10px" size="18px" bold="500" nowrap>
                        {d.mountainAddress}
                      </Text>
                    </Grid>
                    <Grid flexRow justify="left">
                      <Icon type="searchStar" width="24px" height="21px" margin="0 auto"/>
                      <Text margin="0 10px" size="18px" bold="500" nowrap>
                        ({star})
                      </Text>
                    </Grid>
                  </Grid>
                  </div>
                );
              })}
            </Grid>
          </SearchWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <TrackBtn>
                <Button
                  width="60px"
                  height="60px"
                  bgColor="#43CA3B"
                  border="none"
                  color="#fff"
                  radius="100%"
                  _onClick={() => navigate("/searchmountain")}
                >
                  <Icon type="climber" width="20px" height="32px" />
                </Button>
              </TrackBtn>
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </SearchContainer>
      </Mobile>
      
      <Desktop>
        <SearchContainer>
          <Header />
          <SearchWrap>
            <SearchInput>
            {/* <SearchInput padding="82px 14px 18px" bg="#fff"> */}
              <Grid
                bg="#F2F3F6"
                height="50px"
                border="1px solid #F2F3F6"
                radius="12px"
                padding="15px 13px"
                flexRow
              >
                <Icon
                  type="searchIcon"
                  width="37px"
                  height="37px"
                  margin="0 auto"
                />
                <Input
                  bg="#F2F3F6"
                  width="100%"
                  border="none"
                  padding="0"
                  margin="0 5.5px"
                  placeholder="어떤 산을 찾고 계신가요?"
                  _onChange={onChange}
                  value={searchKeyword}
                  onSubmit={search}
                  is_submit
                />
                <Button border="none" width="50px" _onClick={cancel}>
                  <Text size="16px" bold="500" margin="0" color="#959595">취소</Text>
                </Button>
              </Grid>
            </SearchInput>
            <Grid padding="160px 14px 11.5px" height="auto" bg="#fff" margin="0 0 8px">
              {!searchData && (
                <Text bold="600" size="20px" margin="0 0 12px" align="left">
                  ⛰ 100대 명산 중 10개의 산을 랜덤으로 확인해보세요
                </Text>
              )}
              <FullMap data={data}/>
            </Grid>
            <Grid padding="0 0 100px" height="auto">
              {data?.map((d, idx) => {
                const star = d.starAvr==="n" ? "0" : d.starAvr;
                return (
                  <div key={idx} ref={el => (listRef.current[idx] = el)}>
                  <Grid
                    bg="#fff"
                    padding="23px 25px"
                    margin="0 0 8px"
                    height="144px"
                    flexColumn
                    alignItems="left"
                    hover
                    _onClick={()=>{goDetail(d.mountainId)}}
                  > 
                    <Grid padding="0 0 24px" flexRow justify="left">
                      <Icon type="searchMnt" width="24px" height="18px" margin="0 auto"/>
                      <div key={idx} ref={el => (listRef.current[idx] = el)}>
                      <Text margin="0 10px" size="18px" bold="500" nowrap>
                        {d.mountain}
                      </Text>
                      </div>
                    </Grid>
                    <Grid padding="0 0 24px" flexRow justify="left">
                      <Icon type="searchAddr" width="24px" height="21px" margin="0 auto"/>
                      <Text margin="0 10px" size="18px" bold="500" nowrap>
                        {d.mountainAddress}
                      </Text>
                    </Grid>
                    <Grid flexRow justify="left">
                      <Icon type="searchStar" width="24px" height="21px" margin="0 auto"/>
                      <Text margin="0 10px" size="18px" bold="500" nowrap>
                        ({star})
                      </Text>
                    </Grid>
                  </Grid>
                  </div>
                );
              })}
            </Grid>
          </SearchWrap>

          <MenubarContainer>
            <Grid height="88px" maxWidth="500px" margin="auto">
              <TrackBtn>
                <Button
                  width="60px"
                  height="60px"
                  bgColor="#43CA3B"
                  border="none"
                  color="#fff"
                  radius="100%"
                  _onClick={() => navigate("/searchmountain")}
                >
                  <Icon type="climber" width="20px" height="32px" />
                </Button>
              </TrackBtn>
              <Menubar menuColor={menuColor} />
            </Grid>
          </MenubarContainer>
        </SearchContainer>
      </Desktop>
    </React.Fragment>
  );
};

const SearchContainer = styled.div`
  // position: relative;
  background-color: #F2F3F6;
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: auto;
  overflow: scroll;
`;

const SearchWrap = styled.div`
  // position: absolute;
  top: 64px;
  height:100%
  overflow-y: auto;
`;

const SearchInput = styled.div`
  position: fixed;
  top: 64px;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  padding: 20px 14px 27px;
  background-color: #fff;
`;

const MenubarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const TrackBtn = styled.div`
  position: fixed;
  right: calc(50% - 236px);
  bottom: 113px;
`;


export default Search;
