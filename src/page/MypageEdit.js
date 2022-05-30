import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as handleActions } from "../redux/modules/handle";

import { Header, AlertModal, TitleModal } from "../components/component";
import { Grid, Text, Image, Button, Input, ElInput } from "../elements/element";

const MypageEdit = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const user = useSelector((state) => state?.user);
  const titleList = useSelector(
    (state) => state?.user?.titleList?.userTitleDtoList
  );
  const titleHint = useSelector((state) => state?.user?.titleHint);
  const userInfo = user?.userInfo;
  const userNickname = userInfo?.nickname;
  const checkData = user?.nameCheck;

  console.log(userInfo)

  React.useEffect(() => {
    dispatch(handleActions.isPagename("내 정보 수정"));
    dispatch(userActions.myTitleDB());
  }, []);

  const img =
    userInfo?.userImageUrl !== "없음"
      ? userInfo?.userImageUrl
      : "https://user-images.githubusercontent.com/91959791/168119302-948f0dcf-8165-47af-8b6b-2f90f74aca06.png";
  const userTitleList = titleList?.filter((p) => p.have === true);
  const noTitleList = titleList?.filter((p) => p.have === false);

  const [nameCount, setNameCount] = useState(userInfo?.nickname?.length);
  const [nickname, setNickname] = useState(userNickname);
  const [_userTitle, set_userTitle] = useState(userInfo?.userTitle);

  const [preview, setPreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [titlemodalOpen, setTitleModalOpen] = useState(false);
  const [titlemodalContent, setTitleModalContent] = useState("");
  const [titlemodalUrl, setTitleModalUrl] = useState("");

  console.log(userInfo, userNickname, nickname, nameCount, _userTitle)
  const selectFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      setPreview(reader.result); // 바로 보여주기
      dispatch(userActions.changeImgDB(file, reader.result));
    };
  };

  const changeNickname = (e) => {
    // 현 글자수 보여주기
    setNameCount(e.target.value.length);
    //  글자수 10자로 제한
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substr(0, 10);
      setNickname(e.target.value.substr(0, 10));
      // 10이상은 10으로 고정 (11 안나오게)
      setNameCount(10);
    }
    setNickname(e.target.value);
  };

  const checkBtnColor = checkData ? "#43CA3B" : "#C4C4C4"; // 닉네임 변경 가능(초록) : 변경 불가(회색)
  let checkBarColor = checkData ? "#43CA3B" : "#C4C4C4"; // 닉네임 변경 가능(초록) : 변경 불가(회색)
  let checkType = true;
  const defalutsrc =
    "https://user-images.githubusercontent.com/91959791/168119302-948f0dcf-8165-47af-8b6b-2f90f74aca06.png";

  if (!checkData) {
    // 중복이거나, 값이 없을때(닉네임그대로)
    if (userInfo?.nickname === nickname || !nickname) {
      // 닉네임이 그대로거나 값이 없거나
      checkType = true;
    } else {
      // 중복
      checkType = false;
      checkBarColor = "#FF1C1C"; // 변경 불가 중에 중복은 빨간색
    }
  } else {
    // 가능
    checkType = true;
  }

  React.useEffect(() => {
    if (nickname) {
      dispatch(userActions.nameCheckDB(nickname));
    }
  }, [nickname]);

  const changeName = () => {
    if (!checkData) {
      setModalContent(
        checkType ? "변경사항이 없습니다" : "중복된 닉네임입니다"
      );
      setModalOpen(true);
      return;
    }
    dispatch(userActions.changeNameDB(nickname));
    setModalContent("닉네임 변경 완료!");
    setModalOpen(true);
  };

  const selectTitle = (curTitle) => {
    // 타이틀 수정
    set_userTitle(curTitle);
    dispatch(userActions.changeTitleDB(curTitle));
  };

  const getHint = (data) => {
    const filtTitle = titleHint?.filter((p) => p.userTitle === data.userTitle);
    setTitleModalContent(filtTitle[0].titleHint);
    setTitleModalUrl(data.userTitleImgUrl);
    setTitleModalOpen(true);
  };

  return (
    <React.Fragment>
      <MypageContainer>
        <Header />
        {modalOpen && (
          <AlertModal
            type="check"
            onClose={setModalOpen}
            modalState={modalOpen}
            contents={modalContent}
          />
        )}
        {titlemodalOpen && (
          <TitleModal
            type="hint"
            onClose={setTitleModalOpen}
            modalState={titlemodalOpen}
            contents={titlemodalContent}
            url={titlemodalUrl}
          />
        )}
        <Grid padding="69px 22px 10px" height="auto">
          <Grid flexColumn height="auto" padding="5px 0">
            <UserProfile>
              <Label className="input_file_button" htmlFor="input_image">
                <Image
                  hover
                  type="circle"
                  width="100px"
                  height="100px"
                  src={
                    preview
                      ? preview
                      : userInfo?.userImageUrl !== "없음"
                      ? userInfo?.userImageUrl
                      : defalutsrc
                  }
                />
              </Label>
              <input
                id="input_image"
                type="file"
                ref={fileInput}
                onChange={selectFile}
                style={{ display: "none" }}
              />
            </UserProfile>
            <Grid flexRow padding="10px 0 42px">
              <UserName>
                <Grid flexRow width="auto">
                  <Grid width="4px" height="23px" bg={checkBarColor}></Grid>
                  <ElInput
                    size="14px"
                    width="140px"
                    padding="4.5px 0 4.5px 8px"
                    margin="0"
                    border="none"
                    bg="transparent"
                    value={nickname ? nickname : userInfo?.nickname}
                    _onChange={changeNickname}
                  />
                </Grid>
                <Text
                  margin="0 10px"
                  bold="500"
                  size="10px"
                  color="#c4c4c4"
                  width="auto"
                >
                  {" "}
                  {nameCount}/10
                </Text>
              </UserName>
              <Button
                width="auto"
                height="23px"
                padding="4.5px 10px"
                bgColor={checkBtnColor}
                radius="4px"
                border="none"
                _onClick={changeName}
              >
                <Text margin="0" color="#fff" align size="12px" bold="600">
                  변경
                </Text>
              </Button>
            </Grid>
          </Grid>
          <Grid height="auto" padding="0">
            <TitleList>
              {userTitleList?.map((t, idx) => {
                const pick = userInfo?.userTitle === t.userTitle ? true : false;
                return (
                  <Grid
                    key={idx}
                    _onClick={() => {
                      selectTitle(t.userTitle);
                    }}
                    margin="0 7px"
                    width="100px"
                    height="164px"
                  >
                    <TitleItem
                      key={idx}
                      title={t.userTitle}
                      img={t.userTitleImgUrl}
                      pick={pick}
                      have
                    />
                  </Grid>
                );
              })}
              {noTitleList?.map((t, idx) => {
                return (
                  <Grid
                    key={idx}
                    _onClick={() => {
                      getHint(t);
                    }}
                    margin="0 7px"
                    width="100px"
                    height="164px"
                  >
                    <TitleItem
                      key={idx}
                      title={t.userTitle}
                      img={t.userTitleImgUrl}
                    />
                  </Grid>
                );
              })}
            </TitleList>
          </Grid>
        </Grid>
      </MypageContainer>
    </React.Fragment>
  );
};

const MypageContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 500px;
  margin: auto;
  background-color: #fff;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f1f1f1;
  margin: 0 6px 0 0;
  width: 188px;
  height: 23px;
  box-sizing: border-box;
`;

const UserProfile = styled.div`
  display: flex;
`;

const TitleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Label = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    box-shadow: 0 1px 4px rgb(0, 0, 0, 0.3);
  }
`;

export default MypageEdit;

const TitleItem = (props) => {
  const { title, img, pick, have, selectTitle } = props;
  const textBold = pick ? "600" : "500";
  let textColor = pick ? "#43CA3B" : "#919191";

  if (!have) {
    textColor = "#D2D2D2";
  }

  return (
    <React.Fragment>
      <Grid flexColumn width="100px" radius="4px" hover justify="flex-start">
        <Image width="100px" height="100px" borderRadius="100%" src={img} />
        <Text
          width="100px"
          margin="5px 0 0 0"
          size="14px"
          bold={textBold}
          align="center"
          color={textColor}
        >
          {title}
        </Text>
      </Grid>
    </React.Fragment>
  );
};
