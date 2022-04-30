import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const NaverLogin = (props) => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");

  React.useEffect(() => {
    const naverLogin = async () => {
      await dispatch(userActions.naverLoginDB(code, state));
    };
    naverLogin();
  }, []);

  return (
    <React.Fragment>
      연결 화면 테스트
    </React.Fragment>
  );
};

export default NaverLogin;