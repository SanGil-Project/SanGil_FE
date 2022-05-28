import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Grid, Icon, Input, Text, ElInput } from "../elements/element";
import { searchNameDB } from "../redux/modules/tracker";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useNavigate } from "react-router";
import { CheckSpecial } from "../components/component";

const SearchTracking = (props) => {
  const { name, setName, setMountainId, searchOpen, setSearchOpen } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const searchData = useSelector((state) => state.tracker?.searchList);
  const trackerData = useSelector((state) => state?.tracker);

  const getName = _.debounce((e) => {
    if (CheckSpecial(e.target.value)) {
      alert("특수문자는 입력할 수 없습니다");
      e.target.value = "";
    }
    setName(e.target.value);
  }, 1000);

  const select = (el) => {
    setMountainId(el.mountainId);
    setName(el.mountain);
    setSearchOpen(false);
  };

  const onScroll = _.throttle((e) => {
    // 총 높이: e.target.scrollHeight
    // 현재 높이:  curHeight
    const clientHeight = e.target.scrollHeight;
    const curHeight = e.target.scrollTop;
    if (
      clientHeight - curHeight <= 500 &&
      !(trackerData?.searchTotalPg - 1 === trackerData?.searchCurrentPg)
    ) {
      setPageNum((prev) => prev + 1);
    }
  }, 500);

  const cancle = () => {
    navigate("/main", { replace: true });
  };

  React.useEffect(() => {
    setName("");
    if (name) {
      dispatch(searchNameDB(name, pageNum));
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [name, pageNum]);

  return (
    <Modal>
      <div
        onScroll={onScroll}
        className="modal_container"
        style={{
          height: "50vh",
          overflowY: "scroll",
        }}
      >
        <Grid height="100%" width="90%" margin="0 auto">
          <Grid width="94%" height="52px" margin="0 auto" isFlex>
            <Grid
              border="1px solid black"
              width="80.46%"
              height="52px"
              margin="0"
              radius="40px"
              bg="#ffffff"
              isFlex
            >
              <Icon
                type="find"
                width="30px"
                height="36px"
                margin="0 0 0 10px"
              />
              <ElInput
                size="1.6rem"
                height="50px"
                border="none"
                width="78.71%"
                margin="0 20px 0 0"
                placeholder="어떤 산을 찾고 계신가요?"
                _onChange={getName}
              />
            </Grid>
            <Text color="#6F6F6F" hover _onClick={cancle}>
              취소
            </Text>
          </Grid>
          {searchData
            ? searchData.map((el, idx) => (
                <Grid
                  key={idx}
                  height="52px"
                  isFlex
                  hover
                  margin="0 20px"
                  _onClick={() => select(el)}
                >
                  <Grid
                    border="2px solid #43CA3B"
                    bg="#fff"
                    maxWidth="102px"
                    height="30px"
                    textAlign="center"
                    fontSize="1.4rem"
                    lineHeight="25px"
                    radius="30px"
                    margin="7px 0"
                    color="#43CA3B"
                  >
                    {searchData[idx].mountain}
                  </Grid>
                  <Grid height="23px">
                    <Text
                      maxWidth="250px"
                      height="23px"
                      margin="0 0 0 10px"
                      textOverflow="ellipsis"
                      size="1.6rem"
                      lineHeight="20px"
                    >
                      {searchData[idx].mountainAddress}
                    </Text>
                  </Grid>
                </Grid>
              ))
            : null}
        </Grid>
      </div>
    </Modal>
  );
};

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  padding: 25vh 20px;
  box-sizing: border-box;

  animation: ${(props) => (props.modalState ? FadeIn : FadeOut)} 0.2s ease-out
    alternate;
  .modal_container {
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 1px 3px 10px rgba(69, 69, 69, 0.2);
    padding: 30px 0;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
  }
`;

export default SearchTracking;
