import "./App.css";
import "../assets/fonts/font.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import background from "../assets/images/cover.png";
import { history } from "../redux/configureStore";
// import { ConnectedRouter } from "connected-react-router";
import styled from "styled-components";
import MobileFrame from "./../components/common/MobileFrame";
// social login
import { KakaoLogin, GoogleLogin, NaverLogin } from "../components/component";
import { Image } from "../elements/element";
import {
  Login,
  Main,
  Mypage,
  MypageEdit,
  Feed,
  Party,
  Search,
  SearchDetail,
  Tracker,
  PartyDetail,
  FeedWrite,
  PartyWrite,
  ChatRoom,
  Mytrack,
  DetailCmt,
  FeedDetail,
  MyFeed,
} from "../page/page";

function App() {
  return (
    <BrowserRouter>
      <Fullscreen>
        <Wrap>
          <MobileFrame>
            <Routes>
              <Route path="/main" element={<Main />} />
              <Route path="/" element={<Login />} />
              <Route path="/user/kakao/callback" element={<KakaoLogin />} />
              <Route path="/user/google/callback" element={<GoogleLogin />} />
              <Route path="/user/naver/callback" element={<NaverLogin />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/mypageEdit" element={<MypageEdit />} />
              <Route path="/myfeed" element={<MyFeed />} />
              <Route path="/party" exact element={<Party />} />
              <Route path="/partywrite" exact element={<PartyWrite />} />
              <Route
                path="/partywrite/:partyId"
                exact
                element={<PartyWrite />}
              />
              <Route path="/partydetail/:partyId" element={<PartyDetail />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/searchdetail/:mountainId"
                element={<SearchDetail />}
              />
              <Route
                path="/detailcomment/:mountainId"
                element={<DetailCmt />}
              />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/mytrack/:completedId" element={<Mytrack />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/feeddetail/:feedId" element={<FeedDetail />} />
              <Route path="/feedwrite" element={<FeedWrite />} />
              <Route path="/chatroom/:chatRoomId" element={<ChatRoom />} />
            </Routes>
          </MobileFrame>
        </Wrap>
      </Fullscreen>
    </BrowserRouter>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  .MobileFramePage {
    z-index: 9999;
  }
`;

const Fullscreen = styled.div`
  background-image: url(${background});
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  margin: 0;
  display: flex;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 540px) {
    justify-content: center;
  }
  @media (max-width: 1579px) and (min-width: 541px) {
    justify-content: flex-end;
  }
  @media (min-width: 1580px) {
  }
`;

export default App;
