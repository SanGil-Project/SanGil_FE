import React from "react";
import {Grid,Button,Icon,Image} from'../elements/element'
import { Desktop, Mobile } from "../shared/responsive";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = sessionStorage.getItem("token");

  const logIn = () => {
    navigate("/login");
  };

  if (token && userInfo) {
    return (
      <>
        {/* <Desktop> */}
        <Grid maxWidth="414px" height="64px" bg="#C4C4C4">
          <Grid margin="0 0 0 39.25%" maxWidth="238px" isFlex>
            <Grid
              maxWidth="89px"
              height="34px"
              lineHeight="34px"
              bg="#fff"
              fontSize="1.6rem"
              textAlign
            >
              데스크탑
            </Grid>
            {userInfo?.userImageUrl ? (
              <Image
                type="circle"
                width="40px"
                height="40px"
                src="https://www.theguru.co.kr/data/photos/20210937/art_16316071303022_bf8378.jpg"
              />
            ) : (
              <Icon width="40px" height="40px" />
            )}
          </Grid>
        </Grid>
        {/* </Desktop> */}
      </>
    );
  }

  return (
    <>
      {/* <Mobile>
        <Grid maxWidth="100vw" height="64px" bg="#C4C4C4" position="fixed">
          <Grid margin="0 0 0 39.25%" maxWidth="55%" isFlex>
            <Grid
              maxWidth="38.7%"
              height="34px"
              lineHeight="34px"
              bg="#fff"
              fontSize="1.6rem"
              textAlign
            >
              모바일
            </Grid>
            <Button
              maxWidth="24.8%"
              height="34px"
              fontSize="1.4rem"
              _onClick={logIn}
            >
              로그인
            </Button>
          </Grid>
        </Grid>
      </Mobile> */}

      {/* <Desktop> */}
      <Grid maxWidth="414px" height="64px" bg="#C4C4C4">
        <Grid margin="0 0 0 39.25%" maxWidth="230px" isFlex>
          <Grid
            maxWidth="89px"
            height="34px"
            lineHeight="34px"
            bg="#fff"
            fontSize="1.6rem"
            textAlign
          >
            데스크탑
          </Grid>
          <Button
            maxWidth="57px"
            height="34px"
            fontSize="1.4rem"
            _onClick={logIn}
          >
            로그인
          </Button>
        </Grid>
      </Grid>
      {/* </Desktop> */}
    </>
  );
};

export default Header;
