import store from "@/store";
import axios from "axios";

//공통
const FAIL_MESSAGE_NETWORK = "fail-network";
//login
const FAIL_MESSAGE_401 = "fail-401";
const SUCCESS_MESSAGE = "successful";

async function join(user) {
  let result = null;
  try {
    const response = await axios.post("/member/join", user);
    result = response.data.result; // successful, duplicated, failed 중 하나
  } catch (error) {
    console.log(error);
    result = FAIL_MESSAGE_NETWORK;
  }
  return result;
}

async function login(user) {
  let result = null;
  try {
    const response = await axios.post("/member/login", user);
    // 응답코드 200일때
    store.dispatch("saveAuth", {
      userId: response.data.mid,
      authToken: response.data.accessToken,
    });
    result = SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    // 401 같은 에러가 나면 catch에 걸림
    if (!error.response) return FAIL_MESSAGE_NETWORK;
    if (error.response.status === 401) return FAIL_MESSAGE_401;
  }
  return result;
}

async function logout() {
  try {
    // 서버쪽 정리
    await axios.get("/member/logout");
    // 프론트쪽 정리
    store.dispatch("deleteAuth");
  } catch (error) {
    console.log(error);
  }
}

async function refreshToken() {
  try {
    if (store.state.authToken) {
      const response = await axios.get("/member/refreshToken");
      store.dispatch("saveAuth", {
        userId: response.data.mid,
        authToken: response.data.newAccessToken,
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

export default {
  join,
  login,
  logout,
  refreshToken,
};
