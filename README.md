# album-board-vue
### [프론트] Vue.js를 이용한 앨범게시판 만들기 미니 프로젝트

(백엔드 코드가 궁금하다면 이 프로젝트의 [백엔드 저장소](https://github.com/heejaykong/album-board-springboot)를 확인해 주세요.)

1. 사용한 스택:
- 게시물CRUD 통신: `axios` 활용
- Auth기능: `Spring Security`, `JWT`, `Redis` 활용
- 상태관리: `vuex` 활용

2. 시연 화면:

<img src="https://github.com/heejaykong/album-board-vue/blob/master/src/assets/%EC%8B%9C%EC%97%B01__vuex_store%26read.gif" alt="gif"/>

**▲ GIF 설명(1/3): 로그인 및 게시물 조회 시연**

1. 로그인하지 않아도 게시물 목록은 조회 가능하나 하나를 클릭해 상세페이지로 넘어갈 땐 Access Token 요구(없을 경우 로그인화면으로 라우팅)
2. Access Token은 30분마다 refresh 요청
3. 로그인 시 헤더에 유저이름 표시, 본문에 `사진 올리기` 버튼 표시
4. 내가 작성한 게시물이라면 수정/삭제 버튼 표시
---
<img src="https://github.com/heejaykong/album-board-vue/blob/master/src/assets/%EC%8B%9C%EC%97%B02__pager%26logout.gif" alt="gif"/>

**▲ GIF 설명(2/3): 페이지네이션 및 로그아웃 시연**

1. 페이지네이션 사용(1페이지부터 2300페이지까지 정상 작동)
2. 로그아웃하면 header, sessionStorage, Redis에서 Access Token 삭제
---
<img src="https://github.com/heejaykong/album-board-vue/blob/master/src/assets/%EC%8B%9C%EC%97%B03__signup%26create%26update%26delete.gif" alt="gif"/>

**▲ GIF 설명(3/3): 회원가입 및 게시물 작성/수정/삭제 시연**

1. 중복된 아이디일 경우 회원가입 방지
2. 게시물 작성 시 이미지 첨부 가능
3. 게시물 클릭 시 조회수 1씩 증가
4. 게시물 수정/삭제 정상 작동
