import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const GoogleLogin = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    const googleLogin = async () => {
      await dispatch(userActions.googleLoginDB(code));
    };
    googleLogin();
  }, []);

  return (
    <React.Fragment>
      연결 화면 테스트
    </React.Fragment>
  );
};

export default GoogleLogin;