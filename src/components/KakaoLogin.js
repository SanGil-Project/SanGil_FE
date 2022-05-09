import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useNavigate } from "react-router";

const KakaoLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인가코드 받기
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    const kakaoLogin = async () => {
      await dispatch(userActions.kakaoLoginDB(code));
    };
    kakaoLogin();
    navigate("/", { replace: true });
  }, []);

  return <React.Fragment>연결 화면 테스트</React.Fragment>;
};

export default KakaoLogin;
