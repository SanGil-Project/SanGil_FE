import React from "react";
import { Grid, Button, Icon, Image } from "../elements/element";
import { Desktop, Mobile } from "../shared/responsive";
import { isLogInDB } from "../redux/modules/user";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user?.userInfo);
  const token = sessionStorage?.getItem("token");
  const dispatch = useDispatch();

  const logIn = () => {
    navigate("/login");
  };

  React.useEffect(() => {
    if (token) {
      dispatch(isLogInDB(token));
    }
  }, []);

  if (userInfo) {
    return (
      <>
        <Mobile>
          <Grid
            maxWidth="500px"
            height="64px"
            bg="#C4C4C4"
            position="fixed"
            zindex="10"
          >
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
              {userInfo?.userImageUrl && userInfo.userImageUrl !== "없음" ? (
                <Image
                  type="circle"
                  width="40px"
                  height="40px"
                  src={userInfo.userImageUrl}
                />
              ) : (
                <Icon width="40px" height="40px" />
              )}
            </Grid>
          </Grid>
        </Mobile>

        <Desktop>
          <Grid
            maxWidth="500px"
            height="64px"
            bg="#C4C4C4"
            position="fixed"
          >
            <Grid margin="0 0 0 39.25%" maxWidth="280px" isFlex>
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
              {userInfo?.userImageUrl && userInfo.userImageUrl !== "없음" ? (
                <Image
                  type="circle"
                  width="40px"
                  height="40px"
                  src={userInfo.userImageUrl}
                />
              ) : (
                <Icon width="40px" height="40px" />
              )}
            </Grid>
          </Grid>
        </Desktop>
      </>
    );
  }

  return (
    <>
      <Mobile>
        <Grid
          maxWidth="500px"
          height="64px"
          bg="#C4C4C4"
          position="fixed"
          zindex="10"
        >
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
              border="1px solid #fff"
              radius="4px"
              maxWidth="28.8%"
              height="34px"
              fontSize="1.4rem"
              _onClick={logIn}
            >
              로그인
            </Button>
          </Grid>
        </Grid>
      </Mobile>

      <Desktop>
        <Grid
          maxWidth="500px"
          height="64px"
          bg="#C4C4C4"
          position="fixed"
        >
          <Grid margin="0 0 0 39.25%" maxWidth="280px" isFlex>
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
              border="1px solid #fff"
              radius="4px"
              maxWidth="57px"
              height="34px"
              fontSize="1.4rem"
              _onClick={logIn}
            >
              로그인
            </Button>
          </Grid>
        </Grid>
      </Desktop>
    </>
  );
};

export default Header;
