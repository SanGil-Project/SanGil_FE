import React from "react";
import styled from "styled-components";
import { Grid, Text, Image, Icon, Button, Input } from "../elements/element";
import { Header, Menubar } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";
import _ from "lodash";
import { addFeedDB } from "./../redux/modules/feed";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const FeedWrite = () => {
  const navigate = useNavigate();
  const menuColor = [false, false, true, false, false];
  const dispatch = useDispatch();
  const comment = React.useRef();
  const [img, setImg] = React.useState({
    preImg: "",
    uploadImg: "",
  });

  const preview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImg({ ...img, uploadImg: file, preImg: reader.result });
    };
  };

  const deletePreImg = () => {
    setImg({ ...img, uploadImg: "", preImg: "" });
  };

  const sendData = () => {
    if (img.comment === "") {
      return alert("글을 작성해주세요");
    }
    if (img.uploadImg === "") {
      return alert("사진을 선택해주세요");
    }
    if (img.comment !== "" && img.uploadImg !== "") {
      dispatch(
        addFeedDB({
          feedContent: comment.current?.value,
          multipartfile: img.uploadImg,
        })
      );
      navigate("/feed", { replace: true });
    }
  };

  return (
    <>
      {/* 데스크탑 */}
      <Desktop>
        <Grid width="500px" margin="0 auto" bg="#fff">
          <Header />
          <Grid padding="7px" overflowY="scroll" height="1080px">
            <Grid
              maxWidth="93.23%"
              height="25px"
              margin="88px auto 0 auto"
              isFlex
            >
              <Text size="2rem" bold="600" lineHeight="25px" margin="0">
                피드 작성하기
              </Text>
              {img.preImg !== "" ? (
                <Button
                  border="none"
                  color="white"
                  bold="600"
                  width="50px"
                  height="38px"
                  type="div"
                  radius="12px"
                  bgColor="#43CA3B"
                  fontSize="1.6rem"
                  _onClick={sendData}
                >
                  완료
                </Button>
              ) : null}
            </Grid>

            <Grid width="93.23%" height="25px" margin="10px auto 0 auto">
              <TextArea
                ref={comment}
                placeholder="이 사진에 대해 이야기 해주세요...plz"
              ></TextArea>
            </Grid>
            {img.preImg !== "" ? (
              <Grid
                width="100%"
                height="500px"
                radius="12px"
                margin="20px 0 0 0"
                border="1px solid green"
              >
                <Image
                  width="100%"
                  height="500px"
                  borderRadius="12px"
                  src={img.preImg}
                  objectFit="contain"
                />
                <Icon
                  width="15px"
                  height="16px"
                  type="delete"
                  position="absolute"
                  margin="10px 0 0 -30px"
                  _onClick={deletePreImg}
                  hover
                />
              </Grid>
            ) : (
              <label htmlFor="img">
                <Grid
                  width="100%"
                  height="500px"
                  bg="#e6e6e8"
                  margin="20px 0 0 0"
                  radius="12px"
                  hover
                >
                  <Icon
                    type="plus"
                    width="100px"
                    height="100px"
                    margin="200px 200px"
                  />
                  <ImgInput id="img" type="file" onChange={preview}></ImgInput>
                </Grid>
              </label>
            )}
          </Grid>
          <Menubar menuColor={menuColor} />
        </Grid>
      </Desktop>
    </>
  );
};

const ImgInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 25px;
  resize: none;
  margin: 0 auto;
  outline: none;
  font-size: 1.8rem;
  box-sizing: border-box;
  border: none;
`;

export default FeedWrite;
