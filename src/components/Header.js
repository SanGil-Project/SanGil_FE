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
  const isPagename = useSelector((state) => state.handle?.isPagename);
  const token = sessionStorage?.getItem("token");
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (token) {
      dispatch(isLogInDB(token));
    }
  }, []);

  const url = location.pathname
  const mainpage = ["/main", "/mypage", "/feed", "/party", "/search"];
  const noBack = mainpage.includes(url)

  return (
    <>
      {/* <Mobile>
        <Grid
          maxWidth="500px"
          height="64px"
          bg="#FFFFFF"
          position="fixed"
          zindex="1000"
          borderBottom="1px solid #DEDEDE"
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
          </Grid>
        </Grid>
      </Mobile>

      <Desktop> */}
        <Grid
          maxWidth="500px"
          height="64px"
          bg="#FFFFFF"
          position="fixed"
          zindex="100"
          borderBottom="1px solid #DEDEDE"
        >
          <Grid width="460px" margin="0 auto" isFlex>
            {noBack ? (
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
                </Grid>
              </>
            ) : (
              <>
                <Grid width="auto" height="auto" _onClick={() => navigate(-1)}>
                  <Icon type="headerBack" width="12px" height="20px" margin="0 auto" />
                </Grid>
                <Grid maxWidth="280px" isFlex>
                  <Grid
                    maxWidth="89px"
                    height="34px"
                    lineHeight="34px"
                    bg="#fff"
                    fontSize="1.6rem"
                    textAlign
                  >
                    {isPagename ? 
                      <Text margin="0" size="18px" bold="600">{isPagename}</Text> : 
                      <Image
                        width="auto"
                        height="auto"
                        margin="5px 0 0"
                        src="https://user-images.githubusercontent.com/91959791/168339851-d18da908-8213-49a7-a365-9cad6a0e862e.png"
                      />}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      {/* </Desktop> */}
    </>
  );
};

export default Header;
