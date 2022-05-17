import React from "react";
import { Grid, Button, Icon, Image, Text } from "../elements/element";
import { Desktop, Mobile } from "../shared/responsive";
import { isLogInDB } from "../redux/modules/user";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
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
            width="100vw"
            height="64px"
            bg="#FFFFFF"
            position="fixed"
            zindex="1000"
            borderBottom="2px solid #F5F5F5"
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
                <Image
                  width="auto"
                  height="auto"
                  margin="5px 0 0"
                  src="https://user-images.githubusercontent.com/91959791/168339851-d18da908-8213-49a7-a365-9cad6a0e862e.png"
                />
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
            bg="#FFFFFF"
            position="fixed"
            zindex="1000"
            borderBottom="2px solid #F5F5F5"
          >
            <Grid width="460px" margin="0 auto" isFlex>
              {location.pathname !== "/" ? (
                <>
                  <Text
                    width="35px"
                    height="50px"
                    lineHeight="40px"
                    size="50px"
                    hover
                    _onClick={() => navigate(-1)}
                  >{`<`}</Text>
                  <Grid maxWidth="280px" isFlex>
                    <Grid
                      maxWidth="89px"
                      height="34px"
                      lineHeight="34px"
                      bg="#fff"
                      fontSize="1.6rem"
                      textAlign
                    >
                      <Image
                        width="auto"
                        height="auto"
                        margin="5px 0 0"
                        src="https://user-images.githubusercontent.com/91959791/168339851-d18da908-8213-49a7-a365-9cad6a0e862e.png"
                      />
                    </Grid>
                    {userInfo?.userImageUrl &&
                    userInfo.userImageUrl !== "없음" ? (
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
                </>
              ) : (
                <>
                  <Grid maxWidth="280px" margin="0 0 0 39.2%" isFlex>
                    <Grid
                      maxWidth="89px"
                      height="34px"
                      lineHeight="34px"
                      bg="#fff"
                      fontSize="1.6rem"
                      textAlign
                    >
                      <Image
                        width="auto"
                        height="auto"
                        margin="5px 0 0"
                        src="https://user-images.githubusercontent.com/91959791/168339851-d18da908-8213-49a7-a365-9cad6a0e862e.png"
                      />
                    </Grid>
                    {userInfo?.userImageUrl &&
                    userInfo.userImageUrl !== "없음" ? (
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
                </>
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
          bg="#FFFFFF"
          position="fixed"
          zindex="1000"
          borderBottom="2px solid #F5F5F5"
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
              <Image
                width="auto"
                height="auto"
                margin="5px 0 0"
                src="https://user-images.githubusercontent.com/91959791/168339851-d18da908-8213-49a7-a365-9cad6a0e862e.png"
              />
            </Grid>
            <Button
              bgColor="#43CA3B"
              border="none"
              radius="4px"
              padding="9px 10px"
              // maxWidth="28.8%"
              width="57px"
              height="35px"
              _onClick={logIn}
            >
              <Text margin="0" color="#fff" size="14px" bold="700">
                로그인
              </Text>
            </Button>
          </Grid>
        </Grid>
      </Mobile>

      <Desktop>
        <Grid
          maxWidth="500px"
          height="64px"
          bg="#FFFFFF"
          zindex="1000"
          position="fixed"
          borderBottom="2px solid #F5F5F5"
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
              <Image
                width="auto"
                height="auto"
                margin="5px 0 0"
                src="https://user-images.githubusercontent.com/91959791/168339851-d18da908-8213-49a7-a365-9cad6a0e862e.png"
              />
            </Grid>
            <Button
              bgColor="#43CA3B"
              border="none"
              radius="4px"
              padding="9px 10px"
              // maxWidth="28.8%"
              width="57px"
              height="35px"
              _onClick={logIn}
            >
              <Text margin="0" color="#fff" size="14px" bold="700">
                로그인
              </Text>
            </Button>
          </Grid>
        </Grid>
      </Desktop>
    </>
  );
};

export default Header;
