import React, { useState, useRef } from "react";
import styled from "styled-components";

import { Grid, Icon, Input, Text, Button, ElInput } from "../elements/element";
import { AlertModal, CheckSpecial } from "../components/component";
import { searchNameDB } from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const SearchModal = (props) => {
  const { onClose, selectMnt, scroll } = props;
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state?.tracker);
  const searchList = searchData?.searchList;
  const totalPage = searchData?.searchTotalPg;

  const [searchKeyword, setSearchKeyword] = React.useState("");

  const [curPage, setCurPage] = useState(1);
  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
    if (searchKeyword !== "") {
      dispatch(searchNameDB(searchKeyword, curPage));
      return;
    }
  }, [curPage]);

  const search = () => {
    if (searchKeyword === "") {
      setModalContent("검색어를 입력해주세요!");
      setModalOpen(true);
      return;
    }
    setCurPage(1);
    dispatch(searchNameDB(searchKeyword, curPage));
  };

  const onChange = (e) => {
    if (CheckSpecial(e.target.value)) {
      setModalContent("특수문자는 입력할 수 없습니다");
      setModalOpen(true);
      return;
    }
    setSearchKeyword(e.target.value);
  };

  const selectMt = (data) => {
    props.selectMnt(data);
    onClose(false);
  };

  const cancel = () => {
    setSearchKeyword("");
    onClose(false);
  };

  return (
    <SearchModalContainer>
      {modalOpen && (
        <AlertModal
          type="check"
          onClose={setModalOpen}
          modalState={modalOpen}
          contents={modalContent}
        />
      )}
      <Grid>
        <Grid isFlex margin="0 0 18px">
          <Grid
            height="55px"
            padding="15px 13px"
            border="1px solid #D2D2D2"
            radius="12px"
            bg="#fff"
            isFlex
          >
            <Icon
              type="searchIcon"
              width="30px"
              height="37px"
              margin="0 auto"
            />
            <ElInput
              type="text"
              size="16px"
              width="100%"
              border="none"
              padding="0"
              margin="0 5.5px"
              placeholder="산의 이름을 입력해주세요."
              _onChange={onChange}
              value={searchKeyword}
              onSubmit={search}
            />
          </Grid>
          <Button
            margin="0 7px 0 19px"
            padding="0"
            border="none"
            width="auto"
            _onClick={cancel}
          >
            <Text margin="0" color="#6F6F6F">
              취소
            </Text>
          </Button>
        </Grid>
        <Grid height="230px" overflowY={scroll} padding="0 0 50px">
          {searchList
            ? searchList.map((el, idx) => (
                <Grid
                  key={idx}
                  margin="21px 0 0"
                  isFlex
                  hover
                  height="auto"
                  _onClick={() => {
                    selectMt(el);
                  }}
                >
                  <Grid
                    flexRow
                    border="2px solid #43CA3B"
                    bg="#fff"
                    width="auto"
                    height="38px"
                    radius="30px"
                    padding="6px 15px"
                    margin="0 10px 0 0"
                  >
                    <Text
                      margin="0"
                      width="auto"
                      size="14px"
                      bold="600"
                      color="#43CA3B"
                    >
                      {el.mountain}
                    </Text>
                  </Grid>
                  <Grid height="23px">
                    <Text
                      margin="0"
                      textOverflow="ellipsis"
                      size="1.6rem"
                      lineHeight="23px"
                    >
                      {el.mountainAddress}
                    </Text>
                  </Grid>
                </Grid>
              ))
            : null}
          {totalPage > curPage ? <div ref={setBottom}></div> : null}
        </Grid>
      </Grid>
    </SearchModalContainer>
  );
};

const SearchModalContainer = styled.div`
  padding: 16px 16px 25px;
`;

export default SearchModal;
