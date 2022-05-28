import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as mountActions } from "../redux/modules/mountain";
import {
  Menubar,
  FullMap,
  Header,
  AlertModal,
  CheckSpecial,
} from "../components/component";
import { Grid, Text, Icon, Button, Input, ElInput } from "../elements/element";
import { useNavigate } from "react-router";
import { indexOf } from "lodash";

const Search = (props) => {
  const smallSize = window.outerWidth < 500 ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuColor = [false, false, false, true, false]; // 메뉴바 색
  const mountainList = useSelector((state) => state?.mountain?.mountainList);
  const searchData = useSelector((state) => state?.mountain?.searchList);
  const curtPageDB = useSelector((state) => state?.mountain?.searchCurrentPg);
  const totPageDB = useSelector((state) => state?.mountain?.searchTotalPg);
  const selectMarker = useSelector(
    (state) => state?.handle?.selectMarker?.index
  );
  const listRef = useRef([]);

  const [input, setInput] = React.useState("");
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [curtPage, setCurtPage] = useState(curtPageDB);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  React.useEffect(() => {
    dispatch(mountActions.getTopMntDB());
  }, []);

  React.useEffect(() => {
    if (selectMarker !== "undefined") {
      listRef.current[selectMarker]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectMarker]);

  React.useEffect(() => {
    if (searchKeyword !== "") {
      dispatch(mountActions.getSearchDB(searchKeyword, curtPage));
      return;
    }
  }, [curtPage, searchKeyword]);

  const onChange = (e) => {
    if (CheckSpecial(e.target.value)) {
      setModalContent("특수문자는 입력할 수 없습니다");
      setModalOpen(true);
      return;
    }
    setInput(e.target.value);
  };
  const search = () => {
    if (input === "") {
      setModalContent("검색어를 입력해주세요!");
      setModalOpen(true);
      return;
    }
    setCurtPage(1);
    setSearchKeyword(input);
  };
  const prevPage = () => {
    if (curtPage > 1) {
      setCurtPage((pre) => pre - 1);
      return;
    }
  };
  const nextPage = () => {
    if (curtPage < totPageDB) {
      setCurtPage((pre) => pre + 1);
      return;
    }
  };

  const cancel = () => {
    setSearchKeyword("");
    setInput("")
  };
  const goDetail = (mountainId) => {
    navigate(`/searchdetail/${mountainId}`);
  };
  const data = searchData ? searchData : mountainList;

  return (
    <React.Fragment>
      <SearchContainer>
        <Header />
        {modalOpen && (
          <AlertModal
            type="check"
            onClose={setModalOpen}
            modalState={modalOpen}
            contents={modalContent}
          />
        )}
        <SearchWrap>
          <SearchInput>
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
              <ElInput
                type="text"
                size="16px"
                bg="#F2F3F6"
                width="100%"
                border="none"
                padding="0"
                margin="0 5.5px"
                placeholder="어떤 산을 찾고 계신가요?"
                _onChange={onChange}
                value={input}
                onSubmit={search}
              />
              <Button border="none" width="50px" _onClick={cancel}>
                <Text size="16px" bold="500" margin="0" color="#959595">
                  취소
                </Text>
              </Button>
            </Grid>
          </SearchInput>
          <Grid padding="160px 14px 11.5px" height="auto" bg="#fff" margin="0">
            {!searchData && (
              <Text bold="600" size="20px" margin="0 0 12px" align="left">
                ⛰ 100대 명산 중 10개의 산을 랜덤으로 확인해보세요
              </Text>
            )}
            {searchData ? (
              <>
                <Grid padding="0 26px">
                  <FullMap data={data} size="500px" padding />
                </Grid>
                <Grid isFlex>
                  <Grid
                    width="auto"
                    _onClick={() => {
                      setCurtPage(1);
                    }}
                  >
                    <Icon
                      type="goFirst"
                      width="48px"
                      height="48px"
                      margin="0 auto"
                    />
                  </Grid>
                  <Grid width="auto" _onClick={prevPage}>
                    <Icon
                      type="goPrev"
                      width="48px"
                      height="48px"
                      margin="0 auto"
                    />
                  </Grid>
                  <Grid width="100%" flexRow>
                    <Text
                      margin="0 5px 0 0"
                      bold="700"
                      size="16px"
                      color="#43CA3B"
                    >
                      {totPageDB ? curtPage : 0}
                    </Text>
                    <Text margin="0" bold="500" size="14px">
                      / {totPageDB}
                    </Text>
                  </Grid>
                  <Grid width="auto" _onClick={nextPage}>
                    <Icon
                      type="goNext"
                      width="48px"
                      height="48px"
                      margin="0 auto"
                    />
                  </Grid>
                  <Grid
                    width="auto"
                    _onClick={() => {
                      setCurtPage(totPageDB);
                    }}
                  >
                    <Icon
                      type="goLast"
                      width="48px"
                      height="48px"
                      margin="0 auto"
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid padding="0 26px">
                <FullMap data={data} size="500px" padding />
              </Grid>
            )}
          </Grid>
          <Grid padding="14px 14px 100px" height="auto">
            {data?.map((d, idx) => {
              const star = d.starAvr === "n" ? "0" : d.starAvr;
              return (
                <div key={idx} ref={(el) => (listRef.current[idx] = el)}>
                  <Grid
                    bg="#fff"
                    shadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
                    padding="10px"
                    margin="0 0 14px"
                    height="192px"
                    radius="10px"
                    border={selectMarker === idx ? "2px solid #43CA3B" : null}
                    flexRow
                    alignItems="flex-start"
                    hover
                    _onClick={() => {
                      goDetail(d.mountainId);
                    }}
                  >
                    <Grid
                      bgImg={d.mountainImgUrl}
                      bgSize="cover"
                      height="172px"
                      radius="10px"
                      margin="0 13px 0 0"
                    ></Grid>
                    <Grid
                      flexColumn
                      alignItems="left"
                      height="auto"
                      padding="16px 0 0"
                    >
                      <Grid padding="0 0 12px" flexRow justify="left">
                        <Icon
                          type="searchMnt"
                          width="24px"
                          height="18px"
                          margin="0 auto"
                        />
                        <Text margin="0 10px" size="18px" bold="500" nowrap>
                          {d.mountain}
                        </Text>
                      </Grid>
                      <Grid padding="0 0 12px" flexRow justify="left">
                        <Icon
                          type="searchAddr"
                          width="24px"
                          height="21px"
                          margin="0 auto"
                        />
                        <Text margin="0 10px" size="18px" bold="500">
                          {d.mountainAddress}
                        </Text>
                      </Grid>
                      <Grid flexRow justify="left">
                        <Icon
                          type="searchStar"
                          width="24px"
                          height="21px"
                          margin="0 auto"
                        />
                        <Text margin="0 10px" size="18px" bold="500" nowrap>
                          ({star})
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </SearchWrap>

        <MenubarContainer>
          <Grid height="88px" maxWidth="500px" margin="auto">
            <TrackBtn smallSize>
              <Button
                width="60px"
                height="60px"
                bgColor="#43CA3B"
                border="none"
                color="#fff"
                radius="100%"
                _onClick={() => navigate("/tracker")}
              >
                <Icon type="climber" width="20px" height="32px" />
              </Button>
            </TrackBtn>
            <Menubar menuColor={menuColor} />
          </Grid>
        </MenubarContainer>
      </SearchContainer>
    </React.Fragment>
  );
};

const SearchContainer = styled.div`
  // position: relative;
  background-color: #f2f3f6;
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
  right: 
  ${(props) => (props.smallSize ? `calc(0vw + 14px);` : `calc(50% - 236px);`)}
  bottom: 113px;
`;

const MountainImg = styled.div``;

export default Search;
