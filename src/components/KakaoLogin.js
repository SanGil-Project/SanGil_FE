import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useNavigate } from "react-router";

const KakaoLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인가코드 받기
  let code = new URL(window.location.href).searchParams.get("code");
  // console.log("모듈에서 확인 ::", window.location.href);

  React.useEffect(() => {
    const kakaoLogin = async () => {
      await dispatch(userActions.kakaoLoginDB(code));
    };
    kakaoLogin();
    navigate("/main", { replace: true });
  }, []);

  return <React.Fragment>연결 화면 테스트</React.Fragment>;
};

export default KakaoLogin;
