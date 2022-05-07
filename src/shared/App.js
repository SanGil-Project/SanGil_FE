import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
// social login
import { KakaoLogin, GoogleLogin, NaverLogin } from "../components/component";
import {
  Login,
  Main,
  Mypage,
  Feed,
  Party,
  Search,
  SearchDetail,
  Tracker,
  FeedDetail,
} from "../page/page";

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
          <Route path="/feed" element={<Feed />} />
          <Route path="/party" element={<Party />} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchdetail/:name" element={<SearchDetail />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/feeddetail" element={<FeedDetail />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

const Container = styled.div`
  width: 100%,
  height: 100%,
`;

Modal.setAppElement("#root");

export default App;
