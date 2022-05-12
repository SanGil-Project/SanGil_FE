# # 설치한 라이브러리

- yarn add axios
- yarn add react-google-login
- yarn add react-kakao-maps-sdk
- yarn add react-responsive
- yarn add react-icons
- yarn add react-modal
- connected-react-router
- history

# 04 25 작업

- elements 요소들 props 추가, 스타일 약간 변경
- login 페이지 반응형 테스트
- 카카오 소셜 로그인 구현

# 04 26 작업

- elements 요소들 props 추가
- 구글, 네이버 소셜 로그인 1차 작업

# 04 28 작업

- 소셜 로그인 서버와 연결까지 완료 (카카오, 네이버, 구글)
- 소셜 로그인 api 코드 api.js 파일에 통합
- components 폴더의 파일들 한번에 import 가능하게 component.js 생성
- 카카오 지도 띄우기, 검색 1차 작업
- 카카오 지도 드래그 할 때, 중심좌표의 위도, 경도 받아오기

# 04 29 작업

- 카카오 지도에서 내가 가는 경로 그리기

# 04 30 작업

- pc 메인페이지 1차 완료
- 메인바 생성

# 05 01 작업

- 헤더 분기
- elements 요소들 props 추가
- element/profile.js 삭제
- 카카오맵 컴포넌트화
- 모바일 메인페이지 1차

# 05 02 작업

- 마이페이지 초안 완료(반응형작업필요)
- 전체지도 마커 표시하기
- 커스텀 오버레이작업

# 05 03 작업

- 전체 페이지 컴포넌트 기본 골격 생성
- 메뉴바의 버튼 각각의 컴포넌트로 연결 : useNavigate
- mypage 수정 모달 뷰 완성
- map 컴포넌트 재사용을 위해 분리
- 검색후 페이지 뷰 초안 완료
- Comment, CourseCard, Star 컴포넌트 생성
- SearchDetail 페이지 생성

# 05 04 작업

- 마이페이지 변경 모달 뷰 완성(와이어프레임 베이스)
- 페이지마다 메뉴바 색 변경 적용

# 05 08 작업

- FeedDetail 페이지 뷰
- 메인페이지 모임 api 연결
- Text.js / Input.js props 추가
- Icon 추가
- 피드 작성 페이지 추가
- 등산모임 디테일 페이지 뷰 완료
- 등산모임 작성 페이지 뷰
- 채팅방 뷰

# 05 09 작업

- 모임기능 api 설정
- 로그인 체크

# 05 10 작업

- 메인페이지 api 연결
- 트래킹 전 검색 페이지 api 연결
- 트래킹 페이지 api 연결 중
- 모임 페이지 api 연결 완료 (게시물 수정, 삭제 제외)
- 검색 페이지 api 연결 완료 (페이징 처리 필요)

# 05 11 작업

- 로그인 체크 api 수정
- userInfo의 username -> nickname 변경
- 마이페이지
  - titleList 불러오기, title 변경 , 닉네임 중복체크, 닉네임 변경 api 연결 완료
  - bookmark list api 연결 완료
  - userprofile 변경 api 연결 완료
- 모임페이지
  - 수정, 삭제 기능 추가
  - 수정, 삭제 api 연결 완료(리듀서 작업 필요)
- 페이지 별 연결
- 산 상세 페이지 api 연결 => 기상 api에서 응답이 느려지는 문제 발생

# 05 12 작업

- 트래킹 일시정지 시 completeId 새로 생성되는 오류 수정
- 피드 작성 페이지 다시 작업
- 피드 작성 기능 구현
- 피드 페이지에서 피드리스트 api 연결
- 피드 삭제 기능 구현
- 피드 좋아요 기능 구현
- FeedCard 컴포넌트 생성

# trouble shooting

- 0428

  - 카카오지도 검색 기능에서 검색어 state 초기 값을 null로 두면 400 에러 발생
  - 지도 검색 시, 초기 설정 지도가 겹쳐보이는 현상
    - 해결 방법: 지도 생성 함수와 키워드 검색 함수를 하나의 useEffect에서 관리하면서 나온 문제, 두개로 나누어 관리하면 해결된다

- 0504

  - 트래킹 중 맵을 다시 그려줘야 하는 문제 발생 : 현재 위치가 일정 시간마다 위도, 경도를 받아서 변하는데, 움직인 부분만큼 맵이 다시 로드 되지 않는다

- 0510
  - 스마트폰으로 작동할 때, 자동으로 화면이 어두워지는데, gps와 스톱워치 둘다 작동을 하지 않는다.
