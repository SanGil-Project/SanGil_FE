import React from "react";
import Grid from "../elements/Grid";
import { Desktop, Mobile } from "../shared/responsive";
import Button from "./../elements/Button";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const logIn = () => {
    navigate("/login");
  };
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
