import React from "react";
import styled from "styled-components";
import { Grid, Text, Image, Input, Icon, Button } from "../elements/element";
import { Header, Menubar } from "../components/component";
import { Desktop, Mobile } from "../shared/responsive";

const FeedWrite = () => {
  const menuColor = [false, false, true, false, false];
  const [img, setImg] = React.useState({ preImg: "", uploadImg: "" });

  const preview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImg({ ...img, uploadImg: file, preImg: reader.result });
    };
  };

  const deletePreImg = () => {
    setImg({ uploadImg: "", preImg: "" });
  };

  return (
    <>
      <Mobile>
        <Grid width="100vw" height="100vw" margin="0 auto">
          <Header />
          <Grid padding="7px" overflowY="scroll">
            <Grid
              maxWidth="93.23%"
              height="25px"
              margin="88px auto 0 auto"
              isFlex
            >
              <Text size="2rem" bold="600" lineHeight="25px" margin="0">
                글 작성하기
              </Text>
              <Text bold="400" size="1.6rem" hover>
                완료
              </Text>
            </Grid>
            <div>
              <Grid maxWidth="93.23%" margin="50px auto 0 auto" flex="flex">
                <Grid
                  width="100px"
                  height="100px"
                  margin="0 5px 0 5px"
                  position="relative"
                >
                  {img.preImg !== "" ? (
                    <Button
                      border="none"
                      type="div"
                      width="18px"
                      height="18px"
                      position="absolute"
                      radius="100%"
                      top="5px"
                      left="75px"
                      bgColor="#fff"
                    >
                      <Icon
                        width="10px"
                        height="18px"
                        type="delete"
                        _onClick={deletePreImg}
                      />
                    </Button>
                  ) : null}
                  <Image
                    border="1px solid #c4c4c4"
                    width="100px"
                    height="100px"
                    borderRadius="14px"
                    objectFit="scale-down"
                    src={
                      img.preImg !== ""
                        ? img.preImg
                        : "https://cdn.daily.hankooki.com/news/photo/202205/820972_1091017_844.jpg"
                    }
                  />
                </Grid>
                <Label>
                  <Icon
                    type="plus"
                    width="15px"
                    height="15px"
                    margin="42.5px 42.5px"
                  />
                  <Input
                    type="file"
                    width="100px"
                    height="100px"
                    display="none"
                    _onChange={preview}
                  ></Input>
                </Label>
              </Grid>
            </div>
          </Grid>
          {/* <Menubar menuColor={menuColor} /> */}
        </Grid>
      </Mobile>

      {/* 데스크탑 */}
      <Desktop>
        <Grid border="1px solid black" width="414px" margin="0 auto">
          <Header />
          <Grid padding="7px" overflowY="scroll" height="1080px">
            <Grid
              maxWidth="386px"
              height="25px"
              margin="88px auto 0 auto"
              isFlex
            >
              <Text size="2rem" bold="600" lineHeight="25px" margin="0">
                글 작성하기
              </Text>
              <Text bold="400" size="1.6rem" hover>
                완료
              </Text>
            </Grid>
            <div>
              <Grid maxWidth="386px" margin="50px auto 0 auto" flex="flex">
                <Grid
                  position="relative"
                  width="100px"
                  height="100px"
                  margin="0 5px 0 5px"
                >
                  {img.preImg !== "" ? (
                    <Button
                      border="none"
                      type="div"
                      width="18px"
                      height="18px"
                      position="absolute"
                      radius="100%"
                      top="5px"
                      left="75px"
                      bgColor="#fff"
                    >
                      <Icon
                        width="10px"
                        height="18px"
                        type="delete"
                        _onClick={deletePreImg}
                      />
                    </Button>
                  ) : null}

                  <Image
                    border="1px solid #c4c4c4"
                    width="100px"
                    height="100px"
                    borderRadius="14px"
                    objectFit="scale-down"
                    src={
                      img.preImg !== ""
                        ? img.preImg
                        : "https://cdn.daily.hankooki.com/news/photo/202205/820972_1091017_844.jpg"
                    }
                  />
                </Grid>
                <Label>
                  <Icon
                    type="plus"
                    width="15px"
                    height="15px"
                    margin="42.5px 42.5px"
                  ></Icon>
                  <Input
                    type="file"
                    width="100px"
                    height="100px"
                    display="none"
                    _onChange={preview}
                  ></Input>
                </Label>
              </Grid>
            </div>
          </Grid>
          <Menubar menuColor={menuColor} />
        </Grid>
      </Desktop>
    </>
  );
};

const Label = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 14px;
  background-color: #c4c4c4;
  &:hover {
    cursor: pointer;
  }
`;

export default FeedWrite;
