import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Login from "../page/Login";
import Main from "../page/Main";

// social login
import { KakaoLogin, GoogleLogin, NaverLogin } from '../components/component';

import Mypage from "../page/Mypage";

function App() {
  return (
    <BrowserRouter>
      <Container>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/kakao/callback" element={<KakaoLogin />} />
        <Route path="/user/google/callback" element={<GoogleLogin />} />
        <Route path="/user/naver/callback" element={<NaverLogin />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

const Container = styled.div`
  width: 100%,
  height: 100%,
`;

export default App;
