import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import { history } from "../redux/configureStore";
// import { ConnectedRouter } from "connected-react-router";
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
  PartyDetail,
  FeedWrite,
  BeforeTracking,
  EndTracking,
  PartyWrite,
  ChatRoom,
  Mytrack,
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
          <Route path="/party" exact element={<Party />} />
          <Route path="/partywrite" exact element={<PartyWrite />} />
          <Route path="/partywrite/:partyId" exact element={<PartyWrite />} />
          <Route path="/partydetail/:partyId" element={<PartyDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchdetail/:mountainId" element={<SearchDetail />} />
          <Route path="/searchmountain" element={<BeforeTracking />} />
          <Route path="/tracker/:name/:mountainId" element={<Tracker />} />
          <Route path="/endtracking/:name" element={<EndTracking />} />
          <Route path="/mytrack/:completedId" element={<Mytrack />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feedwrite" element={<FeedWrite />} />
          <Route path="/chatroom/:partyid" element={<ChatRoom />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

const Container = styled.div`
  background-color: #9EE59C;
<<<<<<< HEAD
=======
  width: 100vw,
  // height: 100vh,
>>>>>>> develop
`;

Modal.setAppElement("#root");

export default App;
