# 🌲 산길: 🌲

<img width="400" alt="로고" src="https://산길.com/static/media/193Logo.7335472140281cb94a24.png">

[👉산길 바로가기](https://xn--wk0b636a.com/)

#### FRONTEND MEMBERS

[박예슬](https://github.com/parkksss)
[천누리](https://github.com/Kopite93)
</br></br>

## 1️⃣ 프로젝트 설명🍀

<pre>‘산길’은 유저들이 모여 등산코스를 추천하고 기록하는 서비스입니다.

등산하기 전에 등산 모임을 만들어 같이 등산할 파티를 구성해 같이 등산을 진행하고 피드도 공유해보세요!</pre>

[산길 팀 노션](https://www.notion.so/4bc091b8477f44a3a14b164b8599a76f?v=ea4b50a3ab81410f88b7e31e660a1415)

</br></br>

## 2️⃣ 프로젝트 요약🌈

- 기간 : 2022.04.22 ~ 2022.06.02
- 개발 언어 : Javascript
- 개발 라이브러리 : React
- 배포 환경 : Amazon S3, CloudFront
- 협업 툴 : Git / Notion / slack

</br>

## 3️⃣ 아키텍처🔨

<img src="https://user-images.githubusercontent.com/101084941/171023427-15c741a8-bd55-42f1-843c-c243d748d22a.png">

</br></br>

## 4️⃣ 프로젝트 주요기능🌟

### ✔ 주요 기능

- 소셜 로그인
- 검색
- 기록 : 트래킹 검색
- 소통 : 피드 / 등산 모임
- 보상 : 타이틀(칭호)

### ① 로그인, 회원가입, 소셜로그인

- axios와 axios-interceptors 를 통한 서버와 api 요청
- 카카오톡, 네이버, 구글 api를 이용한 소셜로그인

### ② 마이 페이지

- 유저의 개인 정보(닉네임, 프로필사진) 수정 및 로그아웃이 가능하고
- 유저가 획득한 타이틀을 확인하고 선택할 수 있습니다.
- 유저가 참가한 등산 모임들을 임박한 순으로 보여줍니다.
- 또한 자신이 작성한 피드 목록을 보여줍니다.
- 북마크한 산과 유저와의 거리를 확인하고 산 정보를 확인 할 수 있습니다.
- 완료한 트래킹 정보가 지도에 표시되고, 상세 기록들을 확인할 수 있습니다.

### ③ 메인 페이지

- 산길 서비스에서 제공되는 산 중 좋아요가 높은 순으로 10개를 보여줍니다.
- 유저의 현재 위치를 기반으로 주변 산 정보(반경 약 7km 이내)를 제공합니다.
- 가장 최근에 작성 된 피드 정보를 제공합니다.
- 가장 최근에 개설 된 등산 모임 정보를 제공합니다.

### ④ 트래킹 페이지

- 등산하려는 산 검색 후, 등산이 시작되면 유저가 이동하는 경로가 그려집니다.
- 10분 이상의 트래킹 정보만 저장되며, 이후 마이페이지에서 확인이 가능합니다.

### ⑤ 산 검색 페이지

- 지도에서 전국 100대 명산 중 10개를 랜덤으로 띄워줍니다.
- 산에 관련된 키워드(산이름, 산주소)로 검색할 수 있습니다.
- 상세페이지에서 산에대한 정보를 확인하고, 북마크, 댓글 기능(별점포함)을 이용할 수 있습니다.

### ⑥ 모임 페이지

- 키워드(산이름, 지명, 모임제목)를 통해 원하는 모임을 검색할 수 있습니다.
- 유저가 직접 모임을 개설할 수 있습니다.
- 모임에 참가하면, 해당 모임 채팅에 참여할 수 있습니다.
- 약속된 모임 일정이 지나면 모임리스트 페이지에서 보이지 않습니다.

### ⑦ 피드 페이지

- 사진을 올려 다른 사람들에게 공유할 수 있습니다
- 다른 사람의 피드와 내 피드에 댓글을 작성하고, 좋아요를 할 수 있습니다.

</br>

## 5️⃣ 트러블 슈팅 🎉

### 이벤트 버블링

- 문제 : 산 카드 안의 북마크 버튼을 눌렀을 때, 이벤트 버블링으로 인해 산 상세 페이지로 넘어가는 문제가 있었습니다.

- 해결 방안 : event.stopPropagation()을 사용하여 해당 이벤트가 전파되는 것을 방지했습니다.

### wakeLock api

- 문제 : 스마트폰으로 서비스를 이용할 때, 시간이 지나면 자동으로 화면이 어두워지는데, 이 때 gps와 스톱워치 둘다 작동하지 않는 문제 발생했습니다

- 해결 방안 : wakeLock API를 사용하여 기능이 계속 실행되어야 할 때 슬립 모드 혹은 화면이 잠가지는 것을 방지하고자 했습니다.

- 한계점 : ios 기기에서는 사용이 불가능하고, 안드로이드 기기에서만 사용이 가능하다는 한계가 존재했습니다.

</br>

### Axios Interceptor

**문제상황** 
</br>
웹페이지 서비스에서 로그인 직후 인증이 필요한 요청을 보내게 되면, 오류가 발생. 현재 인증 토큰을 Request Headers의 Authorization 속성에 담아 요청하는데, 로그인 직후에는 Authorization 속성의 값이 null로 전달되기때문에 발생하는 오류였다.

```javascript
// 기존 코드
const instance = axios.create({
  baseURL: "https://산길.com",
  headers: {
    Authorization: token,
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});
```

axios.create를 이용하여 axios 인스턴스를 생성하는데 여기서 headers - Authorization에 sessionStorage에 저장된 token을 넣고 생성하는 구조.
처음 로드될 때 axios 인스턴스가 생성되는데 이때 token값은 비어있는 채로 생성이 된다.
이상태에서 token값이 변해도 자바스크립트단의 위 코드는 별도의 반응형이 아니기 때문에 token이 빈 상태 그대로 유지된다.
그 상태에서 api를 호출하게 되니 Unauthorized 에러가 날 수 밖에 없는것!
이러한 문제를 해결하기 위해 Interceptor를 사용했다.

</br>

**해결 방안** 
</br>
Interceptor는 axios가 호출되기 전(request, response 모두) 선처리 할 수 있도록 도와주는 axios 내장객체이다.

```javascript
// https://github.com/axios/axios#interceptors 
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
```

기본 코드의 구조는 위와 같다.
여기서 headers - Authorization에 token값을 실어 보내면 된다.

```javascript
// 추가 코드
instance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = sessionStorage.getItem("token");
  }
  return config;
});
```

</br>

## 6️⃣ 피드백 개선 (추가 예정)


## 7️⃣ 사용한 라이브러리 (패키지)

| 라이브러리명     | 내용                                     | 참고        |
| :--------------- | :--------------------------------------- | :---------- |
| axios            | 서버통신                                 |             |
| redux            | 상태관리                                 |             |
| lodash           | 디바운스 쓰로틀링을 사용한 렌더링 최소화 |             |
| Thunk            | 미들웨어                                 |             |
| styled-component | 컴포넌트 스타일링                        |             |
| sockjs-client    | 소켓 통신                                | 실시간 채팅 |
| stompjs          | 소켓 통신                                | 실시간 채팅 |
| immer            | state 불변성 관리                        |             |
| react-slick      | 메인페이지 이벤트 배너                   |             |
