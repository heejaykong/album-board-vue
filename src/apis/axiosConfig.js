import axios from "axios";

// 기본 경로 설정(개발 다 끝나고 주석 풀기)
// axios.defaults.baseURL = "http://localhost:82";

// 요청 HTTP에 Autorization 헤더 추가, 값은 JWT로 설정
function addAuthHeader(AUTH_TOKEN) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
}

// 요청 HTTP에 Autorization 헤더 삭제
function removeAuthHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

export default {
  addAuthHeader,
  removeAuthHeader,
};
