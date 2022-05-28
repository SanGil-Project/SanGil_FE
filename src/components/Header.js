import React from "react";
import { Grid, Button, Icon, Image, Text } from "../elements/element";
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

  const goHome = () => {
    navigate("/main", { replace: true });
  };
  React.useEffect(() => {
    if (token) {
      dispatch(isLogInDB(token));
    }
  }, []);
  const url = location.pathname;
  const mainpage = ["/main", "/mypage", "/feed", "/party", "/search"];
  const noBack = mainpage.includes(url);

  if (noBack) {
    return (
      <>
        <Grid
          maxWidth="500px"
          height="64px"
          bg="#FFFFFF"
          position="fixed"
          zindex="100"
          borderBottom="1px solid #DEDEDE"
        >
          <Grid maxWidth="280px" margin="0 auto" flexRow>
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
                hover
                _onClick={goHome}
                src="https://user-images.githubusercontent.com/91959791/168339851-d18da908-8213-49a7-a365-9cad6a0e862e.png"
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
  if (!noBack) {
    return (
      <>
        <Grid
          maxWidth="500px"
          height="64px"
          bg="#FFFFFF"
          position="fixed"
          zindex="100"
          borderBottom="1px solid #DEDEDE"
        >
          <Grid width="auto" margin="0 auto" isFlex>
            <Grid
              width="auto"
              height="auto"
              margin="0 0 0 17px"
              _onClick={() => navigate(-1)}
              hover
            >
              <Icon
                type="headerBack"
                width="12px"
                height="20px"
                margin="0 auto"
              />
            </Grid>
            <Grid flexRow bg="#fff" fontSize="1.6rem" margin="0 5px 0 0">
              {isPagename ? (
                <Text margin="0 10px 0 0" size="18px" bold="600">
                  {isPagename}
                </Text>
              ) : (
                <Image
                  width="auto"
                  height="auto"
                  margin="0 5% 0 0"
                  _onClick={goHome}
                  src="https://user-images.githubusercontent.com/91959791/168339851-d18da908-8213-49a7-a365-9cad6a0e862e.png"
                />
              )}
            </Grid>
            <Grid width="12px" height="20px"></Grid>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Header;
